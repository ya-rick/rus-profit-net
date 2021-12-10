import { observer, inject } from 'mobx-react';
import { useState } from 'react';
import styled from 'styled-components';

import { ContentTitle } from '.';
import { requestWithParams } from '../../api/exchangeLayer';
import { CommonButton } from '../../common/components/Buttons';
import ErrorMessage from '../../common/components/ErrorMessage';
import Input from '../../common/components/Input';
import PasswordInput from '../../common/components/PasswordInput';
import { ModalVariants } from '../../common/consts';


export default inject('uiStore', 'localeService')(observer(EmailChangePage));

function EmailChangePage({ uiStore, localeService }) {
    const [error, setError] = useState(null);
    const [emails, setEmails] = useState({
        user_email: '',
        user_email_confirm: '',
        password: ''
    });

    function onChangeEmails(fieldName) {
        return e => setEmails(prevEmailsState => ({
            ...prevEmailsState,
            [fieldName]: e.target.value
        }))
    }

    function validateEmails() {
        setError(null);

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emails.user_email)) return setError(localeService.getBykey('email_invalid'));
        if (emails.user_email !== emails.user_email_confirm) return setError(localeService.getBykey('email_equals'));

        return true;
    }

    async function sendEmails() {
        try {
            if (validateEmails() !== true) return;

            await requestWithParams('changerEmailUser', emails);

            uiStore.openModal(ModalVariants.InfoModal, {
                title: 'Поздравляем!',
                description: 'Вы успешно изменили имейл. На Вашу новую почту отправлено письмо с подтверждением'
            });
        } catch(e) {
            uiStore.openModal(ModalVariants.InfoModal, {
                title: 'Ошибка!',
                description: localeService.getBykey(e.message)
            });
        }
    }

    return <>
        <ContentTitle>
            Смена почтового ящика
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </ContentTitle>

        <EmailsLayout>
            <div>
                <p className='name-info-text'>Новый почтовый ящик</p>
                <Input
                    className='input-reg'
                    value={emails.user_email}
                    onChange={onChangeEmails('user_email')}/>
            </div>
            <div>
                <p className='name-info-text'>Подтвердите почтовый ящик</p>
                <Input
                    className='input-reg'
                    value={emails.user_email_confirm}
                    onChange={onChangeEmails('user_email_confirm')}/>
            </div>
            <div>
                <p className='name-info-text'>Старый пароль</p>
                <PasswordInput
                    className='input-reg'
                    value={emails.password}
                    onChange={onChangeEmails('password')}/>
            </div>
        </EmailsLayout>

        <CommonButton
            style={{ margin: '20px auto 0' }}
            onClick={sendEmails}
        >Подтвердить</CommonButton>
    </>
}

const EmailsLayout = styled.div`
    margin: 0 auto;

    > * {
        min-width: 300px;
        width: 50%;
    }
`;
