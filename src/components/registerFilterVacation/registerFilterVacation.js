import React, {Component} from "react";
import './registerFilterVacation.css';
import MultiRangeSlider from "../multiRangeSlider";
import RangeSlider from "../rangeSlider";
import Select from "../select";
import { SalaryTypes } from "../../common/consts";
import { clamp } from "../../common/utils";

export default class RegisterFilterVacation extends Component {

    min = 18;
    max = 60;

    onChangeMultiRange = (value) => {
        const { onChangeData } = this.props;

        let [newFrom, newTo] = value;

        newFrom = clamp(this.min, newFrom, clamp(newFrom, newTo, this.max));
        newTo = clamp(newFrom, newTo, this.max);

        onChangeData('years')([newFrom, newTo]);
    }

    render() {
        const { onChangeData, data: { name, years_with, years_to, experience, salary } } = this.props;

        return (
            <div className='main-reg-filter'>
                <div className='filter container row'>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <p className='bg-reg-text'>Название вакансии*</p>
                        <input
                            className='input-reg'
                            type='text'
                            value={name}
                            onChange={e => onChangeData('name')(e.target.value)}
                        />
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <p className='bg-reg-text'>Возраст</p>
                        <div>
                            <MultiRangeSlider 
                                min={this.min}
                                max={this.max}
                                minAge={years_with}
                                maxAge={years_to}
                                onChange={this.onChangeMultiRange}
                            />
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
                                       value={years_with}
                                       onChange={(e) => onChangeData('years_with')(e.target.value)}
                                />
                            </div>
                            <div className='box-inputs-labels'>
                                <p className='labels sml-text'>до</p>
                                <input className='input-mini-number'
                                       type='text'
                                       value={years_to}
                                       onChange={(e) => onChangeData('years_to')(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <p className='bg-reg-text'>Опыт работы</p>
                        <div>
                            <RangeSlider
                                min={0}
                                max={10}
                                value={experience}
                                onChange={onChangeData('experience')}
                            />
                            <div className='text-slider'>
                                <p>без опыта</p>
                                <p>более 10 лет</p>
                            </div>
                        </div>
                        <div className='col-12 input-center'>
                            <input className='input-number'
                                   type='text'
                                   value={experience}
                                   onChange={(e) => onChangeData('experience')(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <p className='bg-reg-text'>Предлагаемая заработная плата</p>
                        <div className='group-input'>
                            <input
                                className='col-4 select-mini-input'
                                type='text'
                                value={salary}
                                onChange={(e) => onChangeData('salary')(e.target.value)}
                            />
                            <div className='select-mini-input-s'>
                                <Select onItemClickCallback={el => onChangeData('salary_type')(el.id)}>
                                    {Object.entries(SalaryTypes).map(([id, name]) => ({ id, name }))}
                                </Select>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
