import { inject, observer } from 'mobx-react';


export const SearchResultsFromSearchStore = SearchResultsComponent => {

    function Wrapper({ searchStore, ...props }) {

        const {
            searchResultsCollection, isLastPage, isLoading, showMoreInfo,
            mainFiltersStore: { isSearchWorker }
        } = searchStore;

        function onSelectCallback(result) {
            searchStore.setCurrentResult(result);
        }

        return <SearchResultsComponent
            results={searchResultsCollection.results}
            isSearchWorker={isSearchWorker}
            isLastPage={isLastPage}
            isLoading={isLoading}
            showMoreCallback={showMoreInfo}
            onSelectCallback={onSelectCallback}
            {...props}
        />
    }

    return inject('searchStore')(observer(Wrapper));
};

export const SearchResultsFromUserProfile = SearchResultsComponent => {
    
    function Wrapper({
        searchStore,
        uiStore: { userModel: { currentTabResults } },
        ...props
    }) {

        function onSelectCallback(result) {
            searchStore.setCurrentResult(result);
        }

        return <SearchResultsComponent
            results={currentTabResults.results}
            isSearchWorker={currentTabResults.isVacancy}
            isLastPage={true}
            isLoading={false}
            onSelectCallback={onSelectCallback}
            forceRender={true}
            {...props}
        />
    }

    return inject('searchStore', 'uiStore')(observer(Wrapper));
};
