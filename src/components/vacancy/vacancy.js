import React, {useEffect, useState} from 'react';
import Share from '../../images/share.svg';
import './vacancy.css';
import Like from "../like";
import MoreDetails from "../moreDetails";
import {requestWithParams} from "../../api/exchangeLayer";
import {useParams} from "react-router";

const Vacancy = () => {
    const [vacancy, setVacancy] = useState({});
    const {id} = useParams();
    useEffect(() => {
            requestWithParams('getVacancyByID', {
                vacancy_id: id
            })
            .then(res=> {
                setVacancy({
                    category: res.vacancy[0].category || '',
                    description: res.vacancy[0].description || '',
                    experience: res.vacancy[0].experience || '',
                    docs: res.vacancy[0].parameters[0].options || '',
                    schedule:  res.vacancy[0].parameters[1].options || '',
                    native_language: res.vacancy[0].parameters[2].options[0].name || '',
                    foreign_language: res.vacancy[0].parameters[3].options || '',
                    education: res.vacancy[0].parameters[4].options || '',
                    responsibilities: res.vacancy[0].parameters[5].options || '',
                    salary: res.vacancy[0].salary || '',
                    salary_type: res.vacancy[0].salary_type || '',
                    places: [`${res.vacancy[0].places[0].country_name}, ${res.vacancy[0].places[0].cities[0].name}` || '',
                        `${res.vacancy[0].places[1].country_name}, ${res.vacancy[0].places[1].cities[0].name}` || '',
                        `${res.vacancy[0].places[2].country_name}, ${res.vacancy[0].places[2].cities[0].name}` || '',]
                });
            }).then()
            .catch(e=>console.error(e));
        }
    ,[]);

    console.log(vacancy);
    return (
        <div className='container'>
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
                        <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>{vacancy.docs && vacancy.docs.map((item)=><p className='light-text-info col-xs-12 col-md-12 col-lg-12'>{item}</p>)}</p>
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
    );
};

export default Vacancy;