import { action, makeAutoObservable } from 'mobx';
import CityCountryModel from '../../CityCountryModel';

export default class TargetedInfoContract {

    category = '';
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
    cityCountryModel = new CityCountryModel();


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
        this.cityCountryModel.validateCountry(callback);
    }

    validateDescription(callback) {
        if (!this.description.trim().length) callback('Нужно добавить описание');
    }

    validateCategory(callback) {
        if (!this.category) callback('Нужно выбрать хотя бы одну категорию')
    }

    validateName(callback) {
        if (!this.name.trim().length) callback('Нужно добавить название вакансии');
    }

    validateDescriptionBlock(callback) {
        this.validateDescription(callback);
        this.validateAgree(callback);
    }

    toServerContract() {
        const { category, experience, salary, 
            salary_type, description, result_cat, years_with,
            years_to, name, currency, files_images, cityCountryModel } = this;

        return {
            category: category.id, experience, salary, 
            salary_type, description, years_with,
            years_to, name, currency,
            result_cat,
            'files_images[]': files_images,
            places: JSON.stringify(cityCountryModel.toServerContract())
        }
    }

    fillFrom(obj) {
        const {
            category_global, experience, salary, salary_type, description, result_cat,
            years_with, years_to, name, agree, currency, files_images, cityCountryModel
        } = obj;

        const newContract = new this();

        newContract.category_global = category_global;
        newContract.experience = experience;
        newContract.salary = salary;
        newContract.salary_type = salary_type;
        newContract.description = description;
        newContract.result_cat = result_cat;
        newContract.years_with = years_with;
        newContract.years_to = years_to;
        newContract.name = name;
        newContract.agree = agree;
        newContract.currency = currency;
        newContract.files_images = files_images;
        newContract.cityCountryModel = cityCountryModel;

        return newContract;
    }

}