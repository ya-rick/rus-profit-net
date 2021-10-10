import React from 'react';
import { inject, observer } from 'mobx-react';

import { PageContentWrapper } from '../../common/components/Layouts'
import PageTitle from '../../common/components/PageTitle';
import GeneralInformation from './generalInformation';
import NameContact from '../nameContact';
import RegisterVacancy from '../registerVacancies'
import RegistrationButtonsBlock from './RegistrationButtonsBlock';
import ErrorMessage from '../../common/components/ErrorMessage';

export default inject('registrationStore')(observer(function RegisterPage({ 
    registrationStore: {
        commonInfo, targetedInfo, setField, error, sendData
    }
}) {

    const {
        mainInfo, creationInfo, contactInfo
    } = error;

    return <PageContentWrapper>
        <PageTitle>
            Регистрация
            {mainInfo && <ErrorMessage>{mainInfo}</ErrorMessage>}
        </PageTitle>

        <NameContact
            onChangeField={setField}
            fields={commonInfo}
            error={contactInfo}
        />

        <GeneralInformation/>

        <RegistrationButtonsBlock
            onClickLeft={() => setField('registration_type')('vacancy')}
            onClickRight={() => setField('registration_type')('resume')}
            current={commonInfo.registration_type}
            creationError={creationInfo}
        />

        {commonInfo.registration_type && <RegisterVacancy
            onFieldChange={setField}
            fields={targetedInfo}
            error={error}
            onConfirmClicked={sendData}
            isResume={commonInfo.registration_type === 'resume'}
            successMessage={{
                title: 'Поздравляю!',
                description: 'Для завершения регистрация на Ваш почтовый ящик было отправлена ссылка, по которой необходимо перейти'
            }}
        />}
    </PageContentWrapper>
}))