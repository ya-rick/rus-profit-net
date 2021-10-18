import { observer } from 'mobx-react';
import React from 'react';

import './checkbox.css';

import Icon from '../../common/components/Icon';


const CheckBox = observer(({isChecked, check, children}) =>{
    return(
        <div className='checkbox' onClick={()=>check && check(!isChecked)}>
            <div className='check'>
                {isChecked? <Icon iconName={'check'}/> : <Icon/> }
            </div>
            {children && <div>
                {children}
            </div>}
        </div>
    );
});

export default CheckBox;