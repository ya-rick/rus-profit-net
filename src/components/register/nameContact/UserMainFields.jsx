import { observer } from 'mobx-react';
import styled from 'styled-components';

import Input from '../../../common/components/Input';
import PasswordInput from '../../../common/components/PasswordInput';
import { RegularTitle } from '../../../common/components/Typography';


function UserMainFields({ onChangeField, fieldValues, cityCountryModel }) {

    const {
        user_surname, user_name, user_email, user_password, user_password_confirm, user_email_confirm
    } = fieldValues;

    return <>
        <div style={{ gridArea: 'lastName' }}>
            <RegularTitle>Фамилия*</RegularTitle>
            <Input
                className='input-reg'
                value={user_surname}
                onChange={e => onChangeField('user_surname')(e.target.value)}/>
        </div>

        <div style={{ gridArea: 'firstName' }}>
            <RegularTitle>Имя*</RegularTitle>
            <Input
                className='input-reg'
                value={user_name}
                onChange={e => onChangeField('user_name')(e.target.value)}/>
        </div>
    
        <div style={{ gridArea: 'eMail' }}>
            <RegularTitle>E-mail*</RegularTitle>
            <Input
                className='input-reg'
                value={user_email}
                onChange={e => onChangeField('user_email')(e.target.value)}/>
        </div>

        <div style={{ gridArea: 'eMailConfirm' }}>
            <RegularTitle>Подтвердите e-mail*</RegularTitle>
            <Input
                className='input-reg'
                value={user_email_confirm}
                onChange={e => onChangeField('user_email_confirm')(e.target.value)}/>
        </div>
    
        <div style={{ gridArea: 'password' }}>
            <RegularTitle>Пароль*</RegularTitle>
            <PasswordInput
                value={user_password}
                onChange={e => onChangeField('user_password')(e.target.value)}/>
        </div>

        <div style={{ gridArea: 'passwordConfirm' }}>
            <RegularTitle>Подтвердите пароль*</RegularTitle>
            <PasswordInput
                value={user_password_confirm}
                onChange={e => onChangeField('user_password_confirm')(e.target.value)}/>
        </div>
    </>
}

export default observer(UserMainFields);
