import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';
import { ContentTitle } from '../components/userProfile';
import { PageContentWrapper } from './components/Layouts';


export const SearchResultsFromSearchStore = SearchResultsComponent => {

    function Wrapper({ searchStore, ...props }) {

        const {
            searchResultsCollection, isLastPage, isLoading, showMoreInfo,
            mainFiltersStore: { isSearchWorker }
        } = searchStore;

        function onSelectCallback(result) {
            searchStore.setCurrentResult(result);
        }

        return <PageContentWrapper>
            <SearchResultsComponent
                results={searchResultsCollection.results}
                isSearchWorker={isSearchWorker}
                isLastPage={isLastPage}
                isPresent={searchResultsCollection.isPresent}
                isLoading={isLoading}
                resultsTitleVariants={[ 'Вакансии', 'Анкеты' ]}
                showMoreCallback={showMoreInfo}
                onSelectCallback={onSelectCallback}
                {...props}
            />
        </PageContentWrapper>
    }

    return inject('searchStore')(observer(Wrapper));
};

export const SearchResultsFromUserProfile = SearchResultsComponent => {
    
    function Wrapper({
        searchStore,
        uiStore: { userModel: { currentTabResults, getTabResults, clearTabResults } },
        searchParam,
        ...props
    }) {

        const {
            isLoading, isPresent, isVacancy, results,
        } = currentTabResults;

        useEffect(() => {

            getTabResults(searchParam);
    
            return () => clearTabResults();
        }, [searchParam])

        function onSelectCallback(result) {
            searchStore.setCurrentResult(result);
        }

        return <SearchResultsComponent
            results={results}
            isSearchWorker={isVacancy}
            isLastPage={true}
            isLoading={isLoading}
            isPresent={isPresent}
            resultsTitleVariants={[ 'Мои вакансии', 'Мои анкеты' ]}
            onSelectCallback={onSelectCallback}
            userProfileInfo
            TitleComponent={ContentTitle}
            {...props}
        />
    }

    return inject('searchStore', 'uiStore')(observer(Wrapper));
};
