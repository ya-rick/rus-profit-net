import { observer } from 'mobx-react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { CommonButton } from '../Buttons';
import Icon from '../Icon';


export default observer(function ProfileFooter({
    resultID, favouritesCount = 0, viewsCount = 0, disabled, editClicked, type
}) {

    const history = useHistory();

    function onEditClicked(e) {
        e.stopPropagation();

        if (disabled) return;

        editClicked && editClicked(resultID);

        // history.push(`/profile/update/${resultID}`);

    }
    return <ProfileFooterLayout>

        <CommonButton onClick={onEditClicked}>
            Редактировать
        </CommonButton>

        <ButtonLinkedWrapper
            to={`/profile/favourites/${type}/${resultID}`}
            onClick={e => e.stopPropagation()}
        >
            <Icon
                iconName={'heart'}
                text={favouritesCount}
            />

            Моё избранное
        </ButtonLinkedWrapper>

        <ButtonLinkedWrapper
            to={`views/${resultID}`}
            onClick={e => e.stopPropagation()}
        >
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
