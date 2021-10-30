import { observer } from 'mobx-react';
import styled from 'styled-components';

import { SecondaryButton } from '../Buttons';
import Icon from '../Icon';


export default observer(function ProfileHeaderOptions({
    onTrashClickCallback, status, onButtonClickCallback, disabled, isResume
}) {

    function onTrashClick(e) {
        e.stopPropagation();

        if (disabled) return;

        onTrashClickCallback();
    }

    function bindOnButtonClick(newStatus) {
        return e => {
            e.stopPropagation();

            onButtonClickCallback(newStatus);
        }
    }

    function renderByStatus() {
        switch(status) {
            case 'shown': return <SecondaryButton onClick={bindOnButtonClick('stopped')}>Убрать из поиска</SecondaryButton>;
            case 'stopped': return <SecondaryButton onClick={bindOnButtonClick('shown')}>Активировать {isResume ? 'анкету' : 'вакансию'}</SecondaryButton>;
            default: return <PendingBar>Ожидает подтверждения модератором</PendingBar>;
        }
    }

    return <ProfileHeaderOptionsLayout>

        {renderByStatus()}

        <Icon
            iconName={'trash'}
            onClick={onTrashClick}
            disabled={disabled}
        />

    </ProfileHeaderOptionsLayout>
})

export const ProfileHeaderOptionsLayout = styled.div`
    display: flex;
    align-items: center;
    column-gap: 40px;

    margin-left: auto;
    margin-right: 0;
`;

export const PendingBar = styled.div`
    border-radius: 20px;
    background-color: rgb(111, 128, 165, 0.2);
    padding: 20px 30px;
    font-size: .8em;
`;
