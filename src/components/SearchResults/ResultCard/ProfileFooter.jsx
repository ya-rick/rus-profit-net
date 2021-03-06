import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { forDevice } from '../../../common/commonAdaptiveStyles';
import { useImperativeBreakPoint } from '../../../common/hooks';

import { SecondaryButton } from '../../../common/components/Buttons';
import Icon from '../../../common/components/Icon';


export default observer(function ProfileFooter({
    resultID, count_favorites, count_views, disabled, editClicked,
    onFavouritesClickCallback, onViewsClickCallback
}) {

    const history = useHistory();
    const { currentBreakPoint } = useImperativeBreakPoint();
    const isNotMobile = currentBreakPoint !== 'S';

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
    return (
        <ProfileFooterLayout>

            <SecondaryButton onClick={onEditClicked}>
                Редактировать
            </SecondaryButton>

            <ButtonWrapper
                onClick={bindRedirect(`/profile/favourites/${resultID}`, onFavouritesClickCallback)}
            >
                <Icon
                    iconName={'heart'}
                    text={count_favorites}
                />
                {isNotMobile && 'Моё избранное'}
            </ButtonWrapper>

            <ButtonWrapper
                onClick={bindRedirect(`/profile/views/${resultID}`, onViewsClickCallback)}
            >
                <Icon
                    iconName={'views'}
                />

                {isNotMobile && 'Просмотры '}{count_views > 0 && `(+${count_views})`}
            </ButtonWrapper>

        </ProfileFooterLayout>
    );
})

export const ProfileFooterLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 2rem;

    ${forDevice.M(css`
        gap: 1rem;
    `)}
`;

const ButtonWrapper = styled.button`
    display: flex;
    align-items: center;
    column-gap: .5rem;
`;
