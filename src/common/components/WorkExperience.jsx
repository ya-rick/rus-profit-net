import React from 'react'
import styled from 'styled-components'

import RangeSlider from './rangeSlider'
import NumberInput from './NumberInput'

export default function WorkExperience({ min, max, value, onChange }) {

    return <div>
        <p className='bg-long-text'>Опыт работы</p>
        <div>
            <RangeSlider
                min={min}
                max={max}
                value={value}
                onChange={onChange}
            />
            <div className='text-slider'>
                <p>без опыта</p>
                <p>более 10 лет</p>
            </div>
        </div>
        <NumberInputCenterer>
            <NumberInputStyled
                value={value}
                max={max}
                onChange={onChange}
            />
        </NumberInputCenterer>
    </div>
}

const NumberInputCenterer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NumberInputStyled = styled(NumberInput)`
    width: 70px;
    text-align: center;
`;
