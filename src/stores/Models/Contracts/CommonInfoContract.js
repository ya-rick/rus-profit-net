import { action, makeObservable, observable } from 'mobx';

import LocaleService from '../../../api/LocaleService';


let localeService = LocaleService.getInstance();

export default class CommonInfoContract {
    constructor() {
        Object.entries(this.basicTemplate)
            .forEach(([key, defaultValue]) => this[key] = defaultValue);

        makeObservable(this, {
            user_surname: observable,
            user_name: observable,
            contacts_info: observable,
            avatar: observable,
            birthday: observable,
            setContact: action,
        });
    }

    get basicTemplate() {
        return {
            user_surname: '',
            user_name: '',
            contacts_info: [
                {
                    name: 'Email',
                    key: 'second_email',
                    value: '',
                    prefered: true,
                },
                {
                    name: 'Телефон',
                    key: 'phone',
                    value: '',
                    prefered: false,
                },
                {
                    name: 'Telegram',
                    key: 'telegram',
                    value: '',
                    prefered: false,
                },
                {
                    name: 'WhatsApp',
                    key: 'whatsapp',
                    value: '',
                    prefered: false,
                },
                {
                    name: 'Skype',
                    key: 'skype',
                    value: '',
                    prefered: false,
                },
                {
                    name: 'Viber',
                    key: 'viber',
                    value: '',
                    prefered: false,
                }
            ],
            avatar: null,
            birthday: null,
        }
    }

    setContact(newContact) {
        this.contacts_info.forEach(contact => {
            if (contact.key === newContact.key) {
                contact.value = newContact.value;
                contact.prefered = newContact.prefered;
            }
        })
    }

    validateBirthday(callback) {
        if (!this.birthday) callback(localeService.getByKey('birthday'));

        let user_birthday = new Date(this.birthday);

        user_birthday.setFullYear(user_birthday.getFullYear() + 18);

        if (user_birthday >= new Date()) callback(localeService.getByKey('not_enough_years'));
    }

    validateMainInfoByLength(callback) {
        ['user_surname', 'user_name'].forEach(field => {
            if (!this[field].trim().length) callback(localeService.getByKey('all_fields'));
        })
    }

    validateContactInfo(callback) {
        const isValidated = this.contacts_info
            .reduce(
                (acc, contact) => acc || (contact.value.trim().length && contact.prefered), 
                false
            );

        if (!isValidated) callback(localeService.getByKey('prefered_contacts'));
    }

    validateMain(callback) {
        this.validateMainInfoByLength(callback);
    }

    validateContact(callback) {
        this.validateContactInfo(callback);
    }

    static fromServerContract(fromServerUserData) {
        const newContract = new this();

        Object.entries(newContract.basicTemplate)
            .forEach(([key, defaultValue]) => newContract[key] = fromServerUserData[key] || defaultValue);

        return newContract;
    }

    toServerContract() {
        return Object.keys(this.basicTemplate)
            .reduce((acc, key) => {
                if (key === 'contacts_info') {
                    acc[key] = JSON.stringify(this[key]);
                } else {
                    acc[key] = this[key];
                }

                return acc;
            }, {})
    }

}