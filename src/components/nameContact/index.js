import React from 'react';
import { observer } from 'mobx-react';

import ErrorMessage from '../../common/components/ErrorMessage';
import styled from 'styled-components';
import UserMainFields from './UserMainFields';
import UserContactFields from './UserContactFields';

export default observer(function NameContact({ onChangeField, error, fields }) {

    const {
        user_surname, user_name, user_email,user_password_confirm,
        user_password, user_second_email_prefered, user_viber, user_skype,
        user_second_email, user_telegram_prefered, user_phone_prefered,
        user_phone, user_whatsapp_prefered, user_whatsapp, user_viber_prefered,
        user_telegram, user_skype_prefered, user_email_confirm,
        cityCountryModel
    } = fields;

    return (
        <>
            <div>
                <Contact4Grid>
                    <UserMainFields
                        onChangeField={onChangeField}
                        fieldValues={{ user_surname, user_name, user_email, user_password_confirm,
                            user_password, user_email_confirm }}
                        cityCountryModel={cityCountryModel}
                    />
                </Contact4Grid>
            </div>
            <div>
                <h2 className='register-title'>Предпочитаемый способ связи
                    <p className='subtext-new'>Необходимо указать хотя бы один дополнительный способ связи</p>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </h2>
                <Contact2Grid>
                    <UserContactFields
                        onChangeField={onChangeField}
                        contactFields={{ user_second_email_prefered, user_viber, user_skype,
                            user_second_email, user_telegram_prefered, user_phone_prefered,
                            user_phone, user_whatsapp_prefered, user_whatsapp, user_viber_prefered,
                            user_telegram, user_skype_prefered }}
                    />
                </Contact2Grid>
            </div>
        </>
    );
})

const Contact2Grid = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    gap: 50px;

    > * {
        flex: 1 0 45%;
        width: 350px;
    }

    @media (max-width: 1000px) {
        flex-direction: column;
        justify-content: space-between;

        > * {
            width: 500px;
        }
    }
`;

const Contact4Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
        margin: 0 20%;
    }
`;
