import React from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { DefaultContainer, MainContainer } from '../../common/components/Layouts';
import { MainTitle } from '../../common/components/Typography';
import GeneralInformation from './generalInformation';
import NameContact from './nameContact';
import TargetInformation from './targetInformation';
import RegistrationButtonsBlock from './RegistrationButtonsBlock';
import ErrorMessage from '../../common/components/ErrorMessage';


export default inject('registrationStore', 'uiStore')(observer(function RegisterPage({ 
    registrationStore: {
        commonInfo, targetedInfo, setField, error, sendData
    },
    uiStore: { userModel: { isUserAuthenticated } }
}) {

    if (isUserAuthenticated) {
        return <Redirect to={'/profile/userInfo'}/>
    }

    const {
        mainInfo, creationInfo, contactInfo, generalInfo
    } = error;

    const { birthday, avatar } = commonInfo;

    return (
        <MainContainer>
            <DefaultContainer>
                <MainTitle>
                    Регистрация
                    {mainInfo && <ErrorMessage>{mainInfo}</ErrorMessage>}
                </MainTitle>
            </DefaultContainer>

            <BlocksLayout>
                <NameContact
                    onChangeField={setField}
                    fields={commonInfo}
                    error={contactInfo}
                />

                <GeneralInformation
                    onChange={setField}
                    error={generalInfo}
                    birthday={birthday}
                    avatar={avatar}
                />

                <RegistrationButtonsBlock
                    onClickLeft={() => setField('registration_type')('vacancy')}
                    onClickRight={() => setField('registration_type')('resume')}
                    current={commonInfo.registration_type}
                    creationError={creationInfo}
                />

                {commonInfo.registration_type && <TargetInformation
                    onFieldChange={setField}
                    fields={targetedInfo}
                    error={error}
                    onConfirmClicked={sendData}
                    isResume={commonInfo.registration_type === 'resume'}
                    successMessage={{
                        title: 'Ваш аккаунт успешно создан!',
                        description: 'Для завершения регистрации, пожалуйста, перейдите по ссылке, отправленной на Вашу почту'
                    }}
                />}
            </BlocksLayout>
        </MainContainer>
    );
}));

const BlocksLayout = styled.div`
    display: grid;

    gap: 1rem;
`;
