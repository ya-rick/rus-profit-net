import React, {Component} from "react";
import './mainFilterSearchWork.css';
import RangeSlider from "../rangeSlider";
import Select from "../select";

const testOptins = [
    {
        value: 1,
        text: 'Test'
    },
    {
        value: 2,
        text: 'Test'
    },
    {
        value: 3,
        text: 'Test'
    }
]

export default class MainFilterSearchWork extends Component {

    state = {
        experience: 0,
        minAge: 18,
        maxAge: 60,
    }

    onChangeExperience = (value) => {
        this.setState({experience: value});
    }

    render() {
        const {onChange} = this.props;
        return (
            <div className='main-filter'>
                <div className='filter container'>
                    <div className='col-xs-12 col-md-4 col-lg-4'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-long-text'>Выберете страну</p>
                            <Select>
                                {testOptins}
                            </Select>
                        </div>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-long-text'>Выберете город</p>
                            <Select>
                                {testOptins}
                            </Select>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-4 col-lg-4'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-long-text'>Кого вы ищите?</p>
                            <Select onItemClickCallback={(value) => onChange(value)}>
                                {[
                                    {value: 'nanny', text: 'Няня'},
                                    {value: 'doctor', text: 'Врач'}
                                ]}
                            </Select>
                        </div>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-long-text'>Предлагаемая заработная плата</p>
                            <div className='group-input'>
                                <input className='col-4 select-mini-input' type='text'/>
                                <div className='select-mini-input-s'>
                                    <Select>
                                        {testOptins}
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
                </div>
            </div>
        );
    }
};
