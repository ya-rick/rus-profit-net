import React, {Component} from "react";

import './mainFilterSearch.css';

import Select from "../select";
import { requestWithParams } from "../../api/exchangeLayer";
import MenuButtonsDocs from "../menuButtonsDocs";
import LinkedButton from "../../common/components/LinkedButton";
import { SearchResultContext } from "../mainPage/contexts";
import { Redirect } from "react-router-dom";
import { Centerer, GapedAdaptiveCenterer, PageContentWrapper } from "../../common/components/Layouts";
import AgeChooser from "../../common/components/AgeChooser";
import WorkExperience from "../../common/components/WorkExperience";
import SuggestSalary from "../../common/components/SuggestSalary";
import { SearchableMultiSelect } from "../nameContact/searchableMultiSelect";
import { clamp } from "../../common/utils";
import ErrorMessage from "../../common/components/ErrorMessage";
import styled from "styled-components";

class MainFilterSearch extends Component {

    constructor() {
        super();

        this.state = {
            experience: 0,
            minAge: 18,
            maxAge: 60,
            professions: [],
            country: [],
            city: [],
            salary: 0,
            typeSalary: '',
            currentProffession: null,
            categories: null,
            selectedParameters: [],
            isRedirecting: false,
            currency: '',
            currentEditCountry: null,

            error: ''
        }
    }

    setRedirectToTrue() {
        this.setState({ isRedirecting: true })
    }

    componentDidMount() {
        requestWithParams('getProfessions').then(data => this.setState({ professions: data.options }));
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.currentProffession !== this.state.currentProffession) && (this.state.currentProffession !== null)) {
            requestWithParams('getFiltersByProfession', { value: this.state.currentProffession })
                .then(data => this.setState({ categories: data.category, selectedParameters: [] }));
        }
    }

    onChangeCountries = (newCountry, operationType) => {
        let newCountries = [...this.state.country];
        let newActiveEditableCountry = null;

        if (this.state.country.length === 3  && operationType !== 'delete') {
            return;
        }

        if (operationType === 'delete') {

            const countryIndex = this.state.country
                .findIndex(country => country.id === newCountry.id);
            newCountries
                .splice(countryIndex, 1);

            if (this.state.city[countryIndex]) {
                this.state.city.splice(countryIndex);
            }
            
            if (newCountries.length === 0) {
                newActiveEditableCountry = null;
            } else {
                newActiveEditableCountry = clamp(0, countryIndex, newCountries.length - 2);
            }
        } else if (operationType === 'add') {
            newCountries.push(newCountry);

            newActiveEditableCountry = newCountry;
        }

        this.setState({ 
            ...this.state, 
            country: [...newCountries],
            currentEditCountry: newActiveEditableCountry
        });
    }

    onChangeCities = (newCity, operationType) => {

        const { country, city, currentEditCountry } = this.state;

        if (city?.flat().length === 3 && operationType !== 'delete') {
            return;
        }

        const editableIndex = country.findIndex(country => 
            country.id === currentEditCountry.id);

        let editableCitiesArray = null;

        if (city[editableIndex]) {
            editableCitiesArray = city[editableIndex];
        } else {
            editableCitiesArray = [];
            city.push(editableCitiesArray);
        }

        if (operationType === 'delete') {
            editableCitiesArray.splice(editableCitiesArray.findIndex(city => city.id === newCity.id), 1);

            if (editableCitiesArray.length === 0) {
                city.splice(editableIndex, 1);
            }
        } else if (operationType === 'add') {
            editableCitiesArray.push(newCity);
        }

        this.setState({ 
            ...this.state,
            city: [...this.state.city]
        })
    }

    onChangeActiveEditableCountry =(newCountry) => {
        this.setState({ ...this.state, currentEditCountry: newCountry });
    }

    onChangeProffession = (value) => {
        this.setState({ currentProffession: value });
    }

    onChangeExperience = (value) => {
        this.setState({experience: value});
    }

    onChangeExperience = (value) => {
        this.setState({experience: value});
    }

    onChangeAge = (value) => {
        let [newFrom, newTo] = value;

        this.setState({ maxAge: newTo, minAge: newFrom });
    }

    onCheckChanged() {
        return (newIDs) => this.setState({ selectedParameters: newIDs });
    }

    sendFilters() {
        const { currentProffession, selectedParameters,
            salary, typeSalary, maxAge, minAge, experience,
            currency, country, city } = this.state;

            if (city.length === 0 || !currentProffession) {
                this.setState({ ...this.state,
                    error: 'Необходимо выбрать хотя бы 1 город и профессию' })
                
                return;
            }

        requestWithParams('getResumes', {
            country: country.map(country => country.name).join(','),
            city: city.reduce((acc, cities) => (acc.push(cities.map(city => city.name).join(',')), acc), [])
            .join(';'),
            category: currentProffession || '',
            years_with: minAge || '',
            years_to: maxAge || '',
            experience: experience || '',
            salary: salary || '',
            salary_type: typeSalary || '',
            sub_category_list: selectedParameters,
            currency
        })
        .then(data => {
            this.context.setResults(data.resume);
            this.setRedirectToTrue();
        })
        .catch(e => this.setState({ ...this.state,
            error: 'Нет данных' }));
    };

    onSetTypeSalary = (value) =>{
        this.setState({typeSalary: value});
    }

    onChangeSalary = (value) =>{
        this.setState({salary: value});
    }

    onChangeCurrency = (currency) => {
        this.setState({currency});
    }

    render() {
        if (this.state.isRedirecting) {
            return <Redirect to={'/questionaries'}/>
        }

        return (
            <PageContentWrapper>
                <GapedAdaptiveCenterer>
                    <VerticalCenterer>
                        <div className='name-info-subblock'>
                            <p className='bg-long-text'>Выберите страну*</p>
                            <SearchableMultiSelect
                                onTagClick={(tag) => this.onChangeActiveEditableCountry(tag)}
                                onTagDelete={(tag) => this.onChangeCountries(tag, 'delete')}
                                chosenOptions={this.state.country}
                                requestType={'get_countries'}
                                isCountry={true}
                                onItemSelected={(tag) => this.onChangeCountries(tag, 'add')}
                                editableCountryID={this.state.currentEditCountry?.id}
                            />
                        </div>

                        <div className='name-info-subblock'>
                            <p className='bg-long-text'>Выберите город</p>
                            <SearchableMultiSelect
                                onTagClick={(tag) => {}}
                                onTagDelete={(tag) => this.onChangeCities(tag, 'delete')}
                                chosenOptions={this.state.city?.flat()}
                                requestType={'get_cities'}
                                isCountry={false}
                                onItemSelected={(tag) => this.onChangeCities(tag, 'add')}
                                editableCountryID={this.state.currentEditCountry?.id}
                            />
                        </div>
                    </VerticalCenterer>
                
                    <div>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-long-text'>Кого вы ищете?</p>
                            <Select onItemClickCallback={obj => this.onChangeProffession(obj.id)}>
                                {this.state.professions}
                            </Select>
                        </div>
                        <SuggestSalary
                            onSelectChanged={this.onSetTypeSalary}
                            onSalaryChanged={this.onChangeSalary}
                            onCurrencyChanged={this.onChangeCurrency}
                            currencyValue={this.state.salary}
                        />
                    </div>

                    <WorkExperience
                        min={0}
                        max={10}
                        onChange={this.onChangeExperience}
                        value={this.state.experience}
                    />

                    <AgeChooser
                        min={18}
                        max={60}
                        currentMinValue={this.state.minAge}
                        currentMaxValue={this.state.maxAge}
                        onChangeAge={this.onChangeAge}
                    />
                </GapedAdaptiveCenterer>

                {this.state.categories && <MenuButtonsDocs
                    categories={this.state.categories}
                    selectedParameters={this.state.selectedParameters}
                    onCheckChanged={this.onCheckChanged()}/>}
                
                {this.state.error && <ErrorMessage>{this.state.error}</ErrorMessage>}

                <VerticalCenterer style={{ marginTop: '70px' }}>
                    <LinkedButton
                        onClick={() => this.sendFilters()}>
                        Подобрать анкеты
                    </LinkedButton>
                </VerticalCenterer>
            </PageContentWrapper>
        );
    }
};

MainFilterSearch.contextType = SearchResultContext;

export default MainFilterSearch;

const VerticalCenterer = styled(Centerer)`
    flex-direction: column;
`;
