import { observer, inject } from 'mobx-react';
import { useState } from 'react';
import styled from 'styled-components';

import { requestWithParams } from '../../api/exchangeLayer';
import { CommonButton } from '../../common/components/Buttons';
import ErrorMessage from '../../common/components/ErrorMessage';
import { DefaultContainer } from '../../common/components/Layouts';
import PasswordInput from '../../common/components/PasswordInput';
import { MainSubtitle, RegularTitle } from '../../common/components/Typography';
import { ModalVariants } from '../../common/consts';
import { TwoLinkedButtonGroup } from '../../common/components/StaticPagesStyles';


export default inject('uiStore', 'localeService')(observer(PasswordChangePage));

function PasswordChangePage({ uiStore, localeService }) {
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

        if (passwords.old_password === passwords.new_password) return setError(localeService.getByKey('password_old'));
        if (passwords.new_password !== passwords.password_confirm) return setError(localeService.getByKey('password_equals'));

        if (!/^\w{6,}$/.test(passwords.new_password)) return setError(localeService.getByKey('password_invalid'));

        for (let field of Object.values(passwords)) {
            if (!field.trim().length) return setError(localeService.getByKey('all_fields'));
        }

        return true;
    }

    async function sendPasswords() {
        try {
            if (validatePasswords() !== true) return;

            await requestWithParams('changerPasswordUser', passwords);

            uiStore.openModal(ModalVariants.InfoModal, {
                title: '??????????????????????!',
                description: '?????? ???????????? ??????????????'
            })
        } catch(e) {
            uiStore.openModal(ModalVariants.InfoModal, {
                title: '????????????!',
                description: localeService.getByKey(e.message)
            })
        }
    }

    return (
        <>
            <DefaultContainer>
                <MainSubtitle>
                    ?????????? ????????????
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </MainSubtitle>
            </DefaultContainer>

            <PasswordsLayout>
                <div>
                    <RegularTitle>???????????? ????????????</RegularTitle>
                    <PasswordInput
                        className='input-reg'
                        value={passwords.old_password}
                        onChange={onChangePaswords('old_password')}/>
                </div>
                <div>
                    <RegularTitle>?????????? ????????????</RegularTitle>
                    <PasswordInput
                        className='input-reg'
                        value={passwords.new_password}
                        onChange={onChangePaswords('new_password')}/>
                </div>
                <div>
                    <RegularTitle>?????????????????????? ????????????</RegularTitle>
                    <PasswordInput
                        className='input-reg'
                        value={passwords.password_confirm}
                        onChange={onChangePaswords('password_confirm')}/>
                </div>
            </PasswordsLayout>

            <TwoLinkedButtonGroup>
                <CommonButton
                    onClick={sendPasswords}
                >
                    ??????????????????????
                </CommonButton>
            </TwoLinkedButtonGroup>
        </>
    );
}

const PasswordsLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: .5rem;

    > * {
        width: 300px;
    }
`;
