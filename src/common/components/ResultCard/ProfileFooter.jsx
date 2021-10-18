import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { CommonButton } from '../Buttons';
import Icon from '../Icon';


export default observer(function ProfileFooter({
    resultID, count_favorites, count_views, disabled, editClicked, onFavouritesClickCallback, onViewsClickCallback
}) {

    const history = useHistory();

    function bindRedirect(link, callback) {
        return e => {
            e.stopPropagation();

            history.push(link);
            callback();
        }
    }

    function onEditClicked(e) {
        e.stopPropagation();

        if (disabled) return;

        editClicked && editClicked(resultID);

        history.push(`/profile/update`);
    }
    return <ProfileFooterLayout>

        <CommonButton onClick={onEditClicked}>
            Редактировать
        </CommonButton>

        <ButtonWrapper
            onClick={bindRedirect(`/profile/favourites/${resultID}`, onFavouritesClickCallback)}
        >
            <Icon
                iconName={'heart'}
                text={count_favorites}
            />

            Моё избранное
        </ButtonWrapper>

        <ButtonWrapper
            onClick={bindRedirect(`/profile/views/${resultID}`, onViewsClickCallback)}
        >
            <Icon
                iconName={'views'}
            />

            Просмотры {count_views > 0 && `(+${count_views})`}
        </ButtonWrapper>

    </ProfileFooterLayout>
})

export const ProfileFooterLayout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 40px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 30px;

    cursor: pointer;
    text-decoration: none;
`;
