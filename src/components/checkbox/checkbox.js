import React from "react";
import Check from '../../images/check.svg'
import './checkbox.css';

const CheckBox = ({isChecked, check, children}) =>{
    return(
        <div className='checkbox' onClick={()=>check && check(!isChecked)}>
            <div className='check'>
                {isChecked? <img src={Check} alt=''/>: <></> }
            </div>
            {children && <div>
                {children}
            </div>}
        </div>
    );
};

export default CheckBox;