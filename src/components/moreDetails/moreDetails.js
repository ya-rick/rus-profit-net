import React from 'react';
import './moreDetails.css';

const MoreDetails = ({authorized})=>{

    return(
        <div className='card-va container'>
            <h2 className='description container'>Подробнее</h2>
            <div className='container'>
                <div className='row flex col-xs-12 col-md-12 col-lg-12'>
                    <p className='bold-text-info col-xs-6 col-md-6 col-lg-3'>Знание языков:</p>
                    <p className='light-text-info col-xs-6 col-md-6 col-lg-9'>Английский, Немецкий</p>
                </div>
                <div className='row flex col-xs-12 col-md-12 col-lg-12'>
                    <p className='bold-text-info col-xs-6 col-md-6 col-lg-3'>Образование:</p>
                    <p className='light-text-info col-xs-6 col-md-6 col-lg-9'>Высшее, Медицинское</p>
                </div>
                <div className='row flex col-xs-12 col-md-12 col-lg-12'>
                    <p className='bold-text-info col-xs-6 col-md-6 col-lg-3'>Обязанности:</p>
                    <div className='col-xs-6 col-md-6 col-lg-6 margin-left-10'>
                        <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>Купание детей</p>
                        <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>Приготовление пищи</p>
                        <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>Детская гигиена</p>
                        <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>Сопровождение детей</p>
                        <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>Поддержание порядка</p>
                        <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>Стирка и глажка детской одежды</p>
                    </div>
                </div>
                <div className='row empty col-xs-12 col-md-12 col-lg-12 '>

                </div>
                {authorized ?
                    <div className='row flex col-xs-12 col-md-12 col-lg-12'>
                        <p className='bold-text-info col-xs-6 col-md-6 col-lg-3'>+7 916 500 50 50</p>
                        <p className='bold-text-info col-xs-6 col-md-6 col-lg-3'>ivanovae@gmail.com</p>
                    </div>
                    :
                    <div className='row flex-end col-xs-12 col-md-12 col-lg-12'>
                        <button className='img-button'>
                            Получить контакт
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default MoreDetails;