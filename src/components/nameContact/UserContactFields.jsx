import { observer } from 'mobx-react';
import styled from 'styled-components';

import Input from '../../common/components/Input';
import CheckBox from '../checkbox';


// For comfotrable layouts purpose
export default observer(UserContactFields);

function UserContactFields({ onChangeField, contactFields }) {

    const {
        user_second_email_prefered, user_viber, user_skype,
        user_second_email, user_telegram_prefered, user_phone_prefered,
        user_phone, user_whatsapp_prefered, user_whatsapp, user_viber_prefered,
        user_telegram, user_skype_prefered
    } = contactFields;

    return <>
        <ContactBlockLayout>
            <CheckBox
                isChecked={user_second_email_prefered}
                check={onChangeField('user_second_email_prefered')}
            />
            <p>Email*</p>
            <Input
                value={user_second_email}
                onChange={e => onChangeField('user_second_email')(e.target.value)}/>
        </ContactBlockLayout>

        <ContactBlockLayout>
            <CheckBox
                isChecked={user_phone_prefered}
                check={onChangeField('user_phone_prefered')}
            />
            <p>Телефон*</p>
            <Input
                value={user_phone}
                onChange={e => onChangeField('user_phone')(e.target.value)}/>
        </ContactBlockLayout>

        <ContactBlockLayout>
            <CheckBox
                isChecked={user_whatsapp_prefered}
                check={onChangeField('user_whatsapp_prefered')}
            />
            <p>WhatsApp*</p>
            <Input
                value={user_whatsapp}
                onChange={e => onChangeField('user_whatsapp')(e.target.value)}/>
        </ContactBlockLayout>

        <ContactBlockLayout>
            <CheckBox
                isChecked={user_viber_prefered}
                check={onChangeField('user_viber_prefered')}
            />
            <p>Viber*</p>
            <Input
                value={user_viber}
                onChange={e => onChangeField('user_viber')(e.target.value)}/>
        </ContactBlockLayout>

        <ContactBlockLayout>
            <CheckBox
                isChecked={user_telegram_prefered}
                check={onChangeField('user_telegram_prefered')}
            />
            <p>Telegram*</p>
            <Input
                value={user_telegram}
                onChange={e => onChangeField('user_telegram')(e.target.value)}/>
        </ContactBlockLayout>

        <ContactBlockLayout>
            <CheckBox
                isChecked={user_skype_prefered}
                check={onChangeField('user_skype_prefered')}
            />
            <p>Skype*</p>
            <Input
                value={user_skype}
                onChange={e => onChangeField('user_skype')(e.target.value)}/>
        </ContactBlockLayout>
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
