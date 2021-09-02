import React from "react";
import Check from '../../images/check.svg'
import './checkbox.css';

const CheckBox = ({isChecked, check, children}) =>{
    return(
        <div className='checkbox' onClick={()=>check && check({ target: { value: !isChecked } })}>
            <div className='check'>
                {isChecked? <img src={Check} alt=''/>: <></> }
            </div>
            {children && <div className='col-xs-6 col-md-6 col-lg-10'>
                {children}
            </div>}
        </div>
    );
};

export default CheckBox;