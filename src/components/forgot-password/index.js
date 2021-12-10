import React, { useState } from 'react';

import { ModalButtonWapper, ModalContent, ModalSubtitle, ModalTitle } from '../../common/components/ModalStyles';
import Input from '../../common/components/Input';
import { CommonButton } from '../../common/components/Buttons';
import ErrorMessage from '../../common/components/ErrorMessage';
import { requestWithParams } from '../../api/exchangeLayer';
import { inject, observer } from 'mobx-react';
import { ModalVariants } from '../../common/consts';


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
                        description: 'На Ваш почтовый ящик было отправлена ссылка, по которой вы сможете установить новый пароль'
                    })
                })
                .catch(e => localeService.getByKey(e.message));
        }
    };

    return (
        <>
        
            <ModalTitle>Забыли логин или пароль?</ModalTitle>

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
                <CommonButton onClick={onSubmit}>Отправить</CommonButton>
            </ModalButtonWapper>

        </>
    )
}


export default inject('uiStore', 'localeService')(observer(ForgotPassword));
