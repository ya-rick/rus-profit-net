import { action, makeAutoObservable, toJS } from 'mobx';

import CityCountryModel from '../../CityCountryModel';


export default class TargetedInfoContract {
    constructor() {
        Object.entries(this.basicTemplate).forEach(([key, defaultValue]) => this[key] = defaultValue);

        makeAutoObservable(this, {
            addImage: action.bound,
            removeImage: action.bound,
        });
    }

    get basicTemplate() {
        return {
            id: '',

            category: {
                id: 8,
                name: 'Няня',
                example: false
            },
            experience: '',
            salary: '',
            salary_type: '',
            description: '',
            result_cat: [],
            years_with: 18,
            years_to: 60,
            vacancy_name: '',
            agree: false,
            currency: 1,
            files_images: [],
            cityCountryModel: new CityCountryModel()
        }
    }

    get basicTemplateKeys() {
        return Object.keys(this.basicTemplate);
    }

    get isWorksAddable() {
        return this.category?.example === true;
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
        return this.basicTemplateKeys.reduce(
            (acc, key) => {
                switch (key) {
                    case 'category': acc.category = this.category.id; break;
                    case 'files_images': acc['files_images[]'] = this.files_images; break;
                    case 'cityCountryModel': acc.places = this.cityCountryModel.toServerContract(); break;
                    default: acc[key] = this[key];
                }

                return acc;
            },
            {}
        );
    }

    fillFromServer(obj) {
        const newContract = new TargetedInfoContract();

        obj.basicTemplateKeys.forEach(key => {
            switch (key) {
                case 'example': newContract.files_images = toJS(obj.example) || this.basicTemplate.files_images; break;
                case 'places': newContract.cityCountryModel = new CityCountryModel(obj.places); break;
                case 'salary': {
                    const { salary: { value, type, currency: { id: currencyID } } } = obj;

                    newContract.salary = value;
                    newContract.satary_type = type;
                    newContract.currency = currencyID;
                    
                    break;
                }
                case 'parameters': {
                    newContract.result_cat = obj.parameters
                        .reduce(
                            (arr, param) => {
                                param.options.forEach(option => arr.push(option.id));

                                return arr;
                            },
                            []
                        );

                    break;
                }
                default: 
                    if (this.basicTemplateKeys.includes(key))
                        newContract[key] = obj[key];
            }
        });

        return newContract;
    }

}