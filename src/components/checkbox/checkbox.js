import React from "react";
import Check from '../../images/check.svg'
import './checkbox.css';

const CheckBox = ({isChecked, check, children}) =>{
    return(
        <div className='checkbox container' onClick={()=>check()}>
            <div className='check col-xs-6 col-md-6 col-lg-2'>
                {isChecked? <img src={Check} alt=''/>: <></> }
            </div>
            <div className='col-xs-6 col-md-6 col-lg-10'>
                {children}
            </div>
        </div>
    );
};

export default CheckBox;