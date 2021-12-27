import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { autorun } from 'mobx';
import styled from 'styled-components';

import MenuButtonsDocs from '../AdditionalParams';
import { CommonButton } from '../../common/components/Buttons';
import { AdaptiveGrid, Centerer, MainContainer } from '../../common/components/Layouts';
import AgeChooser from '../../common/components/AgeChooser';
import WorkExperience from '../../common/components/WorkExperience';
import SuggestSalary from '../../common/components/SuggestSalary';
import { SearchableMultiSelect } from '../register/nameContact/searchableMultiSelect';
import ErrorMessage from '../../common/components/ErrorMessage';
import { useCategoryFilters } from '../../common/hooks';
import { ModalVariants } from '../../common/consts';
import WorkSearchSelect from '../../common/components/WorkSearchSelect';
import { TwoLinkedButtonGroup } from '../../common/components/StaticPagesStyles';


function MainFilterSearch({
    registrationStore, searchStore, uiStore: { openModal },
    localeService
}) {
    const [scrollToEl, setScrollToEl] = useState(null);
    const history = useHistory();

    const { mainFiltersStore, getInfoByFilters } = searchStore;

    const { pathname } = useLocation();

    function getSearchType(pathname) {
        return pathname === '/searchWorker' ? 'resume' : 'vacancy';
    }

    useEffect(() => {
        // if (scrollToEl) {
        //     scrollToEl.scrollIntoView();
        // }

        setField('type_search')(getSearchType(pathname));
    }, [scrollToEl, pathname]);

    const { setField, result_cat, years_with, years_to, error: { noFullInfo },
        experience, salary, category, salary_type, currency,
        cityCountryModel: {
            onChangeCities, onChangeCountries, chosenCountries, chosenCities, onChangeActiveEditableCountry,
            currentEditCountry, countries
        }, isSearchWorker } = mainFiltersStore;

    const { categories, setCurrentCategory, filtersByCategory } = useCategoryFilters(category.id);

    let empty_categories = { categories_and: [], categories_or: [] };

    const { categories_and, categories_or } = filtersByCategory?.reduce((acc, category) => {
        if (category.category_type === 'AND') {
            acc.categories_and.push(category);
        } else {
            acc.categories_or.push(category);
        }

        return acc;
    }, empty_categories) || empty_categories;

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
            }

            openModal(ModalVariants.InfoModal, {
                title: 'Ошибка!',
                description: localeService.getByKey(e.message)
            });
        }
    }

    return (
        <Wrapper>
            <AdaptiveGrid isBigger={!isSearchWorker}>
                
                <SearchableMultiSelect
                    onTagClick={(tag) => onChangeActiveEditableCountry(tag)}
                    onTagDelete={(tag) => onChangeCountries(tag, 'delete')}
                    chosenOptions={chosenCountries}
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
                    isCountry={false}
                    onItemSelected={(tag) => onChangeCities(tag, 'add')}
                    editableCountryID={currentEditCountry?.id}
                    emptyCaseMessage={'Все города'}
                    title={'Выберите город'}

                    style={{ gridArea: 'city' }}
                />
            
                <WorkSearchSelect
                    categories={categories}
                    currentCategoryId={category.id}
                    isSearchWorker={isSearchWorker}
                    onChange={onChangeCategory}

                    style={{ gridArea: 'search' }}
                />

                <SuggestSalary
                    onSelectChanged={setField('salary_type')}
                    onSalaryChanged={setField('salary')}
                    onCurrencyChanged={setField('currency')}
                    salary={salary}
                    currencyID={currency}
                    salaryTypeID={salary_type}

                    style={{ gridArea: 'salary' }}
                />

                <WorkExperience
                    min={0}
                    max={10}
                    onChange={setField('experience')}
                    value={experience}

                    style={{ gridArea: 'experience' }}
                />

                {!isSearchWorker && <AgeChooser
                    min={18}
                    max={60}
                    currentMinValue={years_with}
                    currentMaxValue={years_to}
                    onChangeMin={setField('years_with')}
                    onChangeMax={setField('years_to')}

                    style={{ gridArea: 'age' }}
                />}
            </AdaptiveGrid>

            {filtersByCategory && <>
                {categories_and.length > 0 && <MenuButtonsDocs
                    categories={categories_and}
                    selectedParameters={result_cat}
                    onCheckChanged={setField('result_cat')}
                    title={'Заголовок 1 (AND)'}
                />}

                {categories_or.length > 0 && <MenuButtonsDocs
                    categories={categories_or}
                    selectedParameters={result_cat}
                    onCheckChanged={setField('result_cat')}
                    title={'Заголовок 2 (OR)'}
                />}
            </>}

            {noFullInfo && <ErrorMessage>{noFullInfo}</ErrorMessage>}

            <TwoLinkedButtonGroup>
                <CommonButton
                    onClick={makeSearch}
                >
                    Подобрать {isSearchWorker ? 'вакансии' : 'анкеты'}
                </CommonButton>
            </TwoLinkedButtonGroup>
        </Wrapper>
    );
};

export default inject('registrationStore', 'searchStore', 'uiStore', 'localeService')(observer(MainFilterSearch));

const Wrapper = styled(MainContainer)`
    display: grid;
    row-gap: 2rem;
    width: 100%;
`;
