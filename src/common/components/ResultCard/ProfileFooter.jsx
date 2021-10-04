import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { LinkedButton } from '../Buttons';
import Icon from '../Icon';


export default observer(function ProfileFooter({
    resultID, favouritesCount = 0, viewsCount = 0, disabled
}) {
    return <ProfileFooterLayout>

        <LinkedButton to={`edit/${resultID}`}>
            Редактировать
        </LinkedButton>

        <ButtonLinkedWrapper to={`favourites/${resultID}`}>
            <Icon
                iconName={'heart'}
                text={favouritesCount}
            />

            Моё избранное
        </ButtonLinkedWrapper>

        <ButtonLinkedWrapper to={`views/${resultID}`}>
            <Icon
                iconName={'views'}
            />

            Просмотры (+{viewsCount})
        </ButtonLinkedWrapper>

    </ProfileFooterLayout>
})

export const ProfileFooterLayout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 40px;
`;

const ButtonLinkedWrapper = styled(Link)`
    display: flex;
    align-items: center;
    column-gap: 30px;

    cursor: pointer;
    text-decoration: none;
`;
