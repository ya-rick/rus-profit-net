import { observer } from 'mobx-react';
import { useState } from 'react';
import styled from 'styled-components';

import Input from '../../common/components/Input';
import CheckBox from '../checkbox';


// For comfotrable layouts purpose
export default observer(UserContactFields);

function UserContactFields({ onChangeField, contactFields = [], showMoreButton = true }) {
    const [isAllVisible, setIsAllVisible] = useState(!showMoreButton);

    function togglePrefered(contact) {
        return newVal => onChangeField('contacts_info')({...contact, prefered: newVal})
    }

    return <>
        {(isAllVisible ? contactFields : contactFields.slice(0, 3)).map(contact => <ContactBlockLayout>
            <CheckBox
                isChecked={contact.prefered}
                check={togglePrefered(contact)}
            />
            <p>{contact.name}</p>
            <Input
                value={contact.value}
                onChange={e => onChangeField('contacts_info')({...contact, value: e.target.value})}
            />
        </ContactBlockLayout>)}
        {!isAllVisible && <ShowMoreButton onClick={() => setIsAllVisible(true)}>Посмотреть все</ShowMoreButton>}
    </>
}

const ContactBlockLayout = styled.div`
    display: grid;
    grid-template-columns: 40px auto 300px;
    align-items: center;
    column-gap: 30px;

    > :last-child {
        justify-self: end;
    }
`;

const ShowMoreButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    background-color: #F7FBFC;
    border-radius: 15px;

    cursor: pointer;
`;
