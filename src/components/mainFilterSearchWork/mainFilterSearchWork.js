import React, {Component} from "react";
import './mainFilterSearchWork.css';
import RangeSlider from "../rangeSlider";

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
            <div className='main-filter-search'>
                <div className='wrap-box button-group container'>
                    <div className='col-xs-12 col-md-6 col-lg-4 main-filter-search-block'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-text'>Выберете страну</p>
                            <select className='col-12 input'>

                            </select>
                        </div>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-text'>Выберете город</p>
                            <select className='col-12 input'>

                            </select>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-4 main-filter-search-block'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-text'>Кого вы ищите?</p>
                            <select className='col-12 input' onChange={(e)=>onChange(e.target.value)}>
                                <option value='nanny'>Няня</option>
                                <option value='doctor'>Врач</option>
                            </select>
                        </div>
                        <div className='main-filter-search-subBlock'>
                            <p className='long-text'>Предлагаемая заработная плата</p>
                            <div className='group-input'>
                                <input className='col-5 input input-center' type='text'/>
                                <select className='col-5 input'>

                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-4 box-center main-filter-search-subBlock'>
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
                            <input className='col-6 input input-margin'
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
