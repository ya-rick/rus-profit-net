import React, { useState } from 'react'

import { MultiRangeSlider } from './rangeSlider'
import { clamp } from '../utils'
import { Centerer, FlexSpaceBetweenContainer } from './Layouts'
import NumberInput from './NumberInput'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import { AdditionalText, RegularTitle } from './Typography'


export default observer(function AgeChooser({ min, max, currentMinValue,
    currentMaxValue, onChangeMin, onChangeMax, disabledInputs = true, ...props }) {

    const [fromTo, setFromTo] = useState([min || 0,  max || min || 0])

    function onChangeMinMax(value) {
        let [newFrom, newTo] = value;

        newFrom = clamp(min, newFrom, newTo)
        newTo = clamp(newFrom, newTo, max)

        onChangeMin(newFrom);
        onChangeMax(newTo);
    }

    function onChangeInput(which) {
        return (value) => {
            let newFromTo;

            if (which === 0) {
                newFromTo = [value, fromTo[1]];
                setFromTo(newFromTo)
            } else {
                newFromTo = [fromTo[0], value];
                setFromTo(newFromTo)
            }

            onChangeMinMax(newFromTo)
        }
        
    }
        
    return (
        <div {...props}>
            <RegularTitle>Возраст</RegularTitle>
            <div>
                <MultiRangeSlider
                    min={min}
                    max={max}
                    minAge={currentMinValue}
                    maxAge={currentMaxValue}
                    onChange={onChangeMinMax}
                />
                <FlexSpaceBetweenContainer>
                    <AdditionalText>18 лет</AdditionalText>
                    <AdditionalText>60+ лет</AdditionalText>
                </FlexSpaceBetweenContainer>
            </div>
            <InfoLayout>
                <InputBlockLayout>
                    <AdditionalText>от</AdditionalText>
                    <NumberInputStyled
                        value={currentMinValue}
                        max={max}
                        defaultValue={min}
                        disabled={disabledInputs}
                        onChange={disabledInputs ? () => {} : onChangeInput(0)}
                    />
                </InputBlockLayout>
                <InputBlockLayout>
                    <AdditionalText>до</AdditionalText>
                    <NumberInputStyled
                        value={currentMaxValue}
                        max={max}
                        defaultValue={max}
                        disabled={disabledInputs}
                        onChange={disabledInputs ? () => {} : onChangeInput(1)}
                    />
                </InputBlockLayout>
            </InfoLayout>
        </div>
    );
});

const NumberInputStyled = styled(NumberInput)`
    width: 70px;
    text-align: center;
`;

const InfoLayout = styled(FlexSpaceBetweenContainer)`
    justify-content: space-evenly;
`;

const InputBlockLayout = styled.div`
    display: flex;
    align-items: center;
    column-gap: .5rem;
`;
