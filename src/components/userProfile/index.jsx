import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

import { PageContentWrapper } from '../../common/components/Layouts';
import PageTitle from '../../common/components/PageTitle';
import SideBar from './SideBar';
import UserInfoPage from './UserInfoPage';
import { UserProfileResults } from '../SearchResults';


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
        name: 'Мои резюме'
    },
    {
        to: '/profile/vacancyFavourites',
        name: 'Отобранные вакансии'
    },
    {
        to: '/profile/resumeFavourites',
        name: 'Отобранные резюме'
    }
]

const PageWithSearch = inject('uiStore')(observer(({ uiStore: { userModel: { getTabResults, clearTabResults } }, searchParam }) => {

    useEffect(() => {

        getTabResults(searchParam);

        return () => clearTabResults();
    }, [])

    return <UserProfileResults/>

}))

function UserProfile({ uiStore: { userModel: { editInfo } } }) {

    const { page } = useParams();

    function renderTab() {
        switch(page) {
            case 'userInfo': return <UserInfoPage/>

            case 'vacancyFavourites': return <PageWithSearch searchParam={page}/>

            case 'resumeFavourites': return <PageWithSearch searchParam={page}/>

            case 'userResume': return <PageWithSearch searchParam={page}/>

            case 'userVacancy': return <PageWithSearch searchParam={page}/>

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
    grid-template-rows: min-content;
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
