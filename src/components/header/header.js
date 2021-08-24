import React, {useContext} from "react";
import Logo from '../../images/2021RusProfiNetFooterLogo.svg';
import Login from '../../images/login-icon.svg';
import Register from '../../images/register-icon.svg';
import {useHistory} from 'react-router-dom';
import './header.css';
import { ModalVariants } from '../../common/consts';
import {ModalContext} from "../mainPage/contexts";
import HeaderButton from "../../common/components/HeaderButton";

const Header = ({onGetId}) => {

    const history = useHistory();

    const { openAuthModal } = useContext(ModalContext);

    return (
        <div className='header'>
            <div className='container'>
                <div className='header-container'>
                    <img className='logo' onClick={() => history.push('/')} src={Logo} alt='logo'/>
                    <div className='button-group'>
                        <HeaderButton onClick={openAuthModal}>
                            <img className='button-icon' src={Login} alt='login-icon'/>
                            Авторизация
                        </HeaderButton>
                        <HeaderButton onClick={()=>history.push('/register')}>
                            <img className='button-icon-people' src={Register} alt='register-icon'/>
                            Регистрация
                        </HeaderButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;