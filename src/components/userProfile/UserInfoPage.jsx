import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import UserContactFields from '../nameContact/UserContactFields';
import GeneralInformationFields from '../generalInformation/GeneralInformationFields';
import { ContentTitle } from '.';
import ErrorMessage from '../../common/components/ErrorMessage';
import { Centerer } from '../../common/components/Layouts';
import { CommonButton } from '../../common/components/Buttons';
import { ModalVariants } from '../../common/consts';
import Input from '../../common/components/Input';
import { SearchableMultiSelect } from '../nameContact/searchableMultiSelect';


export default inject('uiStore')(observer(UserInfoPage));

function UserInfoPage({ uiStore }) {

    const { userModel, openModal } = uiStore;

    const {
        editInfo: {
            birthday, image, user_surname, user_name, user_email, user_confirm_email, user_second_email_prefered,
            user_viber, user_skype, user_second_email, user_telegram_prefered, user_phone_prefered,
            user_phone, user_whatsapp_prefered, user_whatsapp, user_viber_prefered,
            user_telegram, user_skype_prefered,
            cityCountryModel: { onChangeActiveEditableCountry, onChangeCountries, chosenCountries, 
                currentEditCountry, onChangeCities, chosenCities }
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

            <div className='name-info-subblock'>
                <p className='name-info-text'>Фамилия*</p>
                <Input
                    className='input-reg'
                    value={user_surname}
                    onChange={e => setField('user_surname')(e.target.value)}/>
            </div>

            <div className='name-info-subblock'>
                <p className='name-info-text'>Имя*</p>
                <Input
                    className='input-reg'
                    value={user_name}
                    onChange={e => setField('user_name')(e.target.value)}/>
            </div>

            <div className='name-info-subblock'>
                <p className='name-info-text'>E-mail*</p>
                <Input
                    className='input-reg'
                    value={user_email}
                    onChange={e => setField('user_email')(e.target.value)}/>
            </div>

            <div className='name-info-subblock'>
                <p className='name-info-text'>Подтвердите E-mail*</p>
                <Input
                    className='input-reg'
                    value={user_confirm_email}
                    onChange={e => setField('user_confirm_email')(e.target.value)}/>
                <p
                    className='subtext-new'
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                >Сменить пароль </p>
            </div>

            <div className='name-info-subblock'>
                <p className='name-info-text'>Выберите страну*</p>
                <SearchableMultiSelect
                    onTagClick={(tag) => onChangeActiveEditableCountry(tag)}
                    onTagDelete={(tag) => onChangeCountries(tag, 'delete')}
                    chosenOptions={chosenCountries}
                    requestType={'get_countries'}
                    isCountry={true}
                    onItemSelected={(tag) => onChangeCountries(tag, 'add')}
                    editableCountryID={currentEditCountry?.id}
                />
                <p className='subtext-new'>Вы можете выбрать до 3 стран и/или городов</p>
            </div>

            <div className='name-info-subblock'>
                <p className='name-info-text'>Выберите город</p>
                <SearchableMultiSelect
                    onTagClick={() => {}}
                    onTagDelete={(tag) => onChangeCities(tag, 'delete')}
                    chosenOptions={chosenCities}
                    requestType={'get_cities'}
                    isCountry={false}
                    onItemSelected={(tag) => onChangeCities(tag, 'add')}
                    editableCountryID={currentEditCountry?.id}
                />
            </div>

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
        max-width: 45%;
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
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    justify-items: center;
    align-items: center;

    > img {
        width: 100%;
        height: 100%;
    }
`;

const ButtonLayout = styled(Centerer)`
    margin-top: 50px;
`;
