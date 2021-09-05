import React from 'react';
import { inject, observer } from 'mobx-react';

import './nameContact.css';

import ErrorMessage from '../../common/components/ErrorMessage';
import CheckBox from "../checkbox";
import { SearchableMultiSelect } from './searchableMultiSelect';
import PasswordInput from '../../common/components/PasswordInput';
import Input from '../../common/components/Input';

export default inject('registrationStore')(observer(function NameContact({
    registrationStore }) {

    const { setField, error: { nameContact } } = registrationStore;
    
    const {
        user_surname, user_name, user_email, getUserCities, user_country,
        user_password_confirm, user_password, user_second_email_prefered,
        user_second_email, user_telegram_prefered, user_phone_prefered,
        user_phone, user_whatsapp_prefered, user_whatsapp, user_viber_prefered,
        user_telegram, user_skype_prefered, user_viber, user_skype, currentEditCountry,
        onChangeActiveEditableCountry, onChangeCities, onChangeCountries
    } = registrationStore.commonInfo;

    console.log(registrationStore.commonInfo)

    return (
        <>
            <div>
                <div className='name-info-block'>
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
                        <p className='name-info-text'>Пароль*</p>
                        <PasswordInput
                            value={user_password}
                            onChange={e => setField('user_password')(e.target.value)}/>
                    </div>

                    <div className='name-info-subblock'>
                        <p className='name-info-text'>Выберите страну*</p>
                        <SearchableMultiSelect
                            onTagClick={(tag) => onChangeActiveEditableCountry(tag)}
                            onTagDelete={(tag) => onChangeCountries(tag, 'delete')}
                            chosenOptions={user_country}
                            requestType={'get_countries'}
                            isCountry={true}
                            onItemSelected={(tag) => onChangeCountries(tag, 'add')}
                            editableCountryID={currentEditCountry?.id}
                        />
                    </div>

                    <div className='name-info-subblock'>
                        <p className='name-info-text'>Выберите город</p>
                        <SearchableMultiSelect
                            onTagClick={(tag) => {}}
                            onTagDelete={(tag) => onChangeCities(tag, 'delete')}
                            chosenOptions={getUserCities}
                            requestType={'get_cities'}
                            isCountry={false}
                            onItemSelected={(tag) => onChangeCities(tag, 'add')}
                            editableCountryID={currentEditCountry?.id}
                        />
                    </div>

                    <div></div>

                    <div className='name-info-subblock'>
                        <p className='name-info-text'>Подтвердите пароль*</p>
                        <PasswordInput
                            value={user_password_confirm}
                            onChange={e => setField('user_password_confirm')(e.target.value)}/>
                    </div>
                </div>
                <p className='subtext-new'>Вы можете выбрать до 3 стран и/или городов</p>
            </div>
            <div>
                <h2 className='register-title'>Предпочитаемый способ связи
                    <p className='subtext-new'>Необходимо указать хотя бы один дополнительный способ связи</p>
                    {nameContact && <ErrorMessage>{nameContact}</ErrorMessage>}
                </h2>
                <div className='contacts-block'>
                    <div className='contacts-subblock'>
                        <CheckBox
                            isChecked={user_second_email_prefered}
                            check={setField('user_second_email_prefered')}
                        />
                        <p className='bg-reg-text'>Email*</p>
                        <Input
                            className='input-reg'
                            value={user_second_email}
                            onChange={e => setField('user_second_email')(e.target.value)}/>
                    </div>

                    <div className='contacts-subblock'>
                        <CheckBox
                            isChecked={user_phone_prefered}
                            check={setField('user_phone_prefered')}
                        />
                        <p className='bg-reg-text'>Телефон*</p>
                        <Input
                            className='input-reg'
                            value={user_phone}
                            onChange={e => setField('user_phone')(e.target.value)}/>
                    </div>

                    <div className='contacts-subblock'>
                        <CheckBox
                            isChecked={user_whatsapp_prefered}
                            check={setField('user_whatsapp_prefered')}
                        />
                        <p className='bg-reg-text'>WhatsApp*</p>
                        <Input
                            className='input-reg'
                            value={user_whatsapp}
                            onChange={e => setField('user_whatsapp')(e.target.value)}/>
                    </div>

                    <div className='contacts-subblock'>
                        <CheckBox
                            isChecked={user_viber_prefered}
                            check={setField('user_viber_prefered')}
                        />
                        <p className='bg-reg-text'>Viber*</p>
                        <Input
                            className='input-reg'
                            value={user_viber}
                            onChange={e => setField('user_viber')(e.target.value)}/>
                    </div>

                    <div className='contacts-subblock'>
                        <CheckBox
                            isChecked={user_telegram_prefered}
                            check={setField('user_telegram_prefered')}
                        />
                        <p className='bg-reg-text'>Telegram*</p>
                        <Input
                            className='input-reg'
                            value={user_telegram}
                            onChange={e => setField('user_telegram')(e.target.value)}/>
                    </div>

                    <div className='contacts-subblock'>
                        <CheckBox
                            isChecked={user_skype_prefered}
                            check={setField('user_skype_prefered')}
                        />
                        <p className='bg-reg-text'>Skype*</p>
                        <Input
                            className='input-reg'
                            value={user_skype}
                            onChange={e => setField('user_skype')(e.target.value)}/>
                    </div>
                </div>
            </div>
        </>
    );
}))
