import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import './registerFilterVacation.css';

import WorkExperience from '../../../common/components/WorkExperience';
import AgeChooser from '../../../common/components/AgeChooser';
import SuggestSalary from '../../../common/components/SuggestSalary';
import Input from '../../../common/components/Input';
import { SearchableMultiSelect } from '../../nameContact/searchableMultiSelect';


function RegisterFilterVacation({
    onFieldChange, isResume,
    fields: {
        vacancy_name, years_with, years_to, experience, salary, currency, salary_type,
        cityCountryModel: {
            onChangeActiveEditableCountry, onChangeCountries, chosenCountries, currentEditCountry,
            onChangeCities, chosenCities
        }
    }
}) {

    return (
        <Layout cols={isResume ? 2 : 3}>
            <div className='name-info-subblock'>
                <p className='bg-long-text'>Выберите страну*</p>
                <SearchableMultiSelect
                    onTagClick={(tag) => onChangeActiveEditableCountry(tag)}
                    onTagDelete={(tag) => onChangeCountries(tag, 'delete')}
                    chosenOptions={chosenCountries}
                    requestType={'get_countries'}
                    isCountry={true}
                    onItemSelected={(tag) => onChangeCountries(tag, 'add')}
                    editableCountryID={currentEditCountry?.id}
                />
            </div>

            <div className='name-info-subblock'>
                <p className='bg-long-text'>Выберите город</p>
                <SearchableMultiSelect
                    onTagClick={() => {}}
                    onTagDelete={(tag) => onChangeCities(tag, 'delete')}
                    chosenOptions={chosenCities}
                    requestType={'get_cities'}
                    isCountry={false}
                    onItemSelected={(tag) => onChangeCities(tag, 'add')}
                    editableCountryID={currentEditCountry?.id}
                />
            </div>
            {isResume ? <>
                <WorkExperience
                    min={0}
                    max={10}
                    onChange={onFieldChange('experience')}
                    value={experience}
                />
                
                <SuggestSalary
                    onSelectChanged={onFieldChange('salary_type')}
                    onSalaryChanged={onFieldChange('salary')}
                    onCurrencyChanged={onFieldChange('currency')}
                    salary={salary}
                    currencyID={currency}
                    salaryTypeID={salary_type}
                />
            </> : <>
                <div>
                    <p className='bg-long-text'>Название вакансии*</p>
                    <Input
                        value={vacancy_name}
                        onChange={e => onFieldChange('vacancy_name')(e.target.value)}
                    />
                </div>

                <SuggestSalary
                    onSelectChanged={onFieldChange('salary_type')}
                    onSalaryChanged={onFieldChange('salary')}
                    onCurrencyChanged={onFieldChange('currency')}
                    salary={salary}
                    currencyID={currency}
                    salaryTypeID={salary_type}
                />
                
                <AgeChooser
                    min={18}
                    max={60}
                    currentMinValue={years_with}
                    currentMaxValue={years_to}
                    onChangeMin={onFieldChange('years_with')}
                    onChangeMax={onFieldChange('years_to')}
                />
                
                <WorkExperience
                    min={0}
                    max={10}
                    onChange={onFieldChange('experience')}
                    value={experience}
                />
            </>}
        </Layout>
    )
}

export default inject('registrationStore')(observer(RegisterFilterVacation));

const Layout = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.cols}, 1fr);
    gap: 20px;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;
