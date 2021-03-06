import { action, flow, makeAutoObservable, runInAction } from 'mobx';

import { requestWithFormData, requestWithParams } from '../../api/exchangeLayer';
import CommonInfoContract from './Contracts/CommonInfoContract';
import UserContract from './Contracts/UserProfileContracts/UserContract';
import SearchResultsCollection from './SearchResultsCollection';


export default class UserModel {

    user = null;
    editInfo = null;

    currentTabResults = new SearchResultsCollection();

    initialErrorState = {
        mainInfo: null,
        contactInfo: null,
        generalInfo: null,
        passwordInfo: null
    };

    error = {...this.initialErrorState};


    constructor() {
        makeAutoObservable(this, {
            userLogin: action.bound,
            getUserData: action.bound,
            userLogout: action.bound,
            setField: action.bound,
            clearError: action.bound,
            setError: action.bound,
            validateAll: action.bound,
            validatePasswordInfo: action.bound,
            saveData: action.bound,
            setTabResult: action.bound,
            setTabResultsType: action.bound,
            clearTabResults: action.bound,
            deleteTabResult: action.bound,
        });
    }

    get isError() {
        return Object.values(this.error).reduce((acc, errorVal) => acc || Boolean(errorVal), false);
    }

    get isUserAuthenticated() {
        return this.user !== null;
    }

    setField(fieldKey) {
        return action((value) => {
            if (fieldKey in this.editInfo) {
                if (fieldKey === 'contacts_info') {
                    this.editInfo.setContact(value);
                } else {
                    this.editInfo[fieldKey] = value;
                }
            } else {
                throw new Error(`No such key ${fieldKey}`);
            }
        });
    }

    clearError() {
        this.error = {...this.initialErrorState};
    }

    setError(errorKey) {
        return action((value) => this.error[errorKey] = value);
        
    }

    validatePasswordInfo() {
        this.error = {...this.error, passwordInfo: null};

        this.editInfo.validatePassword(this.setError('passwordError'));
    }

    validateAll() {
        this.clearError();

        this.editInfo.validateMain(this.setError('mainInfo'));
        this.editInfo.validateContact(this.setError('contactInfo'));

        this.editInfo.validateBirthday(this.setError('generalInfo'))

        return this.isError;
    }

    saveData() {
        if (this.validateAll()) return Promise.reject(false);

        return requestWithFormData('editUserData', {...this.editInfo.toServerContract()});
    }

    async getUserData() {
        try {
            const userFromServerInfo = await requestWithParams('getUserData');

            runInAction(() => {
                this.user = new UserContract(userFromServerInfo);
                this.editInfo = CommonInfoContract.fromServerContract(this.user);
                // this.user = new UserContract({
                //     user_name: 'testing only'
                // })
            });
        } catch(e) {
            console.error(e)

            this.user = null;
        }
    }

    async userLogin(email, password) {

        await requestWithParams('login', {
            email, password
        });

        await this.getUserData();
    }

    async userLogout() {
        try {
            await requestWithParams('logout');
        } catch(e) {
            console.error(e);
        } finally {
            this.user = null;
        }
    }

    setTabResultsType(type) {
        this.currentTabResults.setCollectionType(type);
    }

    setTabResult(result) {
        const { vacancy, resume } = result;

        this.clearTabResults();

        if (resume) {
            this.currentTabResults.setCollectionType('resume');
            this.currentTabResults.setResults(resume);
        } else {
            this.currentTabResults.setCollectionType('vacancy');
            this.currentTabResults.setResults(vacancy);
        }
    }

    deleteTabResult(id) {
        this.currentTabResults.deleteResult(id);
    }

    clearTabResults() {
        this.currentTabResults.clearResults();
    }
    
}