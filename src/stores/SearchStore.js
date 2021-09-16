import { action, computed, makeAutoObservable } from 'mobx';

import { requestWithParams } from '../api/exchangeLayer';
import MainFiltersStore from './MainFiltersStore';
import SearchResultModel from './Models/SearchResultModel';


export default class SearchStore {

    mainFiltersStore = new MainFiltersStore();

    resultsRestInfo = {
        page: 1,
        last_page: 1,
        currentFiltersContract: null
    }

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
            setTotalPage: action.bound,
            scrollDown: action.bound,
            sendFilters: action.bound,
            mainInfoSearchResult: computed,
            secondaryInfoSearchResult: computed
        });
    }

    get isResultsPresent() {
        return this.results.length > 0;
    }

    get isLastPage() {
        return this.page === this.last_page;
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

    setTotalPage(maxPages) {
        this.last_page = maxPages;
        this.page = 1;
    }

    scrollDown() {
        if (!this.isLastPage) this.page += 1;
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

    async sendFilters() {
        const { validateFullInfo, filtersToServerContract } = this.mainFiltersStore;

        if (validateFullInfo()) throw new Error(false);

        const { filterType } = this.resultsRestInfo.currentFiltersContract ||
            (this.resultsRestInfo.currentFiltersContract = filtersToServerContract());

        return await requestWithParams(filterType, this.resultsRestInfo.currentFiltersContract);
        
        
    }

}
