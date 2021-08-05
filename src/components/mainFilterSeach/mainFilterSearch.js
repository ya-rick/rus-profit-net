import React, {Component} from "react";

import './mainFilterSearch.css';
import MultiRangeSlider from "../multiRangeSlider";
import RangeSlider from "../rangeSlider";
import Select from '../select';

export default class MainFilterSearch extends Component {

    state = {
        experience: 0,
        minAge: 18,
        maxAge: 60,
    }

    onChangeExperience = (value) => {
        this.setState({experience: value});
    }

    onChangeMultiRange = (value, index) => {
        const {minAge, maxAge} = this.state;
        if (index === 0) {
            if(value[index]> maxAge){
                this.setState({minAge: maxAge-1});
            }else{
                this.setState({minAge: value[index]});
            }
        } else {
            if(value[index]<minAge)
            {
                this.setState({maxAge: minAge+1});
            } else {
                this.setState({maxAge: value[index]});
            }
        }
    }

    onChangeMultiRangeFromText = (value, index) => {
        const {minAge, maxAge} = this.state;
        if (index === 0) {
            if(value> maxAge){
                this.setState({minAge: maxAge-1});
            }else{
                this.setState({minAge: value});
            }
        } else {
            if(value<minAge)
            {
                this.setState({maxAge: minAge+1});
            } else {
                this.setState({maxAge: value});
            }
        }
    }

    render() {
        const {onChange} = this.props;
        return (
            <div className='main-filter'>
                <div className='filter container'>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-text'>Выберете страну</p>
                            <Select className='col-12 input'>
                                <span>Test</span>
                                <span>Test</span>
                                <span>Test</span>
                                <span>Test</span>
                                <span>Test</span>
                                <span>Test</span>
                            </Select>
                        </div>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-text'>Выберете город</p>
                            <Select className='select-input'>
                            </Select>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-text'>Кого вы ищите?</p>
                            <Select className='select-input' onItemClickCallback={(index, title)=>onChange(title)}>
                                <option value='nanny'>Няня</option>
                                <option value='doctor'>Врач</option>
                            </Select>
                        </div>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-long-text'>Предлагаемая заработная плата</p>
                            <div className='group-input'>
                                <input className='col-4 select-mini-input' type='text'/>
                                <Select className='col-4 select-mini-input'>

                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <p className='bg-text'>Опыт работы</p>
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
                        <p className='bg-text'>Возраст</p>
                        <div>
                            <MultiRangeSlider min={18} max={60} minAge = {this.state.minAge} maxAge ={this.state.maxAge}
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
                </div>
            </div>
        );
    }
};
