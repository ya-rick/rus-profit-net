import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { autorun } from 'mobx';
import styled from 'styled-components';

import './mainFilterSearch.css';

import Select from '../../common/components/select';
import MenuButtonsDocs from '../menuButtonsDocs';
import { CommonButton } from '../../common/components/Buttons';
import { AdaptiveGrid, Centerer, PageContentWrapper } from '../../common/components/Layouts';
import AgeChooser from '../../common/components/AgeChooser';
import WorkExperience from '../../common/components/WorkExperience';
import SuggestSalary from '../../common/components/SuggestSalary';
import { SearchableMultiSelect } from '../nameContact/searchableMultiSelect';
import ErrorMessage from '../../common/components/ErrorMessage';
import { useCategoryFilters } from '../../common/hooks';
import { ModalVariants } from '../../common/consts';


function MainFilterSearch({ registrationStore, searchStore, uiStore: { openModal } }) {
    const [scrollToEl, setScrollToEl] = useState(null);
    const history = useHistory();

    const { mainFiltersStore, getInfoByFilters } = searchStore;

    const { pathname } = useLocation();

    function getSearchType(pathname) {
        return pathname === '/searchWorker' ? 'resume' : 'vacancy';
    }

    useEffect(() => {
        if (scrollToEl) {
            scrollToEl.scrollIntoView();
        }

        setField('type_search')(getSearchType(pathname));
    }, [scrollToEl, pathname]);

    const { setField, result_cat, years_with, years_to, error: { noFullInfo },
        experience, salary, category, salary_type, currency,
        cityCountryModel: {
            onChangeCities, onChangeCountries, chosenCountries, chosenCities, onChangeActiveEditableCountry,
            currentEditCountry, countries
        }, isSearchWorker } = mainFiltersStore;

    const { categories, setCurrentCategory, filtersByCategory } = useCategoryFilters(category.id);

    useEffect(() => {
        // Copying filters to registrations form
        const { targetedInfo } = registrationStore;

        const disposers = [];
        
        disposers.push(autorun(() => {
            targetedInfo.cityCountryModel.countries = countries;
        }))

        disposers.push(autorun(() => {
            targetedInfo.result_cat = result_cat;
        }))

        disposers.push(autorun(() => {
            targetedInfo.cityCountryModel.currentEditCountry = currentEditCountry;
        }))

        disposers.push(autorun(() => {
            targetedInfo.years_to = years_to;
        }))

        disposers.push(autorun(() => {
            targetedInfo.years_with = years_with;
        }))

        disposers.push(autorun(() => {
            targetedInfo.experience = experience;
        }))

        disposers.push(autorun(() => {
            targetedInfo.salary = salary;
        }))

        disposers.push(autorun(() => {
            targetedInfo.category = category;
        }))

        return () => disposers.forEach(disposer => disposer());
    })

    function onChangeCategory(category) {
        setField('category')(category);
        setCurrentCategory(category.id);
    }

    async function makeSearch() {
        try {
            await getInfoByFilters();

            window.scroll(0,0);

            history.push('/searchResults');
        } catch (e) {
            if (e.message === 'false') {
                return;
            } else {
                console.error(e);
            }

            openModal(ModalVariants.InfoModal, {
                title: 'К сожалению,',
                description: 'по Вашему запросу ничего не найдено. Попробуйте изменить параметры поиска'
            });
        }
    }

    return (
            <Wrapper>
                <AdaptiveGrid cols={isSearchWorker ? 3 : 4}>
                    <VerticalPlacesBlock
                        ref={el => setScrollToEl(el)}
                    >
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
                    </VerticalPlacesBlock>
                
                    <div>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-long-text'>{!isSearchWorker ? 'Кого вы ищете?'
                                : 'Вакансия'}</p>
                            {categories && <Select
                                onItemClickCallback={onChangeCategory}
                                current={category.id}
                            >
                                {categories}
                            </Select>}
                        </div>
                        <SuggestSalary
                            onSelectChanged={setField('salary_type')}
                            onSalaryChanged={setField('salary')}
                            onCurrencyChanged={setField('currency')}
                            salary={salary}
                            currencyID={currency}
                            salaryTypeID={salary_type}
                        />
                    </div>

                    <WorkExperience
                        min={0}
                        max={10}
                        onChange={setField('experience')}
                        value={experience}
                    />

                    {!isSearchWorker && <AgeChooser
                        min={18}
                        max={60}
                        currentMinValue={years_with}
                        currentMaxValue={years_to}
                        onChangeMin={setField('years_with')}
                        onChangeMax={setField('years_to')}
                    />}
                </AdaptiveGrid>

                {filtersByCategory && <MenuButtonsDocs
                    categories={filtersByCategory}
                    selectedParameters={result_cat}
                    onCheckChanged={setField('result_cat')}/>}

                {noFullInfo && <ErrorMessage>{noFullInfo}</ErrorMessage>}

                <VerticalCenterer>
                    <CommonButton
                        onClick={makeSearch}
                    >
                        Подобрать {isSearchWorker ? 'вакансии' : 'анкеты'}
                    </CommonButton>
                </VerticalCenterer>
            </Wrapper>
        );
};

export default inject('registrationStore', 'searchStore', 'uiStore')(observer(MainFilterSearch));

const Wrapper = styled(PageContentWrapper)`
    display: grid;
    row-gap: 40px;
`;

const VerticalCenterer = styled(Centerer)`
    flex-direction: column;
`;

const VerticalPlacesBlock = styled(VerticalCenterer)`
    align-items: stretch;
`;
