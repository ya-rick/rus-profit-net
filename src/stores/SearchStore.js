import { action, makeAutoObservable } from 'mobx';
import SearchResultModel from './Models/SearchResultModel';

export default class SearchStore {

    results = [];

    currentChosenResult = null;

    // getVacancies || getResumes
    resultsType = null;

    constructor() {
        makeAutoObservable(this, {
            setResults: action.bound,
            setCurrentResult: action.bound,
            setResultsType: action.bound,
        });
    }

    get isResultsPresent() {
        return this.results.length > 0;
    }

    get isCurrentSearchResult() {
        return this.currentChosenResult !== null;
    }

    setResults(results = []) {
        this.results = results.map(result => SearchResultModel.createFromServerContract(result));
    }
    
    setCurrentResult(result) {
        this.currentChosenResult = result instanceof SearchResultModel ? result
            : SearchResultModel.createFromServerContract(result);
    }

    setResultsType(resultsType) {
        this.resultsType = resultsType;
    }

}
