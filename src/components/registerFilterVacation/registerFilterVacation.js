import React, {Component} from "react";

import './registerFilterVacation.css';
import WorkExperience from "../../common/components/WorkExperience";
import AgeChooser from "../../common/components/AgeChooser";
import { GapedAdaptiveCenterer } from "../../common/components/Layouts";
import SuggestSalary from "../../common/components/SuggestSalary";

export default class RegisterFilterVacation extends Component {

    min = 18;
    max = 60;

    render() {
        const { onChangeData, data: { name, years_with, years_to, experience, salary } } = this.props;

        return (
            <GapedAdaptiveCenterer>
                <div>
                    <p className='bg-reg-text'>Название вакансии*</p>
                    <input
                        className='input-reg'
                        type='text'
                        value={name}
                        onChange={e => onChangeData('name')(e.target.value)}
                    />
                </div>
                
                <AgeChooser
                    min={18}
                    max={60}
                    currentMinValue={years_with}
                    currentMaxValue={years_to}
                    onChangeAge={onChangeData('years')}
                />

                <WorkExperience
                    min={0}
                    max={10}
                    onChange={onChangeData('experience')}
                    value={experience}
                />
                
                <SuggestSalary
                    onSelectChanged={onChangeData('salary_type')}
                    onSalaryChanged={onChangeData('salary')}
                    onCurrencyChanged={onChangeData('currency')}
                    currencyValue={salary}
                />
            </GapedAdaptiveCenterer>
        )
    }
}
