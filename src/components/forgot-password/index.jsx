import React, { useState } from 'react';

import { ModalButtonWapper, ModalContent, ModalSubtitle, ModalTitle } from '../../common/components/ModalStyles';
import Input from '../../common/components/Input';
import { CommonButton, SecondaryButton } from '../../common/components/Buttons';
import ErrorMessage from '../../common/components/ErrorMessage';
import { requestWithParams } from '../../api/exchangeLayer';
import { inject, observer } from 'mobx-react';
import { ModalVariants } from '../../common/consts';
import { DefaultContainer } from '../../common/components/Layouts';


function ForgotPassword ({
    uiStore: { openModal },
    localeService
}) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    function onChange(e) {
        setEmail(e.target.value);
    };

    function validate() {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Неправильный формат почты')
            return false;
        };

        return true;
    }

    function onSubmit() {
        if (validate()) {
            requestWithParams('forgotPassword', {email})
                .then(() => {
                    openModal(ModalVariants.InfoModal, {
                        title: 'Получилось!',
                        description: 'Ссылка для восстановления пароля отправлена на Ваш почтовый ящик'
                    })
                })
                .catch(e => localeService.getByKey(e.message));
        }
    };

    return (
        <>
        
            <DefaultContainer>
                <ModalTitle>Забыли логин или пароль?</ModalTitle>
            </DefaultContainer>

            <ModalContent>

                <ModalSubtitle>Введите ваш e-mail</ModalSubtitle>
                <Input
                    placeholder={'example@example.ru'}
                    onChange={onChange}
                    value={email}
                />

                {error && <ErrorMessage>{error}</ErrorMessage>}

            </ModalContent>

            <ModalButtonWapper>
                <SecondaryButton onClick={onSubmit}>Отправить</SecondaryButton>
            </ModalButtonWapper>

        </>
    )
}


export default inject('uiStore', 'localeService')(observer(ForgotPassword));
