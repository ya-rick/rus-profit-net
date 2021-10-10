import { action, makeObservable, observable } from 'mobx';

export default class CommonInfoContract {

    // main info
    user_surname = '';
    user_name = '';
    
    // contact info
    contacts_info = [
        {
            name: 'Email',
            value: '',
            prefered: false,
        },
        {
            name: 'WhatsApp',
            value: '',
            prefered: false,
        },
        {
            name: 'Telegram',
            value: '',
            prefered: false,
        },
        {
            name: 'Skype',
            value: '',
            prefered: false,
        },
        {
            name: 'Viber',
            value: '',
            prefered: false,
        },
        {
            name: 'Телефон',
            value: '',
            prefered: false,
        },
    ];

    avatar = null;
    birthday = null;


    constructor() {
        makeObservable(this, {
            user_surname: observable,
            user_name: observable,
            contacts_info: observable,
            avatar: observable,
            birthday: observable,
            setContact: action,
        });
    }

    setContact(newContact) {
        this.contacts_info.forEach(contact => {
            if (contact.name === newContact.name) {
                contact.value = newContact.value;
                contact.prefered = newContact.prefered;
            }
        })
    }

    validateBirthday(callback) {
        if (!this.birthday) callback('Необходимо указать дату рождения');
    }

    validateMainInfoByLength(callback) {
        ['user_surname', 'user_name'].forEach(field => {
            if (!this[field].trim().length) callback('Заполните все необходимые поля');
        })
    }

    validateContactInfo(callback) {
        const isValidated = this.contacts_info
            .reduce(
                (acc, contact) => acc || (contact.value.trim().length && contact.prefered), 
                false
            );

        if (!isValidated) callback('Выберите и заполните хотя бы один вид предпочтительной связи');
    }

    validateMain(callback) {
        this.validateEmail(callback);
        this.validateMainInfoByLength(callback);
    }

    validateContact(callback) {
        this.validateContactInfo(callback);
    }

    static fromServerContract(fromServerUserData) {
        const {
            avatar, birthday, contacts_info, name, surname
        } = fromServerUserData;

        const newContact = new this();

        newContact.avatar = avatar;
        newContact.birthday = birthday;
        newContact.user_name = name || '';
        newContact.user_surname = surname || '';
        newContact.contacts_info = contacts_info;

        return newContact;
    }

    toServerContract() {
        const { user_surname, user_name, user_email, contacts_info, avatar, birthday } = this;

        return { user_surname, user_name, user_email, avatar, birthday, contacts_info: JSON.stringify(contacts_info) }
    }

}