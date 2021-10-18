import { observer } from 'mobx-react';
import styled from 'styled-components';

import Input from '../../common/components/Input';
import CheckBox from '../checkbox';


// For comfotrable layouts purpose
export default observer(UserContactFields);

function UserContactFields({ onChangeField, contactFields }) {

    function togglePrefered(contact) {
        return newVal => onChangeField('contacts_info')({...contact, prefered: newVal})
    }

    return <>
        {contactFields?.map(contact => <ContactBlockLayout>
            <CheckBox
                isChecked={contact.prefered}
                check={togglePrefered(contact)}
            />
            <p>{contact.name}</p>
            <Input
                value={contact.value}
                onChange={e => onChangeField('contacts_info')({...contact, value: e.target.value})}/>
        </ContactBlockLayout>)}
    </>
}

const ContactBlockLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    > input {
        margin-left: auto;
        margin-right: 0;
        width: 300px;
    }
`;
