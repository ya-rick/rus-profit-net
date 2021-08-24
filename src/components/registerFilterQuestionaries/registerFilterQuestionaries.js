import React, {Component} from "react";
import './registerFilterQuestionaries.css';
import RangeSlider from "../rangeSlider";
import Select from "../select";
import { SalaryTypes } from "../../common/consts";

export default class RegisterFilterQuestionaries extends Component {

    render() {
        const { onChangeData, data: { salary, experience } } = this.props;

        return (
            <div className='main-reg-filter'>
                <div className='filter container row center'>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <p className='bg-reg-text'>Опыт работы</p>
                        <div>
                            <RangeSlider min={0} max={10} value={experience}
                                         onChange={onChangeData('experience')}/>
                            <div className='text-slider'>
                                <p>без опыта</p>
                                <p>более 10 лет</p>
                            </div>
                        </div>
                        <div className='col-12 input-center'>
                            <input className='input-number'
                                   type='text'
                                   value={experience}
                                   onChange={e => onChangeData('experience')(Number(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <p className='bg-reg-text'>Желаемая заработная плата</p>
                        <div className='group-input'>
                            <input
                                className='col-4 select-mini-input'
                                type='text'
                                value={salary}
                                onChange={e => onChangeData('salary')(Number(e.target.value))}/>
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
