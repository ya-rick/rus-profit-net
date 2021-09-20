import { makeAutoObservable, action } from 'mobx';

import CityCountryModel from './Models/CityCountryModel';

export default class MainFiltersStore {

    cityCountryModel = new CityCountryModel();
    result_cat = [];
    years_with = 18;
    years_to = 60;
    category = '';
    experience = '';
    salary = '';
    salary_type = '';
    currency = '';

    filterType = null;

    initialErrorState = {
        noFullInfo: null
    }

    error = {...this.initialErrorState};

    constructor() {
        this.validateFullInfo = this.validateFullInfo.bind(this);
        this.filtersToServerContract = this.filtersToServerContract.bind(this);

        makeAutoObservable(this, {
            setField: action.bound,
            clearError: action.bound,
            setError: action.bound,
            filtersToServerContract: action.bound,
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

    filtersToServerContract() {
        const { cityCountryModel, result_cat, years_with, years_to, category: { id: category },
            experience, salary, salary_type, currency, filterType } = this;

        return {
            places: cityCountryModel.toServerContract(),
            result_cat, years_with, years_to, category, experience,
            salary, salary_type, currency,
            filterType
        };
    }

}
