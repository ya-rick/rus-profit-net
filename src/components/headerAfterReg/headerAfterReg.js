import React from "react";
import Logo from '../../images/logo_outcome_Artboard_6_1.png';
import Login from '../../images/icon-avatar.svg';
import Register from '../../images/exit.svg';
import {useHistory} from 'react-router-dom';
import './headerAfterReg.css';
import HeaderButton from "../../common/components/HeaderButton";

const HeaderAfterReg = ({onGetId}) => {

    const history = useHistory();

    const getFirstId = () => {
        onGetId(0);
    }

    return (
        <div className='header'>
            <div className='container'>
                <div className='header-container'>
                    <img className='logo' onClick={() => history.push('/')} src={Logo} alt='logo'/>
                    <div className='button-group'>
                        <HeaderButton onClick={()=>history.push()}>
                            <img className='button-icon-after' src={Login} alt='login-icon'/>
                            Екатерина
                        </HeaderButton>
                        <HeaderButton onClick={()=>history.push('/register')}>
                            <img className='button-icon-after' src={Register} alt='register-icon'/>
                            Выйти
                        </HeaderButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderAfterReg;