import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Logo from '../../images/logo_outcome_Artboard_6_1.png';
import FullLogo from '../../images/2021RusProfiNetFooterLogo.svg';
import Login from '../../images/login-icon.svg';
import Register from '../../images/register-icon.svg';
import './header.css';
import HeaderButton from "../../common/components/HeaderButton";
import { PageContentWrapper } from "../../common/components/Layouts";
import { ModalVariants } from '../../common/consts';
import Icon from '../../common/components/Icon';

const HeaderNew = inject('uiStore')(observer(({ uiStore: { openModal, isUserAuthenticated, user, userLogout } }) => {

    const history = useHistory();

    const { pathname } = useLocation();

    function isRoot() {
        return pathname === '/'
    }

    return (
        <div className='header'>
            <HeaderContainer>
                {isRoot() ? <img className='logo' onClick={() => history.push('/')} src={FullLogo} alt='logo'/>
                : <img className='logo' onClick={() => history.push('/')} src={Logo} alt='logo'/>}
                
                <div className='button-group'>
                    {isUserAuthenticated ? <>
                        <HeaderButton>
                            <Icon
                                iconName={'man'}
                            />
                            {user.name}
                        </HeaderButton>
                        <HeaderButton onClick={userLogout}>
                            <Icon
                                iconName={'logout'}
                            />
                            Выйти
                        </HeaderButton>
                    </>
                    :<>
                        <HeaderButton onClick={() => openModal(ModalVariants.Authorization)}>
                            <Icon
                                iconName={'logout'}
                            />
                            Авторизация
                        </HeaderButton>
                        <HeaderButton onClick={()=>history.push('/register')}>
                            <Icon
                                iconName={'people'}
                            />
                            Регистрация
                        </HeaderButton>
                    </>}
                </div>
            </HeaderContainer>
        </div>
    );
}));

export default HeaderNew;

const HeaderContainer = styled(PageContentWrapper)`
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
