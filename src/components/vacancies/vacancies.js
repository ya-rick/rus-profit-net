import React, {Component} from 'react';
import './vacancies.css';
import VacanciesCard from "../vacanciesCard";
import { SearchResultContext } from '../mainPage/contexts';

class Vacancies extends Component{
    render() {
        const { results: vacancies } = this.context;
        console.log(vacancies);

        return(
            <div className='container vac-contain'>
                <h1 className='vacancies'>Вакансии</h1>
                {vacancies && vacancies.map(vacancy => <VacanciesCard
                    key={vacancy.id}
                    vacancy={vacancy}
                />)}
            </div>
        );
    };
};

Vacancies.contextType = SearchResultContext;

export default Vacancies;
