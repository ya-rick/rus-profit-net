import { inject, observer } from 'mobx-react';
import { useParams, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { PageContentWrapper } from '../../common/components/Layouts';
import PageTitle from '../../common/components/PageTitle';
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

    return <PageContentWrapper>

        <PageTitle>Личный кабинет</PageTitle>

        <ProfileContentLayout>
            
            <SideBar
                onTablClickCallback={setTabResults}
            >
                {tabs}
            </SideBar>

            {renderTab() && <ContentContainer>
                {renderTab()}
            </ContentContainer>}
            
        </ProfileContentLayout>

    </PageContentWrapper>
}


const ProfileContentLayout = styled.div`
    display: grid;
    grid-template-columns: min-content auto;
    grid-template-rows: minmax(400px, 1fr);
    gap: 20px;

    grid-template-areas: ' sidebar content ';
`;

const ContentContainer = styled.div`
    grid-area: content;
    padding: 20px;
    border-radius: 15px;

    box-shadow: 0 0 10px rgb(0, 0, 0, 0.5);
`;

export const ContentTitle = styled.h2`
    display: flex;
    justify-content: space-between;
    font-weight: 600;
`;
