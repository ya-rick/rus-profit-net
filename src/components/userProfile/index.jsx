import { inject, observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { PageContentWrapper } from '../../common/components/Layouts';
import PageTitle from '../../common/components/PageTitle';
import SideBar from './SideBar';
import UserInfoPage from './UserInfoPage';
import { UserProfileResults } from '../SearchResults';
import PasswordChangePage from './PasswordChangePage';
import EmailChangePage from './EmailChangePage';


export default inject('uiStore')(observer(UserProfile));

const tabs = [
    {
        to: '/profile/userInfo',
        name: 'Личная информация'
    },
    {
        to: '/profile/userVacancy',
        name: 'Мои вакансии'
    },
    {
        to: '/profile/userResume',
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

function UserProfile() {

    const { page } = useParams();

    function renderTab() {
        switch(page) {
            case 'userInfo': return <UserInfoPage/>

            case 'userResume': return <UserProfileResults searchParam={page}/>

            case 'userVacancy': return <UserProfileResults searchParam={page}/>

            case 'security': return <PasswordChangePage/>

            case 'email': return <EmailChangePage/>

            default: return null;
        }
    }

    return <PageContentWrapper>

        <PageTitle>Личный кабинет</PageTitle>

        <ProfileContentLayout>
            
            <SideBar>
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
    border: 2px solid #6F80A5;
    padding: 20px;
    border-radius: 15px;
`;

export const ContentTitle = styled.h2`
    font-weight: 600;
`;
