import { action, makeAutoObservable } from 'mobx';

export default class TargetedInfoContract {

    category_global = '';
    experience = '';
    salary = '';
    salary_type = '';
    description = '';
    result_cat = [];
    years_with = 18;
    years_to = 60;
    name = '';
    agree = false;
    currency = '';
    files_images = [];

    constructor() {
        makeAutoObservable(this, {
            addImage: action.bound,
            removeImage: action.bound,
        });
    }

    get isWorksAddable() {
        return this.category_global?.example === true;
    }

    addImage(image) {
        this.files_images.push(image);
    }

    removeImage(image) {
        this.files_images.splice(this.files_images.indexOf(image), 1);
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
        const { category_global: { id: category_global }, experience, salary, 
            salary_type, description, result_cat, years_with,
            years_to, name, currency, files_images } = this;

        return {
            category_global, experience, salary, 
            salary_type, description, years_with,
            years_to, name, currency,
            result_cat,
            'files_images[]': files_images
        }
    }

}