import { action, makeAutoObservable } from 'mobx';

export class ResultContract {

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

    // vacancy || resume
    type = null;

    status = 'stopped';


    constructor(fromServerData) {
        const { name, description, experience, avatar, parameters, salary, salary_type,
            places, category, employer, id, contacts_info, mark, isFavourite, vacancy_name,
            create_date, currency, example, status, type } = fromServerData;

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
        this.status = status;
        this.type = type;

        makeAutoObservable(this);
    }

    static createFromServerContract(fromServerData) {
        return new this(fromServerData);
    }

}

export default class SearchResultsCollection {

    results = null;

    collectionType = null;

    constructor() {
        makeAutoObservable(this, {
            clearResults: action.bound,
            setCollectionType: action.bound,
            setLoading: action.bound,
            setResults: action.bound,
        });
    }

    get isLoading() {
        return this.results === null;
    }

    get isPresent() {
        return Boolean(this.results?.length);
    }

    get isVacancy() {
        return this.collectionType === 'vacancy';
    }

    setCollectionType(collectionType) {
        this.setLoading();
        this.collectionType = collectionType;
    }

    setLoading() {
        this.results = null;
    }

    clearResults() {
        this.results = [];
    }

    setResults(results = []) {
        this.results = results.map(result => ResultContract.createFromServerContract(result));
    }

    deleteResult(id) {
        this.results.splice(this.results.findIndex(result => result.id === id), 1);
    }
}
