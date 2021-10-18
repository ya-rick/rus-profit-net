import { action, makeAutoObservable, observable } from "mobx";

export default class CityCountryModel {

    countries = observable.map();
    currentEditCountry = null;


    constructor(fromServerCityCountry = []) {
        fromServerCityCountry.forEach(country => {
            this.countries.set(country.country_id, {
                name: country.country_name,
                cities: country.cities
            })
        })

        makeAutoObservable(this, {
            onChangeCountries: action.bound,
            onChangeCities: action.bound,
            onChangeActiveEditableCountry: action.bound,
        });
    }

    get chosenCountries() {
        let retVal = [];

        for (let id of this.countries.keys()) {
            retVal.push({ id, name: this.countries.get(id).name});
        }

        return retVal;
    }

    get chosenCities() {
        let retVal = [];

        for (let { cities } of this.countries.values()) {
            retVal.push(cities);
        }

        return retVal.flat();
    }

    validateCountry(callback) {
        if (!this.countries.size) callback('Необходимо указать хотя бы одну страну');
    }

    onChangeCountries(newCountry, operationType) {
        if (this.countries.size === 3  && operationType !== 'delete') {
            return;
        }

        if (operationType === 'delete') {

            this.countries.delete(newCountry.id);

            const countryID = this.countries.keys().next().value;

            if (!countryID) return;

            this.currentEditCountry = {id: countryID, name: this.countries.get(countryID).name};
        } else if (operationType === 'add') {

            this.countries.set(newCountry.id, {
                name: newCountry.name,
                cities: []
            });

            this.currentEditCountry = newCountry;
        }
    }

    onChangeCities(newCity, operationType) {
        if (!this.currentEditCountry) {
            return;
        }

        if (this.countries.get(this.currentEditCountry.id).cities.length === 3 && operationType !== 'delete') {
            return;
        }

        let editableCitiesArray = this.countries.get(this.currentEditCountry.id).cities;

        if (operationType === 'delete') {
            editableCitiesArray.splice(editableCitiesArray.findIndex(city => city.id === newCity.id), 1);
        } else if (operationType === 'add') {
            editableCitiesArray.push(newCity);
        }
    }   
    
    onChangeActiveEditableCountry(newCountry) {
        this.currentEditCountry = newCountry;
    }

    toServerContract() {
        let retVal = [];

        for (let [countryID, { cities }] of this.countries) {
            retVal.push({
                country_id: countryID,
                cities: cities.map(({ id }) => ({ id }))
            })
        }

        return JSON.stringify(retVal);
    }

}