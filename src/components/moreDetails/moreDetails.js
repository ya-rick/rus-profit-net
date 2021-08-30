import React from 'react';
import './moreDetails.css';

const MoreDetails = ({authorized, education, foreign_language, responsibilities})=>{

    return(
        <div className='card-va container'>
            <h2 className='description container'>Подробнее</h2>
            <div className='container'>
                <div className='row flex col-xs-12 col-md-12 col-lg-12'>
                    <p className='bold-text-info col-xs-6 col-md-6 col-lg-3'>Знание языков:</p>
                    <p className='light-text-info col-xs-6 col-md-6 col-lg-9'>{foreign_language.map((item)=><span className='light-text-info'>{`${item.name}. `}</span>)}</p>
                </div>
                <div className='row flex col-xs-12 col-md-12 col-lg-12'>
                    <p className='bold-text-info col-xs-6 col-md-6 col-lg-3'>Образование:</p>
                    <p className='light-text-info col-xs-6 col-md-6 col-lg-9'>{education.map((item)=><span className='light-text-info'>{`${item.name}. `}</span>)}</p>
                </div>
                <div className='row flex col-xs-12 col-md-12 col-lg-12'>
                    <p className='bold-text-info col-xs-6 col-md-6 col-lg-3'>Обязанности:</p>
                    <div className='col-xs-6 col-md-6 col-lg-6 margin-left-10'>
                        {responsibilities.map((item)=> <p className='light-text-info col-xs-12 col-md-12 col-lg-6'>{item.name}</p>)}
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