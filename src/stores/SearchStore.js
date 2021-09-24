import { action, computed, makeAutoObservable } from 'mobx';

import { requestWithParams } from '../api/exchangeLayer';
import MainFiltersStore from './MainFiltersStore';
import SearchResultModel from './Models/SearchResultModel';


export default class SearchStore {

    mainFiltersStore = new MainFiltersStore();

    resultsRestInfo = {
        page: 1,
        last_page: 1,
        currentFiltersContract: null,
        isLoading: false
    }

    results = [];

    currentChosenResult = null;

    constructor() {
        makeAutoObservable(this, {
            setResults: action.bound,
            setCurrentResult: action.bound,
            onLikeClicked: action.bound,
            onFavouriteClicked: action.bound,
            setTotalPage: action.bound,
            scrollDown: action.bound,
            sendFilters: action.bound,
            getInfoByFilters: action.bound,
            showMoreInfo: action.bound,
            mainInfoSearchResult: computed,
            secondaryInfoSearchResult: computed
        });
    }

    get isLoading() {
        return this.resultsRestInfo.isLoading === true;
    }

    setIsLoading(value = false) {
        this.resultsRestInfo.isLoading = value;
    }

    get isResultsPresent() {
        return this.results.length > 0;
    }

    get isLastPage() {
        return this.resultsRestInfo.page >= this.resultsRestInfo.last_page;
    }

    get isCurrentSearchResult() {
        return this.currentChosenResult !== null;
    }

    get mainInfoSearchResult() {
        return this.currentChosenResult?.parameters.filter(param => param.isMainInfo) || [];
    }

    get secondaryInfoSearchResult() {
        return this.currentChosenResult?.parameters.filter(param => !param.isMainInfo) || [];
    }

    setResults(results = []) {
        this.results = results.map(result => SearchResultModel.createFromServerContract(result));
    }

    setTotalPage(maxPages) {
        this.resultsRestInfo.last_page = maxPages;
        this.resultsRestInfo.page = 1;
    }

    scrollDown() {
        this.resultsRestInfo.page += 1;
    }
    
    setCurrentResult(result) {
        this.currentChosenResult = result instanceof SearchResultModel ? result
            : SearchResultModel.createFromServerContract(result);
    }

    onLikeClicked(type_mark, id, callbackBefore) {
        return (mark) => {
            callbackBefore && callbackBefore();

            requestWithParams('setMark', {
                type_mark, id, value: mark
            })
                .catch(err => console.error(err))
        }
    }

    onFavouriteClicked(type, id) {
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

    async showMoreInfo() {
        if (this.isLastPage) return;

        const { filterType } = this.resultsRestInfo.currentFiltersContract;

        this.scrollDown();

        const results = await this.sendFilters(
            filterType,
            {
                ...this.resultsRestInfo.currentFiltersContract,
                page: this.resultsRestInfo.page
            },
            true
        );

        this.results = [...this.results, ...(results.resume || results.vacancy || [])];

        this.setIsLoading(false);
    }

    async getInfoByFilters() {
        const { filterType } = 
            this.resultsRestInfo.currentFiltersContract =
            this.mainFiltersStore.filtersToServerContract();
        try {
            if (this.mainFiltersStore.validateFullInfo()) throw new Error(false);

            const results = await this.sendFilters(filterType, this.resultsRestInfo.currentFiltersContract);
    
            this.setResults(results.resume || results.vacancy || []);
            this.setTotalPage(results.last_page);
        } catch(e) {
            throw new Error(e.message);
        } finally {
            this.setIsLoading(false);
        }
    }

    async sendFilters(searchType, filters) {
        this.setIsLoading(true);

        return await requestWithParams(searchType, filters);
    }

}
