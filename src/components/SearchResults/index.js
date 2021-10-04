import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import ResultCard from '../../common/components/ResultCard';
import PageTitle from '../../common/components/PageTitle';
import Loading from '../../common/components/Loading';
import { SearchResultsFromSearchStore, SearchResultsFromUserProfile } from '../../common/HOCs';
import { observer } from 'mobx-react';


const SearchResults = observer(({
    isPresent, onSelectCallback, results = [], isLastPage,
    isLoading, isSearchWorker, showMoreCallback,
    resultsTitleVariants, userProfileInfo, TitleComponent = PageTitle
}) => {
    
    const [vacancyTitle, resumeTitle] = resultsTitleVariants;

    const history = useHistory();

    useEffect(() => {
        const listener = window.addEventListener('scroll', e => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

            if (!isLastPage && !isLoading && (scrollTop + clientHeight >= scrollHeight - clientHeight / 2)) {
                showMoreCallback && showMoreCallback();
            }
        })

        return () => window.removeEventListener('scroll', listener);

    }, [isLastPage, isLoading, showMoreCallback]);

    function bindOnSelectResult(result) {
        return () => {
            history.push(`/searchResults/${isSearchWorker ? 'getVacancyByID' : 'getResumeByID'}/${result.id}`);

            onSelectCallback && onSelectCallback(result);
        }
    }

    return <>
            <TitleComponent>{ isSearchWorker ? vacancyTitle : resumeTitle }</TitleComponent>

            {isLoading ?
                <Loading/>
                : isPresent ?
                    results.map(result =>
                        <ResultCard
                            key={result.id}
                            result={result}
                            isResume={!isSearchWorker}
                            onSelectResult={bindOnSelectResult(result)}
                            userProfileInfo={userProfileInfo}
                        />
                    )
                : 'Нет результатов'}

        </>
});

export default SearchResults;

export const SearchStoreResults = SearchResultsFromSearchStore(SearchResults);

export const UserProfileResults = SearchResultsFromUserProfile(SearchResults);
