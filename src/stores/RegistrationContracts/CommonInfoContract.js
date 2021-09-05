import { action, computed, makeAutoObservable, observable } from 'mobx';
import { clamp } from '../../common/utils';

export default class CommonInfoContract {

    user_surname = '';
    user_name = '';
    user_email = '';
    user_password = '';
    user_password_confirm = '';

    user_phone = '';
    user_phone_prefered = false;

    user_whatsapp = '';
    user_whatsapp_prefered = false;

    user_second_email = '';
    user_second_email_prefered = false;

    user_skype = '';
    user_skype_prefered = false;

    user_viber = '';
    user_viber_prefered = false;

    user_telegram = '';
    user_telegram_prefered = false;

    user_country = [];
    user_city = observable.map({});
    currentEditCountry = null;

    image = null;
    birthday = null;

    registration_type = null;
    
    constructor() {
        makeAutoObservable(this, {
            onChangeCountries: action.bound,
            onChangeCities: action.bound,
            onChangeActiveEditableCountry: action.bound,
            getUserCities: computed
        });
    }

    get getUserCities() {
        let cities = [];

        for (let city of this.user_city.values()) {
            cities.push(city)
        }

        return cities.flat();
    }

    onChangeCountries(newCountry, operationType) {
        if (this.user_country.length === 3  && operationType !== 'delete') {
            return;
        }

        if (operationType === 'delete') {

            const countryIndex = this.user_country
                .findIndex(country => country.id === newCountry.id);

            this.user_country
                .splice(countryIndex, 1);

            this.user_city.delete(this.currentEditCountry.id);
            
            if (this.user_country.length === 0) {
                this.currentEditCountry = null;
            } else {
                this.currentEditCountry = clamp(0, countryIndex, this.user_country.length - 2);
            }
        } else if (operationType === 'add') {
            this.user_country.push(newCountry);

            this.currentEditCountry = newCountry;
        }
    }

    onChangeCities(newCity, operationType) {
        if (this.getUserCities.length === 3 && operationType !== 'delete') {
            return;
        }

        let editableCitiesArray = this.user_city.get(this.currentEditCountry.id);

        if (!editableCitiesArray) {
            this.user_city.set(this.currentEditCountry.id, []);
            editableCitiesArray = this.user_city.get(this.currentEditCountry.id);
        }

        if (operationType === 'delete') {
            this.user_city.set(this.currentEditCountry.id, editableCitiesArray.filter(city => city.id !== newCity.id));

            if (editableCitiesArray.length === 0) {
                this.user_country = this.user_country.filter(country => country.id !== this.currentEditCountry.id);
            }
        } else if (operationType === 'add') {
            editableCitiesArray.push(newCity);
        }
    }

    onChangeActiveEditableCountry(newCountry) {
       this.currentEditCountry = newCountry;
    }

}