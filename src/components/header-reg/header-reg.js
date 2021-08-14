import React from 'react';
import './header-reg.css';
import Logo from "../../images/logo_outcome_Artboard_6_1.png";
import {useHistory} from "react-router-dom";

const HeaderRegister = ()=>{
    const history = useHistory();
    return(
        <div className='header-reg'>
            <div className='container'>
                <div className='header-container'>
                    <img className='logo' onClick={() => history.push('/')} src={Logo} alt='logo'/>
                </div>
            </div>
        </div>
    )
}

export default HeaderRegister;