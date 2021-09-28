import { makeAutoObservable } from 'mobx';

export default class SearchResultModel {

    id = null;
    name = '';
    category = '';
    employer = '';

    description = '';
    vacancy_name = '';
    currency = '';
    experience = 0;
    avatar = null;
    parameters = [];
    salary = [];
    salary_type = 0;
    places = [];
    contacts_info = [];
    mark = 0;
    isFavourite = false;
    create_date = null;
    example = [];


    constructor(fromServerData) {
        const { name, description, experience, avatar, parameters, salary, salary_type,
            places, category, employer, id, contacts_info, mark, isFavourite, vacancy_name,
            create_date, currency, example } = fromServerData;

        this.id = id;
        this.name = name;
        this.description = description;
        this.experience = experience;
        this.avatar = avatar;
        this.parameters = parameters;
        this.salary = salary;
        this.places = places;
        this.category = category;
        this.salary_type = salary_type;
        this.employer = employer;
        this.contacts_info = contacts_info;
        this.mark = mark;
        this.isFavourite = isFavourite;
        this.vacancy_name = vacancy_name;
        this.create_date = create_date;
        this.currency = currency;
        this.example = example;

        makeAutoObservable(this);
    }

    static createFromServerContract(fromServerData) {
        return new this(fromServerData);
    }

}