import React from 'react'

import Select from './select'
import { SalaryTypes } from '../consts'
import CurrencyInput from './CurrencyInput'
import styled from 'styled-components'

export default function SuggestSalary({ salary, currencyID, salaryTypeID, onSelectChanged, onSalaryChanged, onCurrencyChanged, isResume }) {

    return <div className='main-filter-search-subBlock'>
        <p>{isResume ? 'Желаемая' : 'Предлагаемая'} заработная плата</p>
        <Layout>
            <CurrencyInput
                onChangeValue={onSalaryChanged}
                onChangeCurrency={onCurrencyChanged}
                noHeaderBorders
                salary={salary}
                currencyID={currencyID}
            />
            <Select
                onItemClickCallback={obj => onSelectChanged(obj.id)}
                current={salaryTypeID}
            >
                {Object.entries(SalaryTypes).map(([id, name]) => ({ id, name }))}
            </Select>
        </Layout>
    </div>
}

const Layout = styled.div`
    display: grid;
    grid-template-columns: 1fr minmax(100px, min-content);
    column-gap: 20px;
`;
