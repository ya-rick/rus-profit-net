import React from "react";
import { inject, observer } from "mobx-react";

import './registerFilterVacation.css';

import WorkExperience from "../../../common/components/WorkExperience";
import AgeChooser from "../../../common/components/AgeChooser";
import { Centerer, GapedAdaptiveCenterer } from "../../../common/components/Layouts";
import SuggestSalary from "../../../common/components/SuggestSalary";
import Input from "../../../common/components/Input";
import styled from "styled-components";

function RegisterFilterVacation({ registrationStore }) {

    const { setField, commonInfo: { registration_type },
        targetedInfo: { name, years_with, years_to, experience, salary } } = registrationStore;

    return (
        registration_type === 'vacancy' ? <GapedAdaptiveCenterer>
            <div>
                <p className='bg-reg-text'>Название вакансии*</p>
                <Input
                    className='input-reg'
                    value={name}
                    onChange={e => setField('name')(e.target.value)}
                />
            </div>
            
            <AgeChooser
                min={18}
                max={60}
                currentMinValue={years_with}
                currentMaxValue={years_to}
                onChangeMin={setField('years_with')}
                onChangeMax={setField('years_to')}
            />
            
            <WorkExperience
                min={0}
                max={10}
                onChange={setField('experience')}
                value={experience}
            />
            
            <SuggestSalary
                onSelectChanged={setField('salary_type')}
                onSalaryChanged={setField('salary')}
                onCurrencyChanged={setField('currency')}
                currencyValue={salary}
            />
        </GapedAdaptiveCenterer>
        : <TwoColumnsLayout>
            <WorkExperience
                min={0}
                max={10}
                onChange={setField('experience')}
                value={experience}
            />
            
            <SuggestSalary
                onSelectChanged={setField('salary_type')}
                onSalaryChanged={setField('salary')}
                onCurrencyChanged={setField('currency')}
                currencyValue={salary}
            />
        </TwoColumnsLayout>
    )
}

export default inject('registrationStore')(observer(RegisterFilterVacation));

const TwoColumnsLayout = styled(Centerer)`
    flex-wrap: wrap;
    gap: 100px;
`;
