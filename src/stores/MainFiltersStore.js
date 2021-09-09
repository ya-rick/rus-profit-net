import { makeAutoObservable, action } from 'mobx';

import { requestWithFormData } from '../api/exchangeLayer';
import TargetedInfoContract from './RegistrationContracts/TargetedInfoContract';

export default class MainFiltersStore {

    cityCountryModel = new CityCountryModel();
    name = '';

    initialErrorState = {
        noFullInfo: null
    }

    error = {...this.initialErrorState};

    constructor() {
        makeAutoObservable(this);
    }

    isError() {
        return !!this.error.noFullInfo;
    }

    clearError() {
        this.error = {...this.initialErrorState};
    }

    setError(errorMessage) {
        this.error.noFullInfo = errorMessage;
    }

    setField(fieldKey) {
        return action((value) => {
            if (this.targetedInfo.hasOwnProperty(fieldKey)) {
                this.targetedInfo[fieldKey] = value;
            }
        })
    }

    validateFullInfo() {
        if (this.targetedInfo)
    }

}
