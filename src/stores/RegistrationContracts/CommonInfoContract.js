import { action, computed, makeAutoObservable, reaction } from 'mobx';
import CityCountryModel from '../CityCountryModel';

export default class CommonInfoContract {

    // main info
    user_surname = '';
    user_name = '';
    user_email = '';
    user_password = '';
    user_password_confirm = '';

    cityCountryModel = new CityCountryModel();

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

    validatePassword(callback) {
        if (!/^\w{6,}$/.test(this.user_password)) callback('Введите больше 6-ти символов латиницей и цифрами в поле пароль');
        if (this.user_password !== this.user_password_confirm) callback('Пароли должны совпадать');
    }

    validateBirthday(callback) {
        if (!this.birthday) callback('Необходимо указать дату рождения');
    }

    validateEmail(callback) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user_email)) callback('Email неправильного формата');
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
        this.cityCountryModel.validateCountry(callback);
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
            user_whatsapp, user_whatsapp_prefered,
            user_second_email, user_second_email_prefered, user_skype, user_skype_prefered,
            user_viber, user_viber_prefered, user_telegram, user_telegram_prefered,
            image, birthday, registration_type, cityCountryModel
        } = this;

        return {
            user_surname, user_name, user_email, user_password, user_password_confirm,
            user_whatsapp, user_whatsapp_prefered, user_second_email,
            user_second_email_prefered, user_skype, user_skype_prefered, user_viber, 
            user_viber_prefered, user_telegram, user_telegram_prefered,
            image, birthday, registration_type, places: JSON.stringify(cityCountryModel.toServerFormat())
        }
    }

}