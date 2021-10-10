import { makeAutoObservable, action } from 'mobx';

import { requestWithFormData } from '../api/exchangeLayer';
import TargetedInfoContract from './Models/Contracts/RegistrationContracts/TargetedInfoContract';


export const ACTIONS = {
    CREATE_VACANCY: 'CREATE_VACANCY',
    CREATE_RESUME: 'CREATE_RESUME',
    UPDATE: 'UPDATE',
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
            if (fieldKey in this.templates[this.currentAction]) {
                this.templates[this.currentAction][fieldKey] = value;
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

    startUpdating(type, editableData) {
        this.setAction(ACTIONS.UPDATE);

        this.templates[this.currentAction] = {
            type,
            data: this.templates[this.currentAction].data.fillFrom(editableData)
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

        const targetedInfoServerContract = {...this.currentTemplate.toServerContract()};


        let type_create;

        if (this.currentAction === ACTIONS.UPDATE) {
            return Promise.reject(false);
        } else {
            type_create = this.currentAction === ACTIONS.CREATE_RESUME ? 'resume' : 'vacancy'
        }

        // TODO add update posibility
        return requestWithFormData('createSearch', {
            ...targetedInfoServerContract,
            type_create: type_create
        })
    }

}
