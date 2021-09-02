import React, {Component} from 'react';
import './nameContact.css';
import ErrorMessage from '../../common/components/ErrorMessage';
import CheckBox from "../checkbox";
import { SearchableMultiSelect } from './searchableMultiSelect';
import PasswordInput from '../../common/components/PasswordInput';

export default class NameContact extends Component {

    render() {
        const { contacts, onChangeContacts, contactError, onChangeCountries, onChangeCities,
            onChangeActiveEditableCountry, chosenCountries, chosenCities, activeCountry } = this.props;

        return (
            <>
                <div className='container'>
                    <div className='name-info-block'>
                        <div className='name-info-subblock'>
                            <p className='name-info-text'>Фамилия*</p>
                            <input
                                className='input-reg'
                                type='text'
                                value={contacts.user_surname}
                                onChange={onChangeContacts('user_surname')}/>
                        </div>

                        <div className='name-info-subblock'>
                            <p className='name-info-text'>Имя*</p>
                            <input
                                className='input-reg'
                                type='text'
                                value={contacts.user_name}
                                onChange={onChangeContacts('user_name')}/>
                        </div>

                        <div className='name-info-subblock'>
                            <p className='name-info-text'>E-mail*</p>
                            <input
                                className='input-reg'
                                type='text'
                                value={contacts.user_email}
                                onChange={onChangeContacts('user_email')}/>
                        </div>

                        <div className='name-info-subblock'>
                            <p className='name-info-text'>Пароль*</p>
                            <PasswordInput
                                value={contacts.user_password}
                                onChange={onChangeContacts('user_password')}/>
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
                                editableCountryID={activeCountry?.id}
                            />
                        </div>

                        <div className='name-info-subblock'>
                            <p className='name-info-text'>Выберите город</p>
                            <SearchableMultiSelect
                                onTagClick={(tag) => {}}
                                onTagDelete={(tag) => onChangeCities(tag, 'delete')}
                                chosenOptions={chosenCities}
                                requestType={'get_cities'}
                                isCountry={false}
                                onItemSelected={(tag) => onChangeCities(tag, 'add')}
                                editableCountryID={activeCountry?.id}
                            />
                        </div>

                        <div></div>

                        <div className='name-info-subblock'>
                            <p className='name-info-text'>Подтвердите пароль*</p>
                            <PasswordInput
                                value={contacts.user_password_confirm}
                                onChange={onChangeContacts('user_password_confirm')}/>
                        </div>
                    </div>
                    <p className='subtext-new'>Вы можете выбрать до 3 стран и/или городов</p>
                </div>
                <div className='container'>
                    <h2 className='register-title'>Предпочитаемый способ связи
                        <p className='subtext-new'>Необходимо указать хотя бы один дополнительный способ связи</p>
                        {contactError && <ErrorMessage>{contactError}</ErrorMessage>}
                    </h2>
                    <div className='contacts-block'>
                        <div className='contacts-subblock'>
                            <CheckBox
                                isChecked={contacts.user_second_email_prefered}
                                check={onChangeContacts('user_second_email_prefered')}
                            />
                            <p className='bg-reg-text'>Email*</p>
                            <input
                                className='input-reg'
                                type='text'
                                value={contacts.user_second_email}
                                onChange={onChangeContacts('user_second_email')}/>
                        </div>

                        <div className='contacts-subblock'>
                            <CheckBox
                                isChecked={contacts.user_phone_prefered}
                                check={onChangeContacts('user_phone_prefered')}
                            />
                            <p className='bg-reg-text'>Телефон*</p>
                            <input
                                className='input-reg'
                                type='text'
                                value={contacts.user_phone}
                                onChange={onChangeContacts('user_phone')}/>
                        </div>

                        <div className='contacts-subblock'>
                            <CheckBox
                                isChecked={contacts.user_whatsapp_prefered}
                                check={onChangeContacts('user_whatsapp_prefered')}
                            />
                            <p className='bg-reg-text'>WhatsApp*</p>
                            <input
                                className='input-reg'
                                type='text'
                                value={contacts.user_whatsapp}
                                onChange={onChangeContacts('user_whatsapp')}/>
                        </div>

                        <div className='contacts-subblock'>
                            <CheckBox
                                isChecked={contacts.user_viber_prefered}
                                check={onChangeContacts('user_viber_prefered')}
                            />
                            <p className='bg-reg-text'>Viber*</p>
                            <input
                                className='input-reg'
                                type='text'
                                value={contacts.user_viber}
                                onChange={onChangeContacts('user_viber')}/>
                        </div>

                        <div className='contacts-subblock'>
                            <CheckBox
                                isChecked={contacts.user_telegram_prefered}
                                check={onChangeContacts('user_telegram_prefered')}
                            />
                            <p className='bg-reg-text'>Telegram*</p>
                            <input
                                className='input-reg'
                                type='text'
                                value={contacts.user_telegram}
                                onChange={onChangeContacts('user_telegram')}/>
                        </div>

                        <div className='contacts-subblock'>
                            <CheckBox
                                isChecked={contacts.user_skype_prefered}
                                check={onChangeContacts('user_skype_prefered')}
                            />
                            <p className='bg-reg-text'>Skype*</p>
                            <input
                                className='input-reg'
                                type='text'
                                value={contacts.user_skype}
                                onChange={onChangeContacts('user_skype')}/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
