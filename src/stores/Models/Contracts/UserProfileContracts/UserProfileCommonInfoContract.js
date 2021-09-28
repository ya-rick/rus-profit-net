import { makeObservable, observable } from 'mobx';

import CommonInfoContract from '../CommonInfoContract';


export default class UserProfileCommonInfoContract extends CommonInfoContract {

    user_confirm_email = '';

    user_password = '';
    user_password_confirm = '';


    constructor() {
        super();

        makeObservable(this, {
            user_password: observable,
            user_password_confirm: observable,
            user_confirm_email: observable,
        });
    }

    validateEmail(callback) {
        console.log(this.user_email)
        console.log(this.user_confirm_email)
        if (this.user_email !== this.user_confirm_email) callback('Почты должны быть одинаковыми');
    }

    validatePassword(callback) {
        if (!/^\w{6,}$/.test(this.user_password)) callback('Введите больше 6-ти символов латиницей и цифрами в поле пароль');
        if (this.user_password !== this.user_password_confirm) callback('Пароли должны совпадать');

        ['user_password', 'user_password_confirm'].forEach(field => {
            if (!this[field].trim().length) callback('Заполните все необходимые поля');
        });
    }

    validateMain(callback) {
        this.validateEmail(callback);

        super.validateMain(callback);
    }

}
