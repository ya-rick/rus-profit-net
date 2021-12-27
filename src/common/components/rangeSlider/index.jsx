import React from 'react';
import ReactSlider from 'react-slider';
import styled from 'styled-components';


export const RangeSlider = ({min, max, value, onChange}) =>{
    return (
        <SliderStyleWrapper>
            <ReactSlider
                min={min} max={max}
                value={value}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                onChange={(value, index) => onChange(value)}
                pearling
            />
        </SliderStyleWrapper>
    );
};

export const MultiRangeSlider = ( { min, max, minAge, maxAge, onChange } ) =>{

    return (
        <SliderStyleWrapper>
            <ReactSlider
                defaultValue={[min, max]}
                value={[minAge, maxAge]}
                onChange={(value, index) => onChange(value,index)}
                min={min}
                max={max}
                ariaLabel={['Lower thumb', 'Upper thumb']}
                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                pearling
                minDistance={1}
            />
        </SliderStyleWrapper>
    );
};

const SliderStyleWrapper = styled.div`
    height: 50px;

    .thumb {
        font-size: 0.9em;
        text-align: center;
        background: #F7FBFC;
        height: 40px;
        width: 40px;
        border-radius: 20px;
        border: 3px solid #153D70;
        box-sizing: border-box;
        box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.25);
        color: #F7FBFC;
        cursor: pointer;
    }

    .track {
        position: relative;
        background: #ddd;
        top: 20px;
        height: 3px;
        background: #6f80a5;
    }
`;
