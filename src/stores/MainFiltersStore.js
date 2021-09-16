import { makeAutoObservable, action } from 'mobx';
import { requestWithParams } from '../api/exchangeLayer';

import CityCountryModel from './Models/CityCountryModel';

export default class MainFiltersStore {

    cityCountryModel = new CityCountryModel();
    result_cat = [];
    years_with = 18;
    years_to = 60;
    category = null;
    experience = 0;
    salary = 0;
    salary_type = null;
    currency = null;

    filterType = null;

    initialErrorState = {
        noFullInfo: null
    }

    error = {...this.initialErrorState};

    constructor() {
        makeAutoObservable(this, {
            setField: action.bound,
            clearError: action.bound,
            setError: action.bound,
            sendFilters: action.bound
        });
    }

    get isSearchWorker() {
        return this.filterType === 'getVacancies';
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

        this.cityCountryModel.validateCountry(this.setError);
        if (!this.category) this.setError('Необходимо выбрать хотя бы одну категорию');

        return this.isError;
    }

    async sendFilters() {
        if (this.validateFullInfo()) throw new Error(false);

        const { cityCountryModel, result_cat, years_with, years_to, category: { id: category },
            experience, salary, salary_type, currency, filterType } = this;

        return await requestWithParams(filterType, {
            places: cityCountryModel.toServerContract(),
            result_cat, years_with, years_to, category, experience,
            salary, salary_type, currency
        });
        
        
    }

}
