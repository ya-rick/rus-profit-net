import { observable, makeObservable, reaction } from 'mobx';

import CommonInfoContract from '../CommonInfoContract';
import LocaleService from '../../../../api/LocaleService';


let localeService = LocaleService.getInstance();

export default class RegistrationCommonInfoContract extends CommonInfoContract {

    user_email = '';
    user_email_confirm = '';

    user_password = '';
    user_password_confirm = '';
    
    registration_type = 'vacancy';

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
        if (!/^\w{6,}$/.test(this.user_password)) callback(localeService.getByKey('password_invalid'));
        if (this.user_password !== this.user_password_confirm) callback(localeService.getByKey('password_equals'));

        ['user_password', 'user_password_confirm'].forEach(field => {
            if (!this[field].trim().length) callback(localeService.getByKey('all_fields'));
        });
    }

    validateEmail(callback) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user_email)) callback(localeService.getByKey('email_invalid'));
        if (this.user_email !== this.user_email_confirm) callback(localeService.getByKey('email_equals'));
    }

    validateMain(callback) {

        this.validateEmail(callback);
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
