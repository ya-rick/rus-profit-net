import { makeObservable, observable, reaction } from 'mobx';
import CityCountryModel from '../CityCountryModel';

export default class CommonInfoContract {

    // main info
    user_surname = '';
    user_name = '';
    user_email = '';

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


    constructor() {
        makeObservable(this, {
            user_surname: observable,
            user_name: observable,
            user_email: observable,
            user_phone: observable,
            user_phone_prefered: observable,
            user_whatsapp: observable,
            user_whatsapp_prefered: observable,
            user_second_email: observable,
            user_second_email_prefered: observable,
            user_skype: observable,
            user_skype_prefered: observable,
            user_viber: observable,
            user_viber_prefered: observable,
            user_telegram: observable,
            user_telegram_prefered: observable,
            image: observable,
            birthday: observable,
        });

        reaction(() => this.user_email, (user_email) => this.user_second_email = user_email);
    }

    validateBirthday(callback) {
        if (!this.birthday) callback('Необходимо указать дату рождения');
    }

    validateEmail(callback) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user_email)) callback('Email неправильного формата');
    }

    validateMainInfoByLength(callback) {
        ['user_surname', 'user_name', 'user_email'].forEach(field => {
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

    validateMain(callback) {
        this.validateEmail(callback);
        this.cityCountryModel.validateCountry(callback);
        this.validateMainInfoByLength(callback);
    }

    validateContact(callback) {
        this.validateContactInfo(callback);
    }

    static fromServerContract(fromServerUserData) {
        const {
            avatar, birthday, contacts_info, name, surname, places
        } = fromServerUserData;

        const newContact = new this();

        newContact.image = avatar;
        newContact.birthday = birthday;
        newContact.user_name = name || '';
        newContact.user_surname = surname || '';

        contacts_info?.forEach(contact => {
            const fieldName = `user_${contact.name}`;
            newContact[fieldName] = contact.value;
            newContact[`${fieldName}_prefered`] = Boolean(contact.prefered);
        });

        newContact.cityCountryModel = new CityCountryModel(places);

        return newContact;
    }

    toServerContract() {
        const { user_surname, user_name, user_email, user_whatsapp, user_whatsapp_prefered,
            user_second_email, user_second_email_prefered, user_skype, user_skype_prefered,
            user_viber, user_viber_prefered, user_telegram, user_telegram_prefered,
            image, birthday, cityCountryModel
        } = this;

        return {
            user_surname, user_name, user_email, user_whatsapp, user_whatsapp_prefered,
            user_second_email, user_second_email_prefered, user_skype, user_skype_prefered,
            user_viber, user_viber_prefered, user_telegram, user_telegram_prefered,
            image, birthday, places: JSON.stringify(cityCountryModel.toServerContract())
        }
    }

}