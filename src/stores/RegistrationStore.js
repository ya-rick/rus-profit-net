import { makeAutoObservable, action, observable } from 'mobx';
import CommonInfoContract from './RegistrationContracts/CommonInfoContract';
import TargetedInfoContract from './RegistrationContracts/TargetedInfoContract';

export default class RegistrationStore {

    commonInfo = new CommonInfoContract();
    targetedInfo = new TargetedInfoContract();

    error = {
        nameContact: null,
        descriptionBlock: null,
        targetedInfo: null
    }

    constructor() {
        makeAutoObservable(this, {
            setField: action.bound,
            clearError: action.bound,
            setError: action.bound,
        })
    }

    setField(fieldKey) {
        return action((value) => {
            if (this.commonInfo.hasOwnProperty(fieldKey)) {
                this.commonInfo[fieldKey] = value;
            } else if (this.targetedInfo.hasOwnProperty(fieldKey)) {
                this.targetedInfo[fieldKey] = value;
            }
        })
    }

    clearError() {
        this.error = {
            nameContact: null,
            descriptionBlock: null,
            targetedInfo: null
        }
    }

    setError(errorKey, value) {
        this.error[errorKey] = value;
    }

}