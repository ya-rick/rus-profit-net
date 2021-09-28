import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router';

import ResultCard from '../../common/components/ResultCard';
import { PageContentWrapper } from '../../common/components/Layouts';
import PageTitle from '../../common/components/PageTitle';
import Loading from '../../common/components/Loading';
import { SearchResultsFromSearchStore, SearchResultsFromUserProfile } from '../../common/HOCs';


export default SearchResults;

export const SearchStoreResults = SearchResultsFromSearchStore(SearchResults);

export const UserProfileResults = SearchResultsFromUserProfile(SearchResults);

function SearchResults({
    onSelectCallback, results = [], isLastPage, isLoading, isSearchWorker, showMoreCallback, forceRender = false
}) {

    console.log(forceRender)

    const history = useHistory();

    const isResultsPresent = results.length > 0;

    useEffect(() => {
        const listener = window.addEventListener('scroll', e => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

            if (!isLastPage && !isLoading && (scrollTop + clientHeight >= scrollHeight - clientHeight / 2)) {
                showMoreCallback && showMoreCallback();
            }
        })

        return () => window.removeEventListener('scroll', listener);

    }, [isLastPage, isLoading, showMoreCallback]);

    if (!(isResultsPresent || forceRender)) {
        return <Redirect to={'/'}/>
    }

    function bindOnSelectResult(result) {
        return () => {
            history.push(`/searchResults/${isSearchWorker ? 'getVacancyByID' : 'getResumeByID'}/${result.id}`);

            onSelectCallback && onSelectCallback(result);
        }
    }

    return(
        <PageContentWrapper>
            <PageTitle>{isSearchWorker ? 'Вакансии' : 'Анкеты'}</PageTitle>

            {(isResultsPresent || forceRender) && results.map(result => <ResultCard
                key={result.id}
                result={result}
                isResume={!isSearchWorker}
                onSelectResult={bindOnSelectResult(result)}
            />)}

            {isLoading && <Loading/>}
        </PageContentWrapper>
    );
};
