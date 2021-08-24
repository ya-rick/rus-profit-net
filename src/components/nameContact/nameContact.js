import React, {Component} from 'react';
import './nameContact.css';
import Select from "../select";

export default class NameContact extends Component {

    render() {
        const { contacts, onChangeContacts } = this.props;

        return (
            <>
                <div className='container'>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-reg-text'>Фамилия*</p>
                            <input
                                className='input-reg'
                                type='text'
                                value={contacts.user_surname_r}
                                onChange={onChangeContacts('user_surname_r')}/>
                        </div>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-reg-text'>Выберите страну*</p>
                            <Select>
                            </Select>
                            <p className='subtext'>Вы можете выбрать до 3 стран и/или городов</p>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-reg-text'>Имя*</p>
                            <input
                                className='input-reg'
                                type='text'
                                value={contacts.user_name_r}
                                onChange={onChangeContacts('user_name_r')}/>
                        </div>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-reg-text'>Выберите город</p>
                            <Select>
                            </Select>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-reg-text'>E-mail*</p>
                            <input
                                className='input-reg'
                                type='text'
                                value={contacts.user_email_r}
                                onChange={onChangeContacts('user_email_r')}/>
                        </div>
                        <div className='main-filter-search-subBlock flex-center'>
                            <button className='combo-button-reg'>
                                Выбрать дополнительную
                                страну/город
                            </button>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-reg-text'>Пароль*</p>
                            <input
                                className='input-reg'
                                type='text'
                                value={contacts.user_password_r}
                                onChange={onChangeContacts('user_password_r')}/>
                        </div>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-reg-text'>Подтвердите пароль*</p>
                            <input
                                className='input-reg'
                                type='text'
                                value={contacts.user_password_confirm_r}
                                onChange={onChangeContacts('user_password_confirm_r')}/>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <h2 className='contacts col-12'>Конакты</h2>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-reg-text'>Телефон*</p>
                            <input
                                className='input-reg'
                                type='text'
                                value={contacts.user_phone_r}
                                onChange={onChangeContacts('user_phone_r')}/>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-reg-text'>WhatsApp</p>
                            <input
                                className='input-reg'
                                type='text'
                                value={contacts.user_whatsapp_r}
                                onChange={onChangeContacts('user_whatsapp_r')}/>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-reg-text'>Viber</p>
                            <input
                                className='input-reg'
                                type='text'
                                value={contacts.user_viber_r}
                                onChange={onChangeContacts('user_viber_r')}/>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <p className='subtext-new'>Необходимо указать хотя бы один дополнительный способ связи</p>
                </div>
            </>
        );
    }
}
