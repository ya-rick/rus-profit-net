import { inject, observer } from 'mobx-react';
import { Redirect, useParams } from 'react-router';
import styled from 'styled-components';

import { PageContentWrapper } from '../../common/components/Layouts';
import PageTitle from '../../common/components/PageTitle';
import GeneralInformation from '../generalInformation';
import NameContact from '../nameContact/nameContact';
import SideBar from './SideBar';


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

function UserProfile({ uiStore }) {

    const { page } = useParams();

    function renderPage() {
        switch(page) {
            case 'userInfo': return <>
                <ContentTitle>Личная информация</ContentTitle>

                <NameContact/>

                <GeneralInformation/>
            </>

            case 'myVacancies': return <div>Temporary empty vacancies</div>

            case 'myResumes': return <div>Temporary empty resumes</div>

            default: return null;
        }
    }

    return <PageContentWrapper>

        <PageTitle>Личный кабинет</PageTitle>

        <ProfileContentLayout>
            
            <SideBar>
                {tabs}
            </SideBar>

            <ContentContainer>
                {renderPage()}
            </ContentContainer>
            
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

const ContentTitle = styled.h2`
    font-weight: 600;
`;
