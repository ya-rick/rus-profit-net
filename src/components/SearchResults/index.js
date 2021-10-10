import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import ResultCard from '../../common/components/ResultCard';
import PageTitle from '../../common/components/PageTitle';
import Loading from '../../common/components/Loading';
import { SearchResultsFavourites, SearchResultsFromSearchStore, SearchResultsFromUserProfile } from '../../common/HOCs';
import { CommonButton } from '../../common/components/Buttons';


const SearchResults = observer(({
    isPresent, onSelectCallback, results = [], isLastPage,
    isLoading, isVacancy, showMoreCallback,
    resultsTitleVariants, userProfileInfo, TitleComponent = PageTitle,
    onCreateClick, onDeleteCallback
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
            history.push(`/searchResults/${result.id}`);

            onSelectCallback && onSelectCallback(result);
        }
    }

    return <>
            <TitleComponent>
                { isVacancy ? vacancyTitle : resumeTitle }
                { onCreateClick &&
                    <CommonButton onClick={onCreateClick}>
                        Создать
                    </CommonButton> }
            </TitleComponent>

            {isLoading ?
                <Loading/>
                : isPresent ?
                    results.map(result =>
                        <ResultCard
                            key={result.id}
                            result={result}
                            onSelectResult={bindOnSelectResult(result)}
                            userProfileInfo={userProfileInfo}
                            onDeleteCallback={onDeleteCallback}
                        />
                    )
                : 'Нет результатов'}

        </>
});

export default SearchResults;

export const SearchStoreResults = SearchResultsFromSearchStore(SearchResults);

export const Favourites = SearchResultsFavourites(SearchResults);

export const UserProfileResults = SearchResultsFromUserProfile(SearchResults);
