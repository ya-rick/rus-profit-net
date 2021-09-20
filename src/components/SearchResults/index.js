import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';

import ResultCard from './ResultCard';
import { PageContentWrapper } from '../../common/components/Layouts';
import PageTitle from '../../common/components/PageTitle';
import Loading from '../../common/components/Loading';


function SearchResults({ searchStore }) {

    const {
        results, isResultsPresent, isLastPage, isLoading, showMoreInfo,
        mainFiltersStore: { filterType }
    } = searchStore;

    useEffect(() => {
        const listener = window.addEventListener('scroll', e => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

            if (!isLastPage && !isLoading && (scrollTop + clientHeight >= scrollHeight - 100)) {
                showMoreInfo();
            }
        })

        return () => window.removeEventListener('scroll', listener);

    }, [isLastPage, isLoading, showMoreInfo]);

    if (!isResultsPresent) {
        return <Redirect to={'/'}/>
    }

    return(
        <PageContentWrapper>
            <PageTitle>{filterType === 'getVacancies' ? 'Вакансии' : 'Анкеты'}</PageTitle>

            {results && results.map(result => <ResultCard
                key={result.id}
                result={result}
            />)}

            {isLoading && <Loading/>}
        </PageContentWrapper>
    );
};

export default inject('searchStore')(observer(SearchResults));
