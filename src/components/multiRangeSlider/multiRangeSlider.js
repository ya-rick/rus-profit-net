import React from "react";
import './multiRangeSlider.css';
import ReactSlider from "react-slider";

const MultiRangeSlider = ( { min, max, minAge, maxAge, onChange } ) =>{

    return (
        <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
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
    );
};



export default MultiRangeSlider;