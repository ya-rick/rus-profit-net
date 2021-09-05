import React from 'react';
import { inject, observer } from 'mobx-react';

import { PageContentWrapper } from '../../common/components/Layouts'
import PageTitle from '../../common/components/PageTitle';
import GeneralInformation from '../generalInformation';
import NameContact from '../nameContact/nameContact';
import RegisterVacancy from '../registerVacancies'
import RegistrationButtonsBlock from './RegistrationButtonsBlock';

export default inject('registrationStore')(observer(function RegisterPage({ 
    registrationStore: { commonInfo: { registration_type }, setField } }) {

    return <PageContentWrapper>
        <PageTitle>Регистрация</PageTitle>

        <NameContact/>

        <GeneralInformation/>

        <RegistrationButtonsBlock
            onClickLeft={() => setField('registration_type')('vacancy')}
            onClickRight={() => setField('registration_type')('resume')}
            current={registration_type}
        />

        {registration_type && <RegisterVacancy/>}
    </PageContentWrapper>
}))