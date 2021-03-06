import { inject, observer } from 'mobx-react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { ModalContent, ModalSubtitle, ModalTitle } from '../../../common/components/ModalStyles';
import PasswordInput from '../../../common/components/PasswordInput';
import { CommonButton } from '../../../common/components/Buttons';
import ErrorMessage from '../../../common/components/ErrorMessage';
import { ModalVariants } from '../../../common/consts';
import LocaleService from '../../../api/LocaleService';
import { DefaultContainer } from '../../../common/components/Layouts';


let localeService = LocaleService.getInstance();

const PasswordResetModal = ({ uiStore: { openModal, modalPayload: { request, isReset = false } } }) => {
    const history = useHistory();

    const [passwordInputs, setPassword] = useState({
        new_password: '',
        password_confirm: ''
    })

    const [error, setError] = useState(null);

    function bindOnChangePasswords(fieldName) {
        return e => setPassword(prevState => ({...prevState, [fieldName]: e.target.value}));
    }

    function validate() {
        setError(null);

        if (passwordInputs.new_password !== passwordInputs.password_confirm) {
            setError(localeService.getByKey('password_equals'));
            return false;
        }
        if (passwordInputs.new_password.length < 6 && /[a-zA-Z]{6,}/.test(passwordInputs.new_password)) {
            setError(localeService.getByKey('password_invalid'));
            return false;
        }
        
        return true;
    }

    function sendPasswords() {
        if (validate()) {
            request(...Object.values(passwordInputs))
                .then(() => {
                    isReset && history.push('/');

                    openModal(ModalVariants.InfoModal, {
                        title: 'Ваш пароль успешно изменён!',
                        description: 'Теперь вы можете войти в систему с новым'
                    });
                })
                .catch(e => openModal(ModalVariants.InfoModal, {
                    title: 'Ошибка!',
                    description: localeService.getByKey(e.message)
                }));
        }
    }

    return (
        <>
            <DefaultContainer>
                <ModalTitle>Введите новый пароль</ModalTitle>
            </DefaultContainer>
            
            <ModalContent>

                <PasswordBlock>
                    <ModalSubtitle>Пароль</ModalSubtitle>

                    <PasswordInput
                        value={passwordInputs.new_password}
                        onChange={bindOnChangePasswords('new_password')}
                    />
                </PasswordBlock>

                <PasswordBlock>
                    <ModalSubtitle>Подтвердите пароль</ModalSubtitle>

                    <PasswordInput
                        value={passwordInputs.password_confirm}
                        onChange={bindOnChangePasswords('password_confirm')}
                    />

                </PasswordBlock>

                {error && <ErrorMessage style={{ marginTop: '-40px', marginBottom: '40px' }}>{error}</ErrorMessage>}

                <CommonButton
                    style={{ margin: '0 auto' }}
                    onClick={sendPasswords}
                >Отправить</CommonButton>

            </ModalContent>
        </>
    )
}

export default inject('uiStore')(observer(PasswordResetModal));

const PasswordBlock = styled.div`
    margin-bottom: 40px;

    > *:last-child {
        margin-top: 30px;
    }

    :last-child {
        margin-bottom: 0;
    }
`;
