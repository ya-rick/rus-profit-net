import React, {Component} from "react";
import './mainFilterSearchWork.css';
import RangeSlider from "../rangeSlider";
import MultiRangeSlider from "../multiRangeSlider";

export default class MainFilterSearchWork extends Component {

    state = {
        experience: 0,
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
                            <p className='bg-text'>Выберете страну</p>
                            <select className='select-input'>

                            </select>
                        </div>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-text'>Выберете город</p>
                            <select className='select-input'>

                            </select>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-4 col-lg-4'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-text'>Кого вы ищите?</p>
                            <select className='select-input' onChange={(e)=>onChange(e.target.value)}>
                                <option value='nanny'>Няня</option>
                                <option value='doctor'>Врач</option>
                            </select>
                        </div>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-long-text'>Предлагаемая заработная плата</p>
                            <div className='group-input'>
                                <input className='col-4 select-mini-input' type='text'/>
                                <select className='col-4 select-mini-input'>

                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-4 col-lg-4'>
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
                </div>
            </div>
        );
    }
};
