import { action, makeAutoObservable } from 'mobx';
import { requestWithParams } from '../api/exchangeLayer';
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
            onLikeClicked: action.bound,
            onFavouriteClicked: action.bound,
        });
    }

    get isResultsPresent() {
        return this.results.length > 0;
    }

    get isCurrentSearchResult() {
        return this.currentChosenResult !== null;
    }

    get mainInfoSearchResult() {
        return this.currentChosenResult?.parameters.filter(param => param.isMainInfo);
    }

    get secondaryInfoSearchResult() {
        return this.currentChosenResult?.parameters.filter(param => !param.isMainInfo);
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

    onLikeClicked(type_mark, id) {
        return (mark) => {
            requestWithParams('setMark', {
                type_mark, id, value: mark
            })
                .catch(err => console.error(err))
        }
    }

    onFavouriteClicked(type, id) {
        return () => {
            requestWithParams(type, {
                id,
            })
                .then(() => {
                    if (this.results.length) {
                        this.results.forEach(result => {
                            if (result.id === id) {
                                result.isFavourite = !result.isFavourite;
                            }
                        })
                    } else {
                        // case of exact loading from route of vacncy/resume
                        this.currentChosenResult.isFavourite = !this.currentChosenResult.isFavourite;
                    }
                    
                })
                .catch(err => console.error(err))
        }
    }

}
