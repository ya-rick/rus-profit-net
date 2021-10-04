import { action, computed, makeAutoObservable } from 'mobx';

import { requestWithParams } from '../api/exchangeLayer';
import MainFiltersStore from './MainFiltersStore';
import SearchResultsCollection, { ResultContract } from './Models/SearchResultsCollection';


export default class SearchStore {

    mainFiltersStore = new MainFiltersStore();

    searchResultsCollection = new SearchResultsCollection();

    resultsRestInfo = {
        page: 1,
        last_page: 1,
        currentFiltersContract: null,
        isLoading: false
    }

    currentChosenResult = null;

    constructor() {
        makeAutoObservable(this, {
            setCurrentResult: action.bound,
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

    setTotalPage(maxPages) {
        this.resultsRestInfo.last_page = maxPages;
        this.resultsRestInfo.page = 1;
    }

    scrollDown() {
        this.resultsRestInfo.page += 1;
    }
    
    setCurrentResult(result) {
        this.currentChosenResult = result instanceof ResultContract ? result
            : ResultContract.createFromServerContract(result);
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

        this.searchResultsCollection.setResults([...this.searchResultsCollection.results, ...(results.resume || results.vacancy || [])]);

        this.setIsLoading(false);
    }

    async getInfoByFilters() {
        const { filterType } = 
            this.resultsRestInfo.currentFiltersContract =
            this.mainFiltersStore.filtersToServerContract();
        try {
            if (this.mainFiltersStore.validateFullInfo()) throw new Error(false);

            const results = await this.sendFilters(filterType, this.resultsRestInfo.currentFiltersContract);
    
            this.searchResultsCollection.setResults(results.resume || results.vacancy);
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
