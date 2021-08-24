import React, {Component} from "react";

import './mainFilterSearch.css';
import MultiRangeSlider from "../multiRangeSlider";
import RangeSlider from "../rangeSlider";
import Select from "../select";
import { requestWithParams } from "../../api/exchangeLayer";
import MenuButtonsDocs from "../menuButtonsDocs";
import { SalaryTypes } from "../../common/consts";

export default class MainFilterSearch extends Component {

    state = {
        experience: 0,
        minAge: 18,
        maxAge: 60,
        professions: [],
        country: '',
        city: '',
        salary: '',
        typeSalary: '',
        currentProffession: null,
        categories: null,
        selectedParameters: []
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

    onChangeProffession(newProfID) {
        this.setState({ currentProffession: newProfID })
    }

    onChangeExperience = (value) => {
        this.setState({experience: value});
    }

    onChangeMultiRange = (value, index) => {
        const {minAge, maxAge} = this.state;
        if (index === 0) {
            if (value[index] > maxAge) {
                this.setState({minAge: maxAge - 1});
            } else {
                this.setState({minAge: value[index]});
            }
        } else {
            if (value[index] < minAge) {
                this.setState({maxAge: minAge + 1});
            } else {
                this.setState({maxAge: value[index]});
            }
        }
    }

    onChangeMultiRangeFromText = (value, index) => {
        const {minAge, maxAge} = this.state;
        if (index === 0) {
            if (value > maxAge) {
                this.setState({minAge: maxAge - 1});
            } else {
                this.setState({minAge: value});
            }
        } else {
            if (value < minAge) {
                this.setState({maxAge: minAge + 1});
            } else {
                this.setState({maxAge: value});
            }
        }
    }

    onCheckChanged() {
        return (newIDs) => this.setState({ selectedParameters: newIDs });
    }

    sendFilters() {
        const { currentProffession, selectedParameters, salary, typeSalary, maxAge, minAge, experience } = this.state;
        console.log(this.state);

        requestWithParams('getVacancies', {
            country: '',
            city: '',
            category: currentProffession || '',
            years_with: minAge,
            years_to: maxAge,
            experience: experience,
            salary: salary,
            salary_type: typeSalary,
            sub_category_list: selectedParameters

        }).catch(e => console.error(e));
    };

    onSetTypeSalary(value){
        this.setState({typeSalary: value});
    };

    onChangeSalary = (value) =>{
        this.setState({salary: value});
    }

    render() {
        return (
            <div className='main-filter'>
                <div className='filter container'>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-long-text'>Выберите страну</p>
                            <Select>
                            </Select>
                        </div>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-long-text'>Выберите город</p>
                            <Select>
                            </Select>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-long-text'>Кого вы ищите?</p>
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
                    <div className='col-xs-12 col-md-6 col-lg-3'>
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
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <p className='bg-long-text'>Возраст</p>
                        <div>
                            <MultiRangeSlider min={18} max={60} minAge={this.state.minAge} maxAge={this.state.maxAge}
                                              onChange={this.onChangeMultiRange}/>
                            <div className='text-slider'>
                                <p>до 18 лет</p>
                                <p>60+ лет</p>
                            </div>
                        </div>
                        <div className='group-mini-input '>
                            <div className='box-inputs-labels'>
                                <p className='labels sml-text'>от</p>
                                <input className='input-mini-number'
                                       type='text'
                                       value={this.state.minAge}
                                       onChange={(e) => {
                                           console.log(e.target.value);
                                           this.onChangeMultiRangeFromText(e.target.value, 0)
                                       }}
                                />
                            </div>
                            <div className='box-inputs-labels'>
                                <p className='labels sml-text'>до</p>
                                <input className='input-mini-number'
                                       type='text'
                                       value={this.state.maxAge}
                                       onChange={(e) => {
                                           this.onChangeMultiRangeFromText(e.target.value, 1)
                                       }}
                                />
                            </div>
                        </div>
                    </div>

                    {this.state.categories && <MenuButtonsDocs
                        categories={this.state.categories}
                        selectedParameters={this.state.selectedParameters}
                        onCheckChanged={this.onCheckChanged()}/>}
                    {/* Поміняти на норм кнопку */}
                    <div className='container center margin-top-15'>
                        <button
                            className='img-button'
                            onClick={() => this.sendFilters()}>
                            Подобрать анкеты
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};