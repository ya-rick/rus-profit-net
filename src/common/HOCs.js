import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { ContentTitle } from '../components/userProfile';
import { PageContentWrapper } from './components/Layouts';
import { ACTIONS } from '../stores/CreateEditStore';


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
                isVacancy={isSearchWorker}
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
        uiStore: { userModel: { currentTabResults, getTabResults, clearTabResults, deleteTabResult } },
        searchParam,
        createEditStore,
        ...props
    }) {

        const {
            isLoading, isPresent, isVacancy, results,
        } = currentTabResults;

        const history = useHistory();

        useEffect(() => {

            getTabResults(searchParam);
    
            return () => clearTabResults();
        }, [searchParam])

        function onSelectCallback(result) {
            searchStore.setCurrentResult(result);
        }

        function onCreateClick() {
            createEditStore.startCreating(isVacancy ? ACTIONS.CREATE_VACANCY : ACTIONS.CREATE_RESUME);

            history.push('/profile/create');
        }

        return <SearchResultsComponent
            results={results}
            isVacancy={isVacancy}
            isLastPage={true}
            isLoading={isLoading}
            isPresent={isPresent}
            resultsTitleVariants={[ 'Мои вакансии', 'Мои анкеты' ]}
            onSelectCallback={onSelectCallback}
            userProfileInfo
            TitleComponent={ContentTitle}
            onCreateClick={onCreateClick}
            onDeleteCallback={deleteTabResult}
            {...props}
        />
    }

    return inject('searchStore', 'uiStore', 'createEditStore')(observer(Wrapper));
};

export const SearchResultsFavourites = SearchResultsComponent => {
    
    function Wrapper({
        searchStore,
        uiStore: { userModel: { currentTabResults, getTabResults, clearTabResults, deleteTabResult } },
        searchParam,
        createEditStore,
        ...props
    }) {

        const {
            isLoading, isPresent, isVacancy, results,
        } = currentTabResults;

        const { id } = useParams();

        useEffect(() => {

            getTabResults(searchParam, { id });
    
            return () => clearTabResults();
        }, [searchParam, id])

        function onSelectCallback(result) {
            searchStore.setCurrentResult(result);
        }

        return <SearchResultsComponent
            results={results}
            isVacancy={isVacancy}
            isLastPage={true}
            isLoading={isLoading}
            isPresent={isPresent}
            resultsTitleVariants={[ 'Отобранные вакансии', 'Отобранные анкеты' ]}
            onSelectCallback={onSelectCallback}
            TitleComponent={ContentTitle}
            onDeleteCallback={deleteTabResult}
            {...props}
        />
    }

    return inject('searchStore', 'uiStore', 'createEditStore')(observer(Wrapper));
};
