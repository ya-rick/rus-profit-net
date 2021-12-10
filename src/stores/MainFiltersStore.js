import { makeAutoObservable, action } from 'mobx';

import CityCountryModel from './Models/CityCountryModel';
import LocaleService from '../api/LocaleService';


let localeService = LocaleService.getInstance();

export default class MainFiltersStore {

    initialErrorState = {
        noFullInfo: null
    }

    constructor() {
        Object.entries(this.basicTemplate)
            .forEach(([fieldName, fieldValue]) => this[fieldName] = fieldValue);

        this.validateFullInfo = this.validateFullInfo.bind(this);
        this.filtersToServerContract = this.filtersToServerContract.bind(this);

        makeAutoObservable(this, {
            setField: action.bound,
            clearError: action.bound,
            setError: action.bound,
            filtersToServerContract: action.bound,
            clearState: action.bound
        });
    }

    get basicTemplate() {
        return {
            cityCountryModel: new CityCountryModel(),
            result_cat: [],
            years_with: 18,
            years_to: 60,
            category: '',
            experience: '',
            salary: '',
            salary_type: '',
            currency: '',

            type_search: null,

            error: {...this.initialErrorState},
        }
    }

    get isSearchWorker() {
        return this.type_search === 'vacancy';
    }

    get isError() {
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
            if (this.hasOwnProperty(fieldKey)) {
                this[fieldKey] = value;
            } else {
                throw new Error(`No such key ${fieldKey}`);
            }
        })
    }

    validateFullInfo() {
        this.clearError();

        if (!this.category) this.setError(localeService.getByKey('empty_category'));

        return this.isError;
    }

    clearState() {
        Object.entries(this.basicTemplate)
            .forEach(([fieldName, fieldValue]) => this[fieldName] = fieldValue);
    }

    filtersToServerContract() {
        return Object.keys(this.basicTemplate)
            .reduce((serverContract, key) => {
                switch(key) {
                    case 'cityCountryModel': {
                        serverContract.places = this.cityCountryModel.toServerContract();
                        break;
                    }
                    case 'category': {
                        serverContract.category = this.category.id;
                        break;
                    }
                    case 'error': return serverContract;
                    default: serverContract[key] = this[key];
                }

                return serverContract;
            }, {});
    }
}
