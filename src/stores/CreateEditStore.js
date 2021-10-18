import { makeAutoObservable, action } from 'mobx';

import { requestWithFormData } from '../api/exchangeLayer';
import TargetedInfoContract from './Models/Contracts/RegistrationContracts/TargetedInfoContract';


export const ACTIONS = {
    CREATE_VACANCY: 'create_vacancy',
    CREATE_RESUME: 'create_resume',
    UPDATE: 'edit',
}

export default class CreateEditStore {

    currentAction = null;

    templates = {
        [ACTIONS.CREATE_VACANCY]: new TargetedInfoContract(),
        [ACTIONS.CREATE_RESUME]: new TargetedInfoContract(),
        [ACTIONS.UPDATE]: {
            type: null,
            data: new TargetedInfoContract()
        }
    }

    initialErrorState = {
        descriptionBlock: null,
        targetedInfo: null,
    };

    error = {...this.initialErrorState};

    constructor() {
        makeAutoObservable(this, {
            setField: action.bound,
            clearError: action.bound,
            setError: action.bound,
            sendData: action.bound,
            startCreating: action.bound,
            startUpdating: action.bound,
        });
    }

    get currentTemplate() {
        if (this.currentAction === ACTIONS.UPDATE) {
            return this.templates[this.currentAction].data;
        }
        return this.templates[this.currentAction];
    }

    get isResume() {
        if (this.templates[this.currentAction].type) {
            return this.templates[this.currentAction].type === 'resume';
        }

        return this.currentAction === ACTIONS.CREATE_RESUME;
    }

    get isError() {
        return Object.values(this.error).reduce((acc, errorVal) => acc || !!errorVal, false);
    }

    setField(fieldKey) {
        return action((value) => {
            console.log(fieldKey, value)
            if (fieldKey in this.currentTemplate) {
                this.currentTemplate[fieldKey] = value;
            } else {
                throw new Error(`No such key ${fieldKey}`);
            }
        })
    }

    setAction(type) {
        this.currentAction = type;
    }

    startCreating(actionType) {
        this.setAction(actionType);
    }

    startUpdating(editableData) {
        this.setAction(ACTIONS.UPDATE);

        this.templates[this.currentAction] = {
            type: editableData.type,
            data: this.templates[this.currentAction].data.fillFromServer(editableData)
        }
    }

    clearError() {
        this.error = {...this.initialErrorState};
    }

    setError(errorKey) {
        return action((value) => this.error[errorKey] = value);
    }

    validateAll() {
        this.clearError();

        this.currentTemplate.validateDescriptionBlock(this.setError('descriptionBlock'));
        this.currentTemplate.validateCategory(this.setError('targetedInfo'));

        if (this.currentAction === 'vacancy') {
            this.currentTemplate.validateName(this.setError('targetedInfo'));
        }

        return this.isError;
    }

    sendData() {
        if (this.validateAll()) return Promise.reject(false);

        const targetedInfoServerContract = this.currentTemplate.toServerContract();

        if (this.currentAction === ACTIONS.UPDATE) {
            return requestWithFormData('edit', targetedInfoServerContract);
        } else {
            return requestWithFormData('create', {
                ...targetedInfoServerContract,
                type_create: this.currentAction === ACTIONS.CREATE_RESUME ? 'resume' : 'vacancy'
            });
        }
    }

}
