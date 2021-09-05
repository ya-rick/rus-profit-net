import React from 'react';
import './rangeSlider.css';
import ReactSlider from "react-slider";

const RangeSlider = ({min, max, value, onChange}) =>{
    return(
        <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            min={min} max={max}
            value={value}
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            onChange={(value, index)=>onChange(value)}
        />
    );
};

export default RangeSlider;