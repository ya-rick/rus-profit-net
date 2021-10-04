import { useEffect, useRef } from 'react';
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import './header.css';

import Logo from '../../images/logo_outcome_Artboard_6_1.png';
import FullLogo from '../../images/2021RusProfiNetFooterLogo.svg';
import HeaderButton from '../../common/components/HeaderButton';
import { PageContentWrapper } from '../../common/components/Layouts';
import { ModalVariants } from '../../common/consts';
import Icon from '../../common/components/Icon';

const Header = inject('uiStore')(observer(({
    uiStore: { openModal, userModel: { isUserAuthenticated, user, userLogout  } }
}) => {
    const headerRef = useRef(null);
    const history = useHistory();

    const { pathname } = useLocation();

    useEffect(() => {
        if (!['/searchWorker', '/searchWork'].includes(pathname)) {
            setTimeout(() => {
                headerRef.current.scrollIntoView();
            }, 1)
        }
    }, [pathname]);

    function isRoot() {
        return pathname === '/'
    }

    return (
        <div className='header'>
            <HeaderContainer ref={headerRef}>
                <img
                    className='logo'
                    onClick={() => history.push('/')}
                    src={isRoot() ? FullLogo : Logo}
                    alt='logo'
                />
                
                <div className='button-group'>
                    {isUserAuthenticated ? <>
                        <HeaderButton to={'/profile/userInfo'}>
                            <Icon
                                iconName={'man'}
                            />
                            {user.name}
                        </HeaderButton>
                        <HeaderButton
                            onClick={userLogout}
                            to={''}
                        >
                            <Icon
                                iconName={'logout'}
                            />
                            Выйти
                        </HeaderButton>
                    </>
                    :<>
                        <HeaderButton
                            onClick={() => openModal(ModalVariants.Authorization)}
                            to={''}
                        >
                            <Icon
                                iconName={'logout'}
                            />
                            Авторизация
                        </HeaderButton>
                        <HeaderButton
                            to={'/register'}
                        >
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

export default Header;

const HeaderContainer = styled(PageContentWrapper)`
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
