import React, {Component} from 'react';
import './nameContact.css';
import Select from "../select";

const testOptins = [
    {
        value: 1,
        text: 'Test'
    },
    {
        value: 2,
        text: 'Test'
    },
    {
        value: 3,
        text: 'Test'
    }
]

export default class NameContact extends Component {
    render() {
        return (
            <>
                <div className='container'>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-reg-text'>Фамилия*</p>
                            <input className='input-reg' type='text'/>
                        </div>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-reg-text'>Выберите страну*</p>
                            <Select>
                                {testOptins}
                            </Select>
                            <p className='subtext'>Вы можете выбрать до 3 стран и/или городов</p>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-reg-text'>Имя*</p>
                            <input className='input-reg' type='text'/>
                        </div>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-reg-text'>Выберите город</p>
                            <Select>
                                {testOptins}
                            </Select>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-reg-text'>E-mail*</p>
                            <input className='input-reg' type='text'/>
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
                            <input className='input-reg' type='text'/>
                        </div>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-reg-text'>Подтвердите пароль*</p>
                            <input className='input-reg' type='text'/>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <h2 className='contacts col-12'>Конакты</h2>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-reg-text'>Телефон*</p>
                            <input className='input-reg' type='text'/>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-reg-text'>E-mail</p>
                            <input className='input-reg' type='text'/>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-reg-text'>WhatsApp</p>
                            <input className='input-reg' type='text'/>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-3'>
                        <div className='main-filter-search-subBlock'>
                            <p className='bg-reg-text'>Viber</p>
                            <input className='input-reg' type='text'/>
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
