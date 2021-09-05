import React from 'react'

import NumberInput from './NumberInput'
import CurrencySelect from './CurrencySelect'
import styled from 'styled-components'

export default function CurrencyInput({ onChangeCurrency, noHeaderBorders, onChangeValue, currencyValue, ...props }) {
    return <CurrencySelectWrapper>
        <StyledInput
            {...props}
            value={currencyValue}
            onChange={onChangeValue}
        />
        <CurrencySelectLayoutContainer>
            <CurrencySelect
                {...props}
                noHeaderBorders={noHeaderBorders}
                onChange={obj => onChangeCurrency(obj.id)}
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
