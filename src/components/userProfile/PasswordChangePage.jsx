import { observer, inject } from 'mobx-react';
import { useState } from 'react';
import styled from 'styled-components';

import { ContentTitle } from '.';
import { requestWithParams } from '../../api/exchangeLayer';
import { CommonButton } from '../../common/components/Buttons';
import ErrorMessage from '../../common/components/ErrorMessage';
import PasswordInput from '../../common/components/PasswordInput';
import { ModalVariants } from '../../common/consts';


export default inject('uiStore')(observer(PasswordChangePage));

function PasswordChangePage({ uiStore }) {
    const [error, setError] = useState(null);
    const [passwords, setPasswords] = useState({
        old_password: '',
        new_password: '',
        password_confirm: ''
    });

    function onChangePaswords(fieldName) {
        return e => setPasswords(prevPasswordsState => ({
            ...prevPasswordsState,
            [fieldName]: e.target.value
        }))
    }

    function validatePasswords() {
        setError(null);

        if (passwords.old_password === passwords.new_password) return setError('Старый и новый пароли не должны совпадать');
        if (passwords.new_password !== passwords.password_confirm) return setError('Подтверждённый и новый пароль должны совпадать');

        if (!/^\w{6,}$/.test(passwords.new_password)) return setError('Введите больше 6-ти символов латиницей и цифрами в поле пароль');

        for (let field of Object.values(passwords)) {
            if (!field.trim().length) return setError('Заполните все поля');
        }

        return true;
    }

    async function sendPasswords() {
        try {
            if (validatePasswords() !== true) return;

            await requestWithParams('changerPasswordUser', passwords);

            uiStore.openModal(ModalVariants.InfoModal, {
                title: 'Поздравляем!',
                description: 'Вы успешно изменили пароль'
            })
        } catch(e) {
            console.error(e);

            setError(e);
        }
    }

    return <>
        <ContentTitle>
            Смена пароля
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </ContentTitle>

        <PasswordsLayout>
            <div>
                <p className='name-info-text'>Старый пароль</p>
                <PasswordInput
                    className='input-reg'
                    value={passwords.old_password}
                    onChange={onChangePaswords('old_password')}/>
            </div>
            <div>
                <p className='name-info-text'>Новый пароль</p>
                <PasswordInput
                    className='input-reg'
                    value={passwords.new_password}
                    onChange={onChangePaswords('new_password')}/>
            </div>
            <div>
                <p className='name-info-text'>Подтвердите пароль</p>
                <PasswordInput
                    className='input-reg'
                    value={passwords.password_confirm}
                    onChange={onChangePaswords('password_confirm')}/>
            </div>
        </PasswordsLayout>

        <CommonButton
            style={{ margin: '40px auto' }}
            onClick={sendPasswords}
        >Подтвердить</CommonButton>
    </>
}

const PasswordsLayout = styled.div`
    margin: 0 auto;

    > * {
        min-width: 300px;
        width: 50%;
    }
`;
