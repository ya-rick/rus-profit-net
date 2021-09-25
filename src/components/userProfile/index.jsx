import { inject, observer } from 'mobx-react';
import { useParams } from 'react-router';
import styled from 'styled-components';

import { PageContentWrapper } from '../../common/components/Layouts';
import PageTitle from '../../common/components/PageTitle';
import SideBar from './SideBar';
import UserInfoPage from './UserInfoPage';


const tabs = [
    {
        to: '/profile/userInfo',
        name: 'Личная информация'
    },
    {
        to: '/profile/myVacancies',
        name: 'Мои вакансии'
    },
    {
        to: '/profile/myResumes',
        name: 'Мои резюме'
    }
]

function UserProfile({ uiStore: { userModel: { editInfo } } }) {

    const { page } = useParams();

    function renderTab() {
        switch(page) {
            case 'userInfo': return <UserInfoPage/>

            case 'myVacancies': return <ContentTitle>Мои вакансии</ContentTitle>

            case 'myResumes': return <ContentTitle>Мои анкеты</ContentTitle>

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

export default inject('uiStore')(observer(UserProfile));

const ProfileContentLayout = styled.div`
    display: grid;
    grid-template-columns: min-content auto;
    grid-template-rows: min-content;
    gap: 20px;

    grid-template-areas: ' sidebar content ';

    @media (max-width: 900px) {
        grid-template-rows: repeat(2, min-content);
        grid-template-areas: 
            'sidebar sidebar'
            'content content'
        ;
    }
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
