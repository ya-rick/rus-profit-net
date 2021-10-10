import { observer } from 'mobx-react';
import styled from 'styled-components';

import { CommonButton } from '../Buttons';
import Icon from '../Icon';


export default observer(function ProfileHeaderOptions({
    onTrashClickCallback, status, onButtonClickCallback, disabled
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
            case 'shown': return <CommonButton onClick={bindOnButtonClick('stopped')}>Убрать из поиска</CommonButton>;
            case 'stopped': return <CommonButton onClick={bindOnButtonClick('shown')}>Активировать вакансию</CommonButton>;
            default: return 'Ожидает подтверждения модератором';
        }
    }

    return <ProfileHeaderOptionsLayout>

        {renderByStatus()}

        <Icon
            iconName={'trash'}
            onClick={onTrashClick}
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
