import React from "react";
import Check from '../../images/check.svg'
import './checkbox.css';

const CheckBox = ({isChecked, check, children}) =>{
    return(
        <div className='checkbox' onClick={()=>check()}>
            <div className='check'>
                {isChecked? <img src={Check} alt=''/>: <></> }
            </div>
            {children}
        </div>
    );
};

export default CheckBox;