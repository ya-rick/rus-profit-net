import React, {Component} from 'react';
import './vacancies.css';
import VacanciesCard from "../vacanciesCard";

export default class Vacancies extends Component{
    render() {
        return(
            <div className='container vac-contain'>
                <h1 className='vacancies'>Вакансии</h1>
                <VacanciesCard/>
                <VacanciesCard/>
                <VacanciesCard/>
            </div>
        );
    };
};
