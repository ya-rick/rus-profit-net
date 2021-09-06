import { makeAutoObservable } from 'mobx';

export default class TargetedInfoContract {

    category_global = null;
    experience = 0;
    salary = 0;
    salary_type = null;
    description = '';
    result_cat = [];
    years_with = 18;
    years_to = 60;
    name = '';
    agree = false;
    currency = null;

    constructor() {
        makeAutoObservable(this);
    }

    validateAgree(callback) {
        if (!this.agree) callback('Для завершения регистрации нужно подтверждение согласия пользовательского соглашения');
    }

    validateDescription(callback) {
        if (!this.description.trim().length) callback('Нужно добавить описание');
    }

    validateCategory(callback) {
        if (!this.category_global) callback('Нужно выбрать хотя бы одну категорию')
    }

    validateName(callback) {
        if (!this.name.trim().length) callback('Нужно добавить название вакансии');
    }

    validateDescriptionBlock(callback) {
        this.validateDescription(callback);
        this.validateAgree(callback);
    }

    toServerContract() {
        const { category_global, experience, salary, 
            salary_type, description, result_cat, years_with,
            years_to, name, currency } = this;
        
        return {
            category_global, experience, salary, 
            salary_type, description, years_with,
            years_to, name, currency,
            result_cat: result_cat.map(result => result)
        }
    }

}