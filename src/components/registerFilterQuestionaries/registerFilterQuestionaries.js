import React, {Component} from 'react';
import styled from 'styled-components'

import SuggestSalary from '../../common/components/SuggestSalary';
import { PageContentWrapper, Centerer } from '../../common/components/Layouts';
import WorkExperience from '../../common/components/WorkExperience';

export default class RegisterFilterQuestionaries extends Component {

    render() {
        const { onChangeData, data: { salary, experience } } = this.props;

        return (
            <PageContentWrapper>
                <TwoColumnsCenterer>
                    <WorkExperience
                        min={0}
                        max={10}
                        onChange={onChangeData('experience')}
                        value={experience}
                    />

                    <SuggestSalary
                        onSelectChanged={onChangeData('salary_type')}
                        onSalaryChanged={onChangeData('salary')}
                        onCurrencyChanged={onChangeData('currency')}
                        currencyValue={salary}
                    />
                </TwoColumnsCenterer>
            </PageContentWrapper>
        )
    }
}

const TwoColumnsCenterer = styled(Centerer)`
    gap: 100px;

    > * {
        flex-basis: 35%;
    }

    @media (max-width: 650px) {
        flex-wrap: wrap;

        > * {
            flex-basis: 100%;
        }
    }
`;
