import React, {Component} from "react";
import './registerFilterQuestionaries.css';
import RangeSlider from "../rangeSlider";
import Select from "../select";

export default class RegisterFilterQuestionaries extends Component {

    state = {
        experience: 0,
        minAge: 18,
        maxAge: 60,
    }

    onChangeExperience = (value) => {
        this.setState({experience: value});
    }

    render() {
        return (
            <div className='main-reg-filter'>
                <div className='filter container row center'>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <p className='bg-reg-text'>Опыт работы</p>
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
                        <p className='bg-reg-text'>Желаемая заработная плата</p>
                        <div className='group-input'>
                            <input className='col-4 select-mini-input' type='text'/>
                            <div className='select-mini-input-s'>
                                <Select>
                                    {[
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
                                    ]}
                                </Select>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
