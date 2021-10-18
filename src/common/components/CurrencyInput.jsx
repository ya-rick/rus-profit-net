import React from 'react'
import styled from 'styled-components'

import NumberInput from './NumberInput'
import CurrencySelect from './CurrencySelect'

export default function CurrencyInput({ onChangeCurrency, noHeaderBorders, onChangeValue, salary, currencyID, ...props }) {
    return <CurrencySelectWrapper>
        <StyledInput
            {...props}
            value={salary}
            onChange={onChangeValue}
        />
        <CurrencySelectLayoutContainer>
            <CurrencySelect
                noHeaderBorders={noHeaderBorders}
                onChange={obj => onChangeCurrency(obj.id)}
                currentCurrency={salary.currency}
                current={currencyID}
            />
        </CurrencySelectLayoutContainer>
    </CurrencySelectWrapper>
}

const CurrencySelectWrapper = styled.div`
    position: relative;
    display: flex;
    width: 140%;
`;

const StyledInput = styled(NumberInput)`
    padding-right: 50px;
`;

const CurrencySelectLayoutContainer = styled.div`
    position: absolute;
    right: 2px;
    top: 50%;
    transform: translateY(-50%);
`;
