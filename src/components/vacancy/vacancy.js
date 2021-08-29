import React, {useEffect, useState} from 'react';
import Share from '../../images/share.svg';
import './vacancy.css';
import Like from "../like";
import MoreDetails from "../moreDetails";
import {requestWithParams} from "../../api/exchangeLayer";
import {useParams} from "react-router";

const Vacancy = () => {
    const [vacancy, setVacancy] = useState(null);

    const {id} = useParams();

    useEffect(() => {
            requestWithParams('getVacancyByID', {
                vacancy_id: id
            })
                .then(res => {
                    const fromServerVacancy = res.vacancy[0]

                    setVacancy({
                        category: fromServerVacancy.category || '',
                        description: fromServerVacancy.description || '',
                        experience: fromServerVacancy.experience || '',
                        docs: fromServerVacancy.parameters[0].options || '',
                        schedule:  fromServerVacancy.parameters[1].options || '',
                        native_language: fromServerVacancy.parameters[2].options[0].name || '',
                        foreign_language: fromServerVacancy.parameters[3].options || '',
                        education: fromServerVacancy.parameters[4].options || '',
                        responsibilities: fromServerVacancy.parameters[5].options || '',
                        salary: fromServerVacancy.salary || '',
                        salary_type: fromServerVacancy.salary_type || '',
                        places: [`${fromServerVacancy.places[0].country_name}, ${fromServerVacancy.places[0].cities[0].name}` || '',
                            `${fromServerVacancy.places[1].country_name}, ${fromServerVacancy.places[1].cities[0].name}` || '',
                            `${fromServerVacancy.places[2].country_name}, ${fromServerVacancy.places[2].cities[0].name}` || '',]
                    });
                })
                .catch(e=>console.error(e));
        }
    , []);

    console.log(vacancy);
    return (
        vacancy ? <div className='container'>
            <div className='vacancy-head'>
                <div className='vacancy-head-left'>
                    <h1>{vacancy.category}</h1>
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
                    <p className='bold-text-info container row'>{vacancy.salary} {vacancy.salary_type}</p>
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
                        <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>{
                            vacancy.places && vacancy.places.map((item)=><p className='light-text-info col-xs-12 col-md-12 col-lg-12'>{item}</p>)
                        }</p>
                    </div>
                    <div className='row flex'>
                        <p className='bold-text-info col-xs-6 col-md-6 col-lg-6'>Родной язык:</p>
                        <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>{vacancy.native_language}</p>
                    </div>
                    <div className='row flex'>
                        <p className='bold-text-info col-xs-6 col-md-6 col-lg-6'>Документы:</p>
                        {vacancy.docs && vacancy.docs.map((item)=><p className='light-text-info col-xs-12 col-md-12 col-lg-12'>{item.name}</p>)}
                    </div>
                    <div className='row flex'>
                        <p className='bold-text-info col-xs-6 col-md-6 col-lg-6'>Опыт работы:</p>
                        <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>{vacancy.experience}</p>
                    </div>
                </div>
            </div>
            <div className='card-va'>
                <h2 className='description container'>Описание вакансии</h2>
                <div className='text-description container'>
                    {vacancy.description}
                </div>
            </div>
            <MoreDetails authorized={false}/>
        </div>
        : 'Загрузка...'
    );
};

export default Vacancy;