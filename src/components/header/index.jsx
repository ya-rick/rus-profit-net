import { useEffect, useRef } from 'react';
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Logo from '../../images/logo_outcome_Artboard_6_1.png';
import FullLogo from '../../images/2021RusProfiNetFooterLogo.svg';

import { MainContainer } from '../../common/components/Layouts';
import { ModalVariants } from '../../common/consts';
import Icon from '../../common/components/Icon';
import Notifications from './notifications';
import HeaderButton from './headerButton';
import { breakPoints, useImperativeBreakPoint } from '../../common/hooks';


const Header = inject('uiStore', 'searchStore')(observer(({
    uiStore: { openModal, userModel: { isUserAuthenticated, user, userLogout  } },
    searchStore: { mainFiltersStore: { clearState } }
}) => {
    const headerRef = useRef(null);
    const history = useHistory();
    const { isCurrentMoreOrEqualThan } = useImperativeBreakPoint();
    const { pathname } = useLocation();
    
    const isFullSized = isCurrentMoreOrEqualThan(breakPoints.M);
    const isRoot = pathname === '/';


    useEffect(() => {
        if (!['/searchWorker', '/searchWork'].includes(pathname)) {
            setTimeout(() => {
                // headerRef.current.scrollIntoView();
            }, 1)
        }
    }, [pathname]);

    function bindRedirect(route) {
        return () => history.push(route);
    }

    function bindHeaderClick() {
        return () => {
            bindRedirect('/')();
            clearState();
        }
    }

    return (
        <HeaderLayout>
            <HeaderContainer ref={headerRef}>
                <HeaderImage
                    onClick={bindHeaderClick()}
                    src={!isFullSized || !isRoot ? Logo : FullLogo}
                    alt='logo'
                />
                
                <ButtonWrapper>
                    {isUserAuthenticated ? <>
                        <Notifications/>

                        <HeaderButton
                            isCropped={!isFullSized}
                            onClick={bindRedirect('/profile/userInfo')}
                            icon={<Icon iconName={'man'}/>}
                            text={user.user_name}
                        />
                        <HeaderButton
                            isCropped={!isFullSized}
                            onClick={userLogout}
                            icon={<Icon iconName={'logout'}/>}
                            text={'Выйти'}
                        />
                    </>
                    :<>
                        <HeaderButton
                            isCropped={!isFullSized}
                            onClick={() => openModal(ModalVariants.Authorization)}
                            icon={<Icon iconName={'logout'}/>}
                            text={'Авторизация'}
                        />
                        <HeaderButton
                            isCropped={!isFullSized}
                            onClick={() => history.push('/register')}
                            icon={<Icon iconName={'people'}/>}
                            text={'Регистрация'}
                        />
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

const HeaderContainer = styled(MainContainer)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 2rem;
`;

const HeaderImage = styled.img`
    height: 43px;
`;
