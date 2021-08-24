import React, {Component} from "react";
import './mainFilterSearchWork.css';
import RangeSlider from "../rangeSlider";
import Select from "../select";

import { requestWithParams } from "../../api/exchangeLayer";
import MenuButtonsDocs from "../menuButtonsDocs";
import { SalaryTypes } from "../../common/consts";
import { Redirect } from "react-router-dom";
import { SearchResultContext } from "../mainPage/contexts";

class MainFilterSearchWork extends Component {

    constructor() {
        super();

        this.state = {
            experience: 0,
            professions: [],
            country: '',
            city: '',
            salary: '',
            typeSalary: '',
            currentProffession: null,
            categories: null,
            selectedParameters: [],
            isRedirecting: false
        }
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

    setRedirectToTrue() {
        this.setState({ isRedirecting: true });
        console.log(this.state.isRedirecting)
    }

    onChangeProffession(newProfID) {
        this.setState({ currentProffession: newProfID })
    }

    onChangeExperience = (value) => {
        this.setState({experience: value});
    }

    onCheckChanged() {
        return (newIDs) => this.setState({ selectedParameters: newIDs });
    }

    sendFilters() {
        const { currentProffession, selectedParameters, salary, typeSalary, experience } = this.state;
        console.log(this.state);

        requestWithParams('getResumes', {
            country: '',
            city: '',
            category: currentProffession || '',
            experience: experience || '',
            salary: salary || '',
            salary_type: typeSalary || '',
            sub_category_list: selectedParameters

        })
        .then(data => {
            this.context.setResults(data.resume);
            this.setRedirectToTrue();
        })
        .catch(e => console.error(e));
    };

    onSetTypeSalary(value){
        this.setState({typeSalary: value});
    };

    onChangeSalary = (value) =>{
        this.setState({salary: value});
    }

    render() {
        if (this.state.isRedirecting) {
            return <Redirect to={'/questionaries'}/>
        }

        return (
            <div className='main-filter'>
                <div className='filter container'>
                    <div className='col-xs-12 col-md-4 col-lg-4'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-long-text'>Выберете страну</p>
                            <Select>
                            </Select>
                        </div>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-long-text'>Выберете город</p>
                            <Select>
                            </Select>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-4 col-lg-4'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-long-text'>Вакансия</p>
                            <Select onItemClickCallback={obj => this.onChangeProffession(obj.id)}>
                                {this.state.professions}
                            </Select>
                        </div>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-long-text'>Предлагаемая заработная плата</p>
                            <div className='group-input'>
                                <input className='select-mini-input' type='text' onChange={(e)=>this.onChangeSalary(e.target.value)}/>
                                <div className='select-mini-input-s'>
                                    <Select onItemClickCallback={obj => this.onSetTypeSalary(obj.id) }>
                                        {Object.entries(SalaryTypes).map(([id, name]) => ({ id, name }))}
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-4 col-lg-4'>
                        <p className='bg-long-text'>Опыт работы</p>
                        <div>
                            <RangeSlider min={0} max={10} value={this.state.experience}
                                         onChange={this.onChangeExperience}/>
                            <div className='text-slider'>
                                <p>без опыта</p>
                                <p>более 10 лет</p>
                            </div>
                        </div>
                        <div className='col-12 input-center'>
                            <input className='input-number'
                                   type='text'
                                   value={this.state.experience}
                                   onChange={(e) => {
                                       this.onChangeExperience(e.target.value)
                                   }}
                            />
                        </div>
                    </div>
                    {this.state.categories && <MenuButtonsDocs
                        categories={this.state.categories}
                        selectedParameters={this.state.selectedParameters}
                        onCheckChanged={this.onCheckChanged()}/>}
                    {/* Поміняти на норм кнопку */}
                    <div className='container center margin-top-15'>
                        <button
                            className='img-reg-button'
                            onClick={() => this.sendFilters()}>
                            Подобрать вакансии
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

MainFilterSearchWork.contextType = SearchResultContext;

export default MainFilterSearchWork;
