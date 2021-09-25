import { makeAutoObservable, action } from 'mobx';
import { requestWithFormData } from '../api/exchangeLayer';
import CommonInfoContract from './RegistrationContracts/CommonInfoContract';
import TargetedInfoContract from './RegistrationContracts/TargetedInfoContract';

export default class RegistrationStore {

    commonInfo = new CommonInfoContract();
    targetedInfo = new TargetedInfoContract();

    initialErrorState = {
        mainInfo: null,
        contactInfo: null,
        descriptionBlock: null,
        targetedInfo: null,
        creationInfo: null,
        generalInfo: null
    };

    error = {...this.initialErrorState};

    constructor() {
        makeAutoObservable(this, {
            setField: action.bound,
            clearError: action.bound,
            setError: action.bound,
            validateAll: action.bound,
            sendData: action.bound
        })
    }

    get isError() {
        return Object.values(this.error).reduce((acc, errorVal) => acc || !!errorVal, false);
    }

    setField(fieldKey) {
        return action((value) => {
            if (this.commonInfo.hasOwnProperty(fieldKey)) {
                this.commonInfo[fieldKey] = value;
            } else if (this.targetedInfo.hasOwnProperty(fieldKey)) {
                this.targetedInfo[fieldKey] = value;
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

        this.commonInfo.validateMain(this.setError('mainInfo'));
        this.commonInfo.validateContact(this.setError('contactInfo'));
        this.commonInfo.validateCreation(this.setError('creationInfo'));

        this.commonInfo.validateBirthday(this.setError('generalInfo'))

        this.targetedInfo.validateDescriptionBlock(this.setError('descriptionBlock'));
        this.targetedInfo.validateCategory(this.setError('targetedInfo'));

        if (this.commonInfo.registration_type === 'vacancy') {
            this.targetedInfo.validateName(this.setError('targetedInfo'));
        }

        return this.isError;
    }

    sendData() {
        if (this.validateAll()) return Promise.reject(false);

        const commoninfoServerContract = {...this.commonInfo.toServerContract()};
        const targetedInfoServerContract = {...this.targetedInfo.toServerContract()};


        return requestWithFormData('registration', {
            ...commoninfoServerContract,
            ...targetedInfoServerContract
        })
    }

}