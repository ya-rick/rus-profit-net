import React from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';

import ResultCard from './ResultCard';
import { PageContentWrapper } from '../../common/components/Layouts';
import PageTitle from '../../common/components/PageTitle';


function SearchResults({ searchStore }) {
    const { results, isResultsPresent, resultsType } = searchStore;

    if (!isResultsPresent) {
        return <Redirect to={'/searchWork'}/>
    }

    return(
        <PageContentWrapper>
            <PageTitle>{resultsType === 'getVacancies' ? 'Вакансии' : 'Анкеты'}</PageTitle>

            {results && results.map(result => <ResultCard
                key={result.id}
                result={result}
                resultType={resultsType}
            />)}
        </PageContentWrapper>
    );
};

export default inject('searchStore')(observer(SearchResults));
