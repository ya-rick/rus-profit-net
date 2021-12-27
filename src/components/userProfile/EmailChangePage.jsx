import { observer, inject } from 'mobx-react';
import { useState } from 'react';
import styled from 'styled-components';

import { requestWithParams } from '../../api/exchangeLayer';
import { CommonButton } from '../../common/components/Buttons';
import ErrorMessage from '../../common/components/ErrorMessage';
import Input from '../../common/components/Input';
import { DefaultContainer } from '../../common/components/Layouts';
import PasswordInput from '../../common/components/PasswordInput';
import { MainSubtitle, RegularTitle } from '../../common/components/Typography';
import { ModalVariants } from '../../common/consts';
import { TwoLinkedButtonGroup } from '../../common/components/StaticPagesStyles';


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

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emails.user_email)) return setError(localeService.getByKey('email_invalid'));
        if (emails.user_email !== emails.user_email_confirm) return setError(localeService.getByKey('email_equals'));

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
                description: localeService.getByKey(e.message)
            });
        }
    }

    return <>
        <DefaultContainer>
            <MainSubtitle>
                Смена почтового ящика
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </MainSubtitle>
        </DefaultContainer>

        <EmailsLayout>
            <div>
                <RegularTitle>Новый почтовый ящик</RegularTitle>
                <Input
                    className='input-reg'
                    value={emails.user_email}
                    onChange={onChangeEmails('user_email')}/>
            </div>
            <div>
                <RegularTitle>Подтвердите почтовый ящик</RegularTitle>
                <Input
                    className='input-reg'
                    value={emails.user_email_confirm}
                    onChange={onChangeEmails('user_email_confirm')}/>
            </div>
            <div>
                <RegularTitle>Пароль</RegularTitle>
                <PasswordInput
                    className='input-reg'
                    value={emails.password}
                    onChange={onChangeEmails('password')}/>
            </div>
        </EmailsLayout>

        <TwoLinkedButtonGroup>
            <CommonButton
                onClick={sendEmails}
            >
                Подтвердить
            </CommonButton>
        </TwoLinkedButtonGroup>
    </>
}

const EmailsLayout = styled.div`
    margin: 0 auto;

    > * {
        min-width: 300px;
        width: 50%;
    }
`;
