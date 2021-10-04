import { observer } from 'mobx-react';
import styled from 'styled-components';

import { CommonButton } from '../Buttons';
import Icon from '../Icon';


export default observer(function ProfileHeaderOptions({
    onTrashClick = () => {}, status, onButtonClick = () => {}, disabled
}) {

    function renderByStatus(status) {
        switch(status) {
            case 'shown': return <CommonButton onClick={onButtonClick}>Убрать из поиска</CommonButton>;
            case 'stopped': return <CommonButton onClick={onButtonClick}>Активировать вакансию</CommonButton>;
            default: return 'Ожидает подтверждения модератором'
        }
    }

    return <ProfileHeaderOptionsLayout>

        {renderByStatus(status)}

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
