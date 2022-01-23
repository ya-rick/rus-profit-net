import React from 'react';
import { inject, observer } from 'mobx-react';

import WorkExperience from '../../../common/components/WorkExperience';
import AgeChooser from '../../../common/components/AgeChooser';
import SuggestSalary from '../../../common/components/SuggestSalary';
import Input from '../../../common/components/Input';
import { SearchableMultiSelect } from '../nameContact/searchableMultiSelect';
import { AdaptiveGrid } from '../../../common/components/Layouts';
import styled from 'styled-components';
import { RegularTitle } from '../../../common/components/Typography';


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
        <Wrapper isBigger={!isResume}>
            <SearchableMultiSelect
                onTagClick={(tag) => onChangeActiveEditableCountry(tag)}
                onTagDelete={(tag) => onChangeCountries(tag, 'delete')}
                chosenOptions={chosenCountries}
                requestType={'get_countries'}
                isCountry={true}
                onItemSelected={(tag) => onChangeCountries(tag, 'add')}
                editableCountryID={currentEditCountry?.id}
                emptyCaseMessage={'Все страны'}
                title={'Выберите страну'}

                style={{ gridArea: 'country' }}
            />

            <SearchableMultiSelect
                onTagClick={() => {}}
                onTagDelete={(tag) => onChangeCities(tag, 'delete')}
                chosenOptions={chosenCities}
                requestType={'get_cities'}
                isCountry={false}
                onItemSelected={(tag) => onChangeCities(tag, 'add')}
                editableCountryID={currentEditCountry?.id}
                emptyCaseMessage={'Все города'}
                title={'Выберите город'}
                
                style={{ gridArea: 'city' }}
            />
            {isResume ? <>
                <WorkExperience
                    min={0}
                    max={10}
                    onChange={onFieldChange('experience')}
                    value={experience}

                    style={{ gridArea: 'experience' }}
                />
                
                <SuggestSalary
                    onSelectChanged={onFieldChange('salary_type')}
                    onSalaryChanged={onFieldChange('salary')}
                    onCurrencyChanged={onFieldChange('currency')}
                    salary={salary}
                    currencyID={currency}
                    salaryTypeID={salary_type}
                    isResume={isResume}

                    style={{ gridArea: 'salary' }}
                />
            </> : <>
                <div style={{ gridArea: 'search' }}>
                    <RegularTitle>Название вакансии*</RegularTitle>
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
                    isResume={isResume}

                    style={{ gridArea: 'salary' }}
                />
                
                <AgeChooser
                    min={18}
                    max={60}
                    currentMinValue={years_with}
                    currentMaxValue={years_to}
                    onChangeMin={onFieldChange('years_with')}
                    onChangeMax={onFieldChange('years_to')}

                    style={{ gridArea: 'age' }}
                />
                
                <WorkExperience
                    min={0}
                    max={10}
                    onChange={onFieldChange('experience')}
                    value={experience}

                    style={{ gridArea: 'experience' }}
                />
            </>}
        </Wrapper>
    );
}

export default inject('registrationStore')(observer(RegisterFilterVacation));

const Wrapper = styled(AdaptiveGrid)`
    margin-block: 1rem;
`;
