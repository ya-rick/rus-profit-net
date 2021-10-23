import { observer } from 'mobx-react';
import styled from 'styled-components';

import Input from '../../common/components/Input';
import PasswordInput from '../../common/components/PasswordInput';


// For comfortable layouts purpose
function UserMainFields({ onChangeField, fieldValues, cityCountryModel }) {

    const {
        user_surname, user_name, user_email, user_password, user_password_confirm, user_email_confirm
    } = fieldValues;

    return <>
        <PairWrapper>
            <div className='name-info-subblock'>
                <p className='name-info-text'>Фамилия*</p>
                <Input
                    className='input-reg'
                    value={user_surname}
                    onChange={e => onChangeField('user_surname')(e.target.value)}/>
            </div>
            <div className='name-info-subblock'>
                <p className='name-info-text'>Имя*</p>
                <Input
                    className='input-reg'
                    value={user_name}
                    onChange={e => onChangeField('user_name')(e.target.value)}/>
            </div>
        </PairWrapper>
        
        <PairWrapper>
            <div className='name-info-subblock'>
                <p className='name-info-text'>E-mail*</p>
                <Input
                    className='input-reg'
                    value={user_email}
                    onChange={e => onChangeField('user_email')(e.target.value)}/>
            </div>

            <div className='name-info-subblock'>
                <p className='name-info-text'>Подтвердите e-mail*</p>
                <Input
                    className='input-reg'
                    value={user_email_confirm}
                    onChange={e => onChangeField('user_email_confirm')(e.target.value)}/>
            </div>
        </PairWrapper>
        
        <PairWrapper>
            <div className='name-info-subblock'>
                <p className='name-info-text'>Пароль*</p>
                <PasswordInput
                    value={user_password}
                    onChange={e => onChangeField('user_password')(e.target.value)}/>
            </div>

            <div className='name-info-subblock'>
                <p className='name-info-text'>Подтвердите пароль*</p>
                <PasswordInput
                    value={user_password_confirm}
                    onChange={e => onChangeField('user_password_confirm')(e.target.value)}/>
            </div>
        </PairWrapper>
        
    </>
}

export default observer(UserMainFields);

const PairWrapper = styled.div`
    display: flex;
    align-items: stretch;
    flex-direction: column;
`;
