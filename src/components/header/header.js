import React from "react";
import Logo from '../../images/2021RusProfiNetFooterLogo.svg';
import Login from '../../images/login-icon.svg';
import Register from '../../images/register-icon.svg';
import {useHistory} from 'react-router-dom';
import './header.css';

const Header = ({onGetId}) => {

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
                        <button className='header-button' onClick={getFirstId}>
                            <img className='button-icon' src={Login} alt='login-icon'/>
                            Авторизация
                        </button>
                        <button className='header-button' onClick={()=>history.push('/register')}>
                            <img className='button-icon-people' src={Register} alt='register-icon'/>
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;