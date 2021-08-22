import { useContext } from "react";
import Logo from '../../images/logo_outcome_Artboard_6_1.png';
import Login from '../../images/login-icon.svg';
import Register from '../../images/register-icon.svg';
import {useHistory} from 'react-router-dom';
import './header2.css';
import { ModalContext } from "../mainPage/mainPage";

const HeaderNew = () => {

    const { openAuthModal } = useContext(ModalContext);

    const history = useHistory();

    return (
        <div className='header'>
            <div className='container'>
                <div className='header-container'>
                    <img className='logo' onClick={() => history.push('/')} src={Logo} alt='logo'/>
                    <div className='button-group'>
                        <button className='header-button' onClick={openAuthModal}>
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

export default HeaderNew;