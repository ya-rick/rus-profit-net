import React from 'react';
import styled, { css } from 'styled-components';
import { observer } from 'mobx-react';

import ErrorMessage from '../../../common/components/ErrorMessage';
import UserMainFields from './UserMainFields';
import UserContactFields from './UserContactFields';
import { AdditionalText, Subtitle } from '../../../common/components/Typography';
import { DefaultContainer } from '../../../common/components/Layouts';
import { forDevice } from '../../../common/commonAdaptiveStyles';
import Icon from '../../../common/components/Icon';


export default observer(function NameContact({ onChangeField, error, fields }) {

    const {
        user_surname, user_name, user_email,user_password_confirm,
        user_password, contacts_info, user_email_confirm,
        cityCountryModel
    } = fields;

    return (
        <>
            <Contact4Grid>
                <UserMainFields
                    onChangeField={onChangeField}
                    fieldValues={{ user_surname, user_name, user_email, user_password_confirm,
                        user_password, user_email_confirm }}
                    cityCountryModel={cityCountryModel}
                />
            </Contact4Grid>

            <DefaultContainer>
                <DefaultContainer>
                    <Subtitle>
                        Предпочитаемый способ связи
                        <Icon
                            iconName={'info'}
                            title={'Необходимо указать хотя бы один дополнительный способ связи'}
                            size={'xs'}
                        />
                    </Subtitle>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </DefaultContainer>

                <Contact3Grid>
                    <UserContactFields
                        onChangeField={onChangeField}
                        contactFields={contacts_info}
                    />
                </Contact3Grid>
            </DefaultContainer>
        </>
    );
})

export const Contact3Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;

    gap: 1rem;

    ${forDevice.M(css`
        grid-template-columns: repeat(2, 1fr);
    `)}

    ${forDevice.L(css`
        grid-template-columns: repeat(3, 1fr);
    `)}
`;

const Contact4Grid = styled.div`
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-areas:
        'lastName' 'firstName'
        'eMail'    'eMailConfirm'
        'password' 'passwordConfirm'
    ;

    gap: 1rem;

    ${forDevice.M(css`
        grid-template-areas:
            'lastName firstName'
            'eMail    eMailConfirm'
            'password passwordConfirm'
        ;
    `)}

    ${forDevice.L(css`
        grid-template-areas:
            'lastName  eMail        password'
            'firstName eMailConfirm passwordConfirm'
        ;
    `)}
`;
