import styled, { css } from 'styled-components';

import Icon from '../../common/components/Icon';
import { useToggle } from '../../common/hooks';


export default function Notifications() {
    const [isOpen, toggleIsOpen] = useToggle(false);
    
    return <Wrapper>

        <NotificationButtonWrapper
            notifsPresent
            onClick={() => toggleIsOpen()}
        >
            <Icon
                iconName={'notifications_enabled'}
            />
        </NotificationButtonWrapper>

        {isOpen && <NotificationsItemsWrapper>

            <NotificatonItem>
                <Icon
                    iconName={'view_notification'}
                />
                Новый просмотр анкеты Няня
            </NotificatonItem>

            <NotificatonItem>
                <Icon
                    iconName={'work_notification'}
                />
                Модератор разместил вашу анкету Сиделка
            </NotificatonItem>

            <NotificatonItem>
                <Icon
                    iconName={'email_notification'}
                />
                Ваша почта успешно подтверждена
            </NotificatonItem>

        </NotificationsItemsWrapper>}
            
    </Wrapper>
}

const Wrapper = styled.div`
    position: relative;

    @media (max-width: 700px) {
        position: static;
    }
`;

const NotificationButtonWrapper = styled.div`
    position: relative;
    cursor: pointer;

    ${props => props.notifsPresent && css`
        ::after {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            width: 10px;
            height: 10px;
            background-color: #CC363B;
            border-radius: 50%;
        }
    `}
`;

const NotificationsItemsWrapper = styled.div`
    position: absolute;
    top: 55px;
    right: 0;
    z-index: 10;

    border-radius: 20px;
    background-color: #F7FBFC;
    border: 2px solid #6F80A5;
    width: max-content;
    padding: 25px;

    > * {
        margin-top: 30px;

        :first-child {
            margin-top: 0;
        }
    }

    @media (max-width: 1000px) {
        right: 50%;
        transform: translateX(50%);
        max-width: 600px;
        width: 100vw;
    }
`;

const NotificatonItem = styled.div`
    display: flex;
    align-items: center;
    column-gap: 40px;

    cursor: pointer;
`;
