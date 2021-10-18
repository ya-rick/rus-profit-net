import { action, makeAutoObservable } from 'mobx';

export class ResultContract {
    constructor(fromServerData) {

        Object.entries(this.basicTemplate)
            .forEach(([key, defaultValue]) => this[key] = fromServerData[key] || defaultValue);

        makeAutoObservable(this);
    }

    static createFromServerContract(fromServerData) {
        return new this(fromServerData);
    }

    get basicTemplate() {
        return {
            id: null,
            name: '',
            category: {
                id: 8,
                name: 'Няня',
                example: false
            },
            salary: {
                value: 0,
                type: {
                    id: 0,
                    value: 'в месяц'
                },
                currency: {
                    id: 1,
                    value: '$'
                }
            },
            years_to: 60,
            years_with: 18,
            employer: '',
            description: '',
            vacancy_name: '',
            experience: 0,
            avatar: null,
            parameters: [],
            places: [],
            contacts_info: [],
            mark: 0,
            isFavourite: false,
            create_date: null,
            example: [],
            count_favorites: 0,
            count_views: 0,
            type: null,
            status: 'stopped'
        }
    }

    get basicTemplateKeys() {
        return Object.keys(this.basicTemplate);
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
