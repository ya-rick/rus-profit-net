import { action, makeAutoObservable, autorun } from 'mobx';

import { requestWithFormData, requestWithParams } from '../../api/exchangeLayer';
import CommonInfoContract from '../RegistrationContracts/CommonInfoContract';


export default class UserModel {

    user = null;
    editInfo = null;

    initialErrorState = {
        mainInfo: null,
        contactInfo: null,
        generalInfo: null
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
            saveData: action.bound,
        });
    }

    get isError() {
        return Object.values(this.error).reduce((acc, errorVal) => acc || !!errorVal, false);
    }

    get isUserAuthenticated() {
        return this.user !== null;
    }

    setField(fieldKey) {
        return action((value) => {
            if (this.editInfo.hasOwnProperty(fieldKey)) {
                this.editInfo[fieldKey] = value;
            } else {
                throw new Error(`No such key ${fieldKey}`);
            }
        })
    }

    clearError() {
        this.error = {...this.initialErrorState};
    }

    setError(errorKey) {
        return action((value) => this.error[errorKey] = value);
        
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

        const editInfoServerContract = {...this.editInfo.toServerContract()};

        return requestWithFormData('editUserData', {...editInfoServerContract})
    }

    async getUserData() {
        try {
            this.user = await requestWithParams('getUserData');

            // this.user = {
            //     name: 'testing only'
            // }

            this.editInfo = CommonInfoContract.fromServerContract(this.user);
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
    
}