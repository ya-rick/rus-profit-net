import { action, computed, makeAutoObservable, observable, reaction } from 'mobx';
import { clamp } from '../../common/utils';

export default class CommonInfoContract {

    // main info
    user_surname = '';
    user_name = '';
    user_email = '';
    user_password = '';
    user_password_confirm = '';

    user_country = [];
    user_city = observable.map({});
    currentEditCountry = null;

    // contact info
    user_phone = '';
    user_phone_prefered = false;

    user_whatsapp = '';
    user_whatsapp_prefered = false;

    user_second_email = '';
    user_second_email_prefered = true;

    user_skype = '';
    user_skype_prefered = false;

    user_viber = '';
    user_viber_prefered = false;

    user_telegram = '';
    user_telegram_prefered = false;

    image = null;
    birthday = null;

    // registration type is chosen
    registration_type = null;
    
    constructor() {
        makeAutoObservable(this, {
            onChangeCountries: action.bound,
            onChangeCities: action.bound,
            onChangeActiveEditableCountry: action.bound,
            getUserCities: computed
        });

        reaction(() => this.user_email, (user_email) => this.user_second_email = user_email);
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

    validatePassword(callback) {
        if (!/^\w{6,}$/.test(this.user_password)) callback('Введите больше 6-ти символов в поле пароль');
        if (this.user_password !== this.user_password_confirm) callback('Пароли должны совпадать');
    }

    validateEmail(callback) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user_email)) callback('Email неправильного формата');
    }

    validateCountry(callback) {
        if (!this.user_country.length) callback('Необходимо указать хотя бы одну страну');
    }

    validateMainInfoByLength(callback) {
        ['user_surname', 'user_name', 'user_email', 'user_password', 'user_password_confirm'].forEach(field => {
            if (!this[field].trim().length) callback('Заполните все необходимые поля');
        })
    }

    validateContactInfo(callback) {
        const isValidated = [
            ['user_phone', 'user_phone_prefered'],
            ['user_whatsapp', 'user_whatsapp_prefered'],
            ['user_second_email', 'user_second_email_prefered'],
            ['user_skype', 'user_skype_prefered'],
            ['user_viber', 'user_viber_prefered'],
            ['user_telegram', 'user_telegram_prefered']
        ].reduce((acc, [textField, booleanField]) => acc || (this[textField].trim().length && this[booleanField]), false);

        if (!isValidated) callback('Выберите и заполните хотя бы один вид предпочтительной связи');
    }

    validateRegistrationType(callback) {
        if (!this.registration_type) callback('Для регистрации необходимо создать анкету или вакансию');
    }

    validateMain(callback) {
        this.validatePassword(callback);
        this.validateEmail(callback);
        this.validateCountry(callback);
        this.validateMainInfoByLength(callback);
    }

    validateContact(callback) {
        this.validateContactInfo(callback);
    }

    validateCreation(callback) {
        this.validateRegistrationType(callback);
    }

    toServerContract() {
        const { user_surname, user_name, user_email, user_password, user_password_confirm,
            user_country, user_city, user_whatsapp, user_whatsapp_prefered,
            user_second_email, user_second_email_prefered, user_skype, user_skype_prefered,
            user_viber, user_viber_prefered, user_telegram, user_telegram_prefered,
            image, birthday, registration_type
        } = this;

        const serverUserCity = [];

        for (let city of user_city.values()) {
            serverUserCity.push(city);
        }

        return {
            user_surname, user_name, user_email, user_password, user_password_confirm,
            user_whatsapp, user_whatsapp_prefered, user_second_email,
            user_second_email_prefered, user_skype, user_skype_prefered, user_viber, 
            user_viber_prefered, user_telegram, user_telegram_prefered,
            image, birthday, registration_type,
            user_country: user_country.map(country => country.id).join(','),
            user_city: serverUserCity.map(citiesByCountry => citiesByCountry.map(city => city.id).join(',')).join(';'),
        }
    }

}