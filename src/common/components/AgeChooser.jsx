import React, { useEffect, useState } from 'react'

import MultiRangeSlider from '../../components/multiRangeSlider'
import { clamp } from '../utils'
import { Centerer } from './Layouts'
import NumberInput from './NumberInput'

export default function AgeChooser({ min, max, currentMinValue,
    currentMaxValue, onChangeAge }) {

    const [fromTo, setFromTo] = useState([min || 0,  max || min || 0])

    function onChangeMinMax(value) {
        let [newFrom, newTo] = value;

        console.log(value)

        newFrom = clamp(0, newFrom, newTo)
        newTo = clamp(newFrom, newTo, max)

        onChangeAge([newFrom, newTo]);
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
        
    return <div>
        <p className='bg-long-text'>Возраст</p>
        <div>
            <MultiRangeSlider
                min={min}
                max={max}
                minAge={currentMinValue}
                maxAge={currentMaxValue}
                onChange={onChangeMinMax}
            />
            <div className='text-slider'>
                <p>до 18 лет</p>
                <p>60+ лет</p>
            </div>
        </div>
        <Centerer>
            <div className='box-inputs-labels'>
                <p className='labels sml-text'>от</p>
                <NumberInput
                    className='input-number'
                    value={currentMinValue}
                    max={max}
                    defaultValue={min}
                    onChange={onChangeInput(0)}
                />
            </div>
            <div className='box-inputs-labels'>
                <p className='labels sml-text'>до</p>
                <NumberInput
                    className='input-number'
                    value={currentMaxValue}
                    max={max}
                    defaultValue={max}
                    onChange={onChangeInput(1)}
                />
            </div>
        </Centerer>
    </div>
}