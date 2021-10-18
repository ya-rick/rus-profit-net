import React from 'react'

import Select from './select'
import { SalaryTypes } from '../consts'
import CurrencyInput from './CurrencyInput'

export default function SuggestSalary({ salary, currencyID, salaryTypeID, onSelectChanged, onSalaryChanged, onCurrencyChanged }) {

    return <div className='main-filter-search-subBlock'>
        <p className='bg-long-text'>Предлагаемая заработная плата</p>
        <div className='group-input'>
            <Select
                onItemClickCallback={obj => onSelectChanged(obj.id)}
                leftHeaderItem={
                    <CurrencyInput
                        onChangeValue={onSalaryChanged}
                        onChangeCurrency={onCurrencyChanged}
                        noHeaderBorders
                        salary={salary}
                        currencyID={currencyID}
                    />
                }
                current={salaryTypeID}
            >
                {Object.entries(SalaryTypes).map(([id, name]) => ({ id, name }))}
            </Select>
        </div>
    </div>
}