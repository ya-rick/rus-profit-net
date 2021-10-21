import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import ErrorMessage from '../../common/components/ErrorMessage';
import UserMainFields from './UserMainFields';
import UserContactFields from './UserContactFields';


export default observer(function NameContact({ onChangeField, error, fields }) {

    const {
        user_surname, user_name, user_email,user_password_confirm,
        user_password, contacts_info, user_email_confirm,
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
                        contactFields={contacts_info}
                    />
                </Contact2Grid>
            </div>
        </>
    );
})

const Contact2Grid = styled.div`
    display: grid;
    grid-template-columns: max-content;
    grid-row-gap: 40px;

    @media (min-width: 1100px) {
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 50px;
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
