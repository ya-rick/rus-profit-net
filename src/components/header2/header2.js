import { useContext } from "react";
import styled from 'styled-components'
import {useHistory} from 'react-router-dom';

import Logo from '../../images/logo_outcome_Artboard_6_1.png';
import Login from '../../images/login-icon.svg';
import Register from '../../images/register-icon.svg';
import './header2.css';
import { ModalContext } from "../mainPage/contexts";
import HeaderButton from "../../common/components/HeaderButton";
import { PageContentWrapper } from "../../common/components/Layouts";

const HeaderNew = () => {

    const { openAuthModal } = useContext(ModalContext);

    const history = useHistory();

    return (
        <div className='header'>
            <HeaderContainer>
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
            </HeaderContainer>
        </div>
    );
};

export default HeaderNew;

const HeaderContainer = styled(PageContentWrapper)`
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
