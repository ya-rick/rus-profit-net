import { observable, makeObservable, reaction } from 'mobx';

import CommonInfoContract from '../CommonInfoContract';


export default class RegistrationCommonInfoContract extends CommonInfoContract {

    user_email = '';
    user_email_confirm = '';

    user_password = '';
    user_password_confirm = '';
    
    // registration type is chosen
    registration_type = null;


    constructor() {
        super();

        makeObservable(this, {
            user_email: observable,
            user_email_confirm: observable,
            user_password: observable,
            user_password_confirm: observable,
            registration_type: observable
        });
        
        reaction(() => this.user_email, user_email => this.contacts_info[0].value = user_email);
    }

    validatePassword(callback) {
        if (!/^\w{6,}$/.test(this.user_password)) callback('Введите больше 6-ти символов латиницей и цифрами в поле пароль');
        if (this.user_password !== this.user_password_confirm) callback('Пароли должны совпадать');

        ['user_password', 'user_password_confirm'].forEach(field => {
            if (!this[field].trim().length) callback('Заполните все необходимые поля');
        });
    }

    validateEmail(callback) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user_email)) callback('Email неправильного формата');
        if (this.user_email !== this.user_email_confirm) callback('Почты должны совпадать');
    }

    validateRegistrationType(callback) {
        if (!this.registration_type) callback('Для регистрации необходимо создать анкету или вакансию');
    }

    validateMain(callback) {

        this.validateEmail(callback);
        this.validateRegistrationType(callback);
        this.validatePassword(callback);

        super.validateMain(callback);
    }

    toServerContract() {
        const commonInfo = super.toServerContract();

        return {
            ...commonInfo,
            user_email: this.user_email,
            user_email_confirm: this.user_email_confirm,
            user_password: this.user_password,
            user_password_confirm: this.user_password,
            registration_type: this.registration_type
        }
    }

}
