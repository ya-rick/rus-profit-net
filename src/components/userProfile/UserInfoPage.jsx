import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import UserMainFields from '../nameContact/UserMainFields';
import UserContactFields from '../nameContact/UserContactFields';
import GeneralInformationFields from '../generalInformation/GeneralInformationFields';
import { ContentTitle } from '.';
import ErrorMessage from '../../common/components/ErrorMessage';
import { Centerer } from '../../common/components/Layouts';
import { CommonButton } from '../../common/components/Buttons';
import { ModalVariants } from '../../common/consts';


export default inject('uiStore')(observer(UserInfoPage));

function UserInfoPage({ uiStore }) {

    const { userModel, openModal } = uiStore;

    const {
        editInfo: {
            birthday, image, user_surname, user_name, user_email,user_password_confirm,
            user_password, user_second_email_prefered, user_viber, user_skype,
            user_second_email, user_telegram_prefered, user_phone_prefered,
            user_phone, user_whatsapp_prefered, user_whatsapp, user_viber_prefered,
            user_telegram, user_skype_prefered,
            cityCountryModel
        },
        error: { generalInfo, contactInfo, mainInfo }, setField, saveData
    } = userModel;

    async function onSave() {
        try {

            await saveData();

            openModal(ModalVariants.InfoModal, {
                title: 'Получилось!',
                description: 'Вы изменили свои личные данные'
            })

        } catch(e) {
            console.error(e)
        }
    }

    return <>
        <ContentTitle>
            Личная информация
            {mainInfo && <ErrorMessage>{mainInfo}</ErrorMessage>}
        </ContentTitle>

        <UserMainInfoLayout>

            <UserMainFields
                onChangeField={setField}
                fieldValues={{ user_surname, user_name, user_email, user_password_confirm,
                    user_password }}
                cityCountryModel={cityCountryModel}
            />

        </UserMainInfoLayout>

        <h2 className='register-title'>Предпочитаемый способ связи
            <p className='subtext-new'>Необходимо указать хотя бы один дополнительный способ связи</p>
            {contactInfo && <ErrorMessage>{contactInfo}</ErrorMessage>}
        </h2>

        <UserContactsLayout>

            <UserContactFields
                onChangeField={setField}
                contactFields={{ user_second_email_prefered, user_viber, user_skype,
                    user_second_email, user_telegram_prefered, user_phone_prefered,
                    user_phone, user_whatsapp_prefered, user_whatsapp, user_viber_prefered,
                    user_telegram, user_skype_prefered }}
            />

        </UserContactsLayout>

        <h2 className='register-title'>Общие данные
            {generalInfo && <ErrorMessage>{generalInfo}</ErrorMessage>}
        </h2>

        <GeneralInfoLayout>

            <GeneralInformationFields
                onChangeField={setField}
                birthday={birthday}
                image={image}
            />

        </GeneralInfoLayout>

        <ButtonLayout>
            <CommonButton
                onClick={onSave}
            >Сохранить</CommonButton>
        </ButtonLayout>
    </>
}

const UserMainInfoLayout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    align-content: center;
    flex-wrap: wrap;
    column-gap: 30px;

    > * {
        flex: 1 1 30%;
        max-width: 50%;
    }
`;

const UserContactsLayout = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-between;
    gap: 20px;

    > * {
        flex-grow: 1;
        width: 450px;
        margin: 0 auto;
    }
`;

const GeneralInfoLayout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    gap: 30px;

    > * {
        flex: 1 0 40%;
        width: 300px;
        margin: 0 auto;
    }
`;

const ButtonLayout = styled(Centerer)`
    margin-top: 50px;
`;
