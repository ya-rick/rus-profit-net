import React from 'react';
import styled from 'styled-components';

import Select from './select';
import { SalaryTypes } from '../consts';
import CurrencyInput from './CurrencyInput';
import { RegularTitle } from './Typography';


export default function SuggestSalary({
    salary, currencyID, salaryTypeID, onSelectChanged, onSalaryChanged,
    onCurrencyChanged, isResume, ...rest
}) {

    return (
        <div {...rest}>
            <RegularTitle>{isResume ? 'Желаемая' : 'Предлагаемая'} заработная плата</RegularTitle>
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
    );
}

const Layout = styled.div`
    display: grid;
    grid-template-columns: 1fr max-content;
    column-gap: 1rem;
`;
