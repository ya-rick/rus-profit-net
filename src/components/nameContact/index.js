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
