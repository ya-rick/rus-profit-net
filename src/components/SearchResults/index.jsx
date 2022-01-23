import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import ResultCard from './ResultCard';
import { MainTitle } from '../../common/components/Typography';
import Loading from '../../common/components/Loading';
import { SearchResultsFavourites, SearchResultsFromSearchStore, SearchResultsFromUserProfile, SearchResultsViews } from '../../common/HOCs';
import { CommonButton, SecondaryButton } from '../../common/components/Buttons';
import styled from 'styled-components';
import { DefaultContainer } from '../../common/components/Layouts';


const SearchResults = observer(({
    isPresent, onSelectCallback, results = [], isLastPage,
    isLoading, isVacancy, showMoreCallback, viewsOrFavourites,
    resultsTitleVariants, userProfileInfo, TitleComponent = MainTitle,
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

    const FlexedTitle = styled(TitleComponent)`
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

    return <>
            <DefaultContainer>
                <FlexedTitle>
                    { isVacancy ? vacancyTitle : resumeTitle }
                    { onCreateClick && <SecondaryButton onClick={onCreateClick}>
                        Создать
                    </SecondaryButton>}
                </FlexedTitle>
            </DefaultContainer>

            {isPresent ?
                    results.map(result =>
                        <ResultCard
                            key={result.id}
                            result={result}
                            onSelectResult={bindOnSelectResult(result)}
                            userProfileInfo={userProfileInfo}
                            onDeleteCallback={onDeleteCallback}
                            viewsOrFavourites={viewsOrFavourites}
                        />
                    )
                : !isLoading && 'Нет результатов'}

            {isLoading && <Loading/>}

        </>
});

export default SearchResults;

export const SearchStoreResults = SearchResultsFromSearchStore(SearchResults);

export const Favourites = SearchResultsFavourites(SearchResults);
export const Views = SearchResultsViews(SearchResults);

export const UserProfileResults = SearchResultsFromUserProfile(SearchResults);
