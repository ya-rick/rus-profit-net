import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { requestWithParams } from '../../api/exchangeLayer';
import Background from '../../common/components/Background';
import Icon from '../../common/components/Icon';
import Loading from '../../common/components/Loading';
import OutsideClickWrapper from '../../common/components/OutsideClickWrapper';
import { useRequest, useToggle } from '../../common/hooks';


export default function Notifications() {
    const history = useHistory();

    const [isOpen, toggleIsOpen] = useToggle(false);
    const [isRead, setIsRead] = useState(false);

    const { result, isLoading, error } = useRequest({ requestType: 'getNotifications' });

    const notifsPresent = !isLoading &&
        result.notifications?.some(notification => !notification.viewed);

    useEffect(() => {
        if (isOpen && !isLoading) {
            if (result.notifications?.some(notification => !notification.viewed)) {
                requestWithParams('readNotifications')
                    .catch(e => console.error(e));
            }
        }
    }, [notifsPresent, isLoading, isOpen, result]);

    function notificationBellClicked() {
        setIsRead(true);
        toggleIsOpen();
    }

    function renderNotification({ type, text, id, notif_id }) {
        switch(type) {
            case 'email': return <NotificatonItem key={notif_id}>
                <Icon iconName={'email_notification'}/>
                {text}
            </NotificatonItem>
    
            case 'view': return <NotificatonItem
                key={notif_id}
                onClick={() => history.push(`/profile/views/${id}`)}
            >
                <Icon iconName={'view_notification'}/>
                {text}
            </NotificatonItem>
    
            default: return <NotificatonItem
                key={notif_id}
                onClick={() => history.push(`/searchResults/${id}`)}
            >
                <Icon iconName={'work_notification'}/>
                {text}
            </NotificatonItem>
        }
    }

    return <Wrapper>
        {isLoading ? <Loading/>
            : error ? '????????????'
                : <>
                    <NotificationButtonWrapper
                        notifsPresent={notifsPresent && !isRead}
                        onClick={notificationBellClicked}
                    >
                        <Icon
                            iconName={`notifications_${notifsPresent && !isRead ? 'enabled' : 'disabled'}`}
                        />
                    </NotificationButtonWrapper>

                    {isOpen && notifsPresent && <OutsideClickWrapper onOutsideClickHandler={() => toggleIsOpen(false)}>
                        {ref => <>
                            <NotificationsBackground onClick={() => toggleIsOpen(false)}/>

                            <NotificationsItemsWrapper ref={ref}>
                                <ScrollWrapper>
                                    {result.notifications.map(notification => renderNotification(notification))}
                                </ScrollWrapper>
                            </NotificationsItemsWrapper>
                        </>}
                    </OutsideClickWrapper>}
                </>}
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

const NotificationsBackground = styled(Background)`
    top: 80px;
`;

const NotificationsItemsWrapper = styled.div`
    position: absolute;
    top: 55px;
    right: 0;
    z-index: 20;

    border-radius: 20px;
    background-color: #F7FBFC;
    border: 2px solid #6F80A5;
    width: max-content;
    padding: .5rem;

    @media (max-width: 1000px) {
        right: 50%;
        transform: translateX(50%);
        max-width: 600px;
        width: 100vw;
    }
`;

const ScrollWrapper = styled.div`
    overflow-y: scroll;
    margin-right: 20px;
    padding: 0.5rem;
    max-height: 200px;
    
    > * {
        margin-top: 30px;

        :first-child {
            margin-top: 0;
        }
    }
`;

const NotificatonItem = styled.div`
    display: flex;
    align-items: center;
    column-gap: 40px;

    cursor: pointer;
`;
