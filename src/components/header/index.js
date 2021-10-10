import { useEffect, useRef } from 'react';
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Logo from '../../images/logo_outcome_Artboard_6_1.png';
import FullLogo from '../../images/2021RusProfiNetFooterLogo.svg';

import { SecondaryButton } from '../../common/components/Buttons';
import { PageContentWrapper } from '../../common/components/Layouts';
import { ModalVariants } from '../../common/consts';
import Icon from '../../common/components/Icon';
import Notifications from './notifications';


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
    
    function bindRedirect(route) {
        return () => history.push(route);
    }

    return (
        <HeaderLayout>
            <HeaderContainer ref={headerRef}>
                <HeaderImage
                    onClick={bindRedirect('/')}
                    src={isRoot() ? FullLogo : Logo}
                    alt='logo'
                />
                
                <ButtonWrapper>
                    {isUserAuthenticated ? <>
                        <Notifications/>

                        <SecondaryButton onClick={bindRedirect('/profile/userInfo')}>
                            <Icon
                                iconName={'man'}
                            />
                            {user.name}
                        </SecondaryButton>
                        <SecondaryButton
                            onClick={userLogout}
                        >
                            <Icon
                                iconName={'logout'}
                            />
                            Выйти
                        </SecondaryButton>
                    </>
                    :<>
                        <SecondaryButton onClick={() => openModal(ModalVariants.Authorization)}>
                            <Icon
                                iconName={'logout'}
                            />
                            Авторизация
                        </SecondaryButton>
                        <SecondaryButton onClick={() => history.push('/register')}>
                            <Icon
                                iconName={'people'}
                            />
                            Регистрация
                        </SecondaryButton>
                    </>}
                </ButtonWrapper>
            </HeaderContainer>
        </HeaderLayout>
    );
}));

export default Header;

const HeaderLayout = styled.div`
    background-color: #B9C3D8;
`;

const HeaderContainer = styled(PageContentWrapper)`
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 40px;
`;

const HeaderImage = styled.img`
    height: 43px;
`;
