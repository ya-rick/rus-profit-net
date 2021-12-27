import React from 'react'
import styled from 'styled-components'

import { RangeSlider } from './rangeSlider'
import NumberInput from './NumberInput'
import { AdditionalText, RegularTitle } from './Typography'
import { FlexSpaceBetweenContainer } from './Layouts'

export default function WorkExperience({ min, max, value, onChange, disabledInput = true, ...props }) {

    return <Wrapper {...props}>
        <RegularTitle>Опыт работы</RegularTitle>
        <div>
            <RangeSlider
                max={max}
                value={value}
                onChange={onChange}
            />
            <FlexSpaceBetweenContainer>
                <AdditionalText>без опыта</AdditionalText>
                <AdditionalText>более 10 лет</AdditionalText>
            </FlexSpaceBetweenContainer>
        </div>
        <NumberInputCenterer>
            <NumberInputStyled
                value={value}
                max={max}
                onChange={disabledInput ? () => {} : onChange}
                disabled={disabledInput}
            />
        </NumberInputCenterer>
    </Wrapper>
}

const Wrapper = styled.div`
    min-width: 200px;
`;

const NumberInputCenterer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NumberInputStyled = styled(NumberInput)`
    width: 70px;
    text-align: center;
`;
