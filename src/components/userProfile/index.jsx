import { inject, observer } from 'mobx-react';
import { useParams, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { DefaultContainer, MainContainer } from '../../common/components/Layouts';
import { MainTitle } from '../../common/components/Typography';
import SideBar from './SideBar';
import UserInfoPage from './UserInfoPage';
import { Favourites, UserProfileResults, Views } from '../SearchResults';
import PasswordChangePage from './PasswordChangePage';
import EmailChangePage from './EmailChangePage';
import CreateEditSearch from '../createEditSearch';


export default inject('uiStore')(observer(UserProfile));

const tabs = [
    {
        to: '/profile/userInfo',
        name: 'Личная информация'
    },
    {
        to: '/profile/userVacancy',
        onClickType: 'vacancy',
        name: 'Мои вакансии'
    },
    {
        to: '/profile/userResume',
        onClickType: 'resume',
        name: 'Мои анкеты'
    },
    {
        to: '/profile/security',
        name: 'Смена пароля'
    },
    {
        to: '/profile/email',
        name: 'Смена почты'
    }
]

function UserProfile({ uiStore: { userModel: { setTabResults } } }) {

    const { page } = useParams();

    function renderTab() {
        switch(page) {
            case 'userInfo': return <UserInfoPage/>

            case 'userResume': return <UserProfileResults searchParam={page}/>

            case 'userVacancy': return <UserProfileResults searchParam={page}/>

            case 'security': return <PasswordChangePage/>

            case 'email': return <EmailChangePage/>

            case 'favourites': return <Favourites searchParam={page}/>

            case 'views': return <Views searchParam={page}/>

            case 'create': return <CreateEditSearch/>
            
            case 'update': return <CreateEditSearch/>

            default: return <Redirect to={'/404'}/>;
        }
    }

    return (
        <ProfileMainContainer>

            <DefaultContainer>
                <MainTitle>Личный кабинет</MainTitle>

                <SideBar
                    onTablClickCallback={setTabResults}
                >
                    {tabs}
                </SideBar>
            </DefaultContainer>

            <ProfileContentLayout>
                {renderTab() && <ContentContainer>
                    {renderTab()}
                </ContentContainer>}
                
            </ProfileContentLayout>

        </ProfileMainContainer>
    );
}

const ProfileMainContainer = styled(MainContainer)`
    margin-block-end: 20px;
`;

const ProfileContentLayout = styled.div``;

const ContentContainer = styled.div`
    padding: 3% 5%;

    box-shadow: 0 0 10px rgb(0, 0, 0, 0.5);

    ${props => props.theme.smallBorderRadius}
`;
