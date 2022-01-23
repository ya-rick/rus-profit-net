import { observer } from 'mobx-react';
import React from 'react';

import Icon from '../Icon';
import styled from 'styled-components';


const CheckBox = observer(({ isChecked, check, children, ...rest }) =>{
    return(
        <CheckBoxContainer
            onClick={()=>check && check(!isChecked)}
            {...rest}
        >
            <CheckedIconContainer>
                {isChecked? <Icon iconName={'check'}/> : <Icon/> }
            </CheckedIconContainer>
            {children}
        </CheckBoxContainer>
    );
});

export default CheckBox;

const CheckBoxContainer = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
`;

const CheckedIconContainer = styled.button`
    height: 2rem;
    width: 2rem;
    border: .2rem solid #6F80A5;
    box-sizing: border-box;
    border-radius: .5rem;
    margin-right: .75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FFFFFF;
    flex-shrink: 0;
`;
