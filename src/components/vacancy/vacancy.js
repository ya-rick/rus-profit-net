import React, {Component} from 'react';
import Share from '../../images/share.svg';
import './vacancy.css';
import Like from "../like";
import MoreDetails from "../moreDetails";

export default class Vacancy extends Component{

    state={
        authorized: true
    }

    render() {
        return(
            <div className='container'>
                <div className='vacancy-head'>
                    <div className='vacancy-head-left'>
                        <h1>Семья из Австрии ищет няню</h1>
                        <div className='margin-right-10 margin-top-7'>
                            <Like/>
                        </div>
                        <img className='heart margin-right-10 margin-top-7' src={Share} alt='share'/>
                    </div>
                    <button className='img-reg-button'>
                        Вернуться к списку
                    </button>
                </div>
                <div className='card-va'>
                    <div className='col-xs-12 col-md-12 col-lg-6'>
                        <p className='bold-text-info container row'>1500 евро в месяц</p>
                        <p className='bold-text-info container row'>Без проживания, частичная занятость</p>
                        <div className='row flex'>
                            <p className='bold-text-info col-xs-6 col-md-6 col-lg-6'>Работодатель:</p>
                            <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>Екатерина</p>
                        </div>
                        <div className='row flex'>
                            <p className='bold-text-info col-xs-6 col-md-6 col-lg-6'>Дата публикации:</p>
                            <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>23.06.2020</p>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-12 col-lg-6'>
                        <div className='row flex'>
                            <p className='bold-text-info col-xs-6 col-md-6 col-lg-6'>Город:</p>
                            <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>Австрия, Вена</p>
                        </div>
                        <div className='row flex'>
                            <p className='bold-text-info col-xs-6 col-md-6 col-lg-6'>Родной язык:</p>
                            <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>Русский</p>
                        </div>
                        <div className='row flex'>
                            <p className='bold-text-info col-xs-6 col-md-6 col-lg-6'>Документы:</p>
                            <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>Вид на жительство</p>
                        </div>
                        <div className='row flex'>
                            <p className='bold-text-info col-xs-6 col-md-6 col-lg-6'>Опыт работы:</p>
                            <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>6 лет</p>
                        </div>
                    </div>
                </div>
                <div className='card-va'>
                    <h2 className='description container'>Описание вакансии</h2>
                    <div className='text-description container'>
                        Здравствуйте, мы ищем добрую няню и одновременно помощницу по дому.
                        Нашим дочкам 1.6 года и 4 месяца.
                        Вы должны очень любить детей, и иметь опыт работы с малышами либо иметь своих собственных детей.
                        Нам очень важно найти человека который будет со всей любовью относиться к нашим девочкам.
                        Здравствуйте, мы ищем добрую няню и одновременно помощницу по дому.
                        Нашим дочкам 1.6 года и 4 месяца.
                        Вы должны очень любить детей, и иметь опыт работы с малышами либо иметь своих собственных детей.
                        Нам очень важно найти человека который будет со всей любовью относиться к нашим девочкам.
                        Здравствуйте, мы ищем добрую няню и одновременно помощницу по дому.
                        Нашим дочкам 1.6 года и 4 месяца.
                        Вы должны очень любить детей, и иметь опыт работы с малышами либо иметь своих собственных детей.
                        Нам очень важно найти человека который будет со всей любовью относиться к нашим девочкам.
                    </div>
                </div>
                <MoreDetails authorized={false}/>
            </div>
        );
    };
};