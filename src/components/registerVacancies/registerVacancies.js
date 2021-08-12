import React, {Component} from 'react';
import './registerVacancies.css';
import NameContact from "../nameContact/nameContact";

export default class RegisterVacancies extends Component {
    render() {
        return (
            <div className='container'>
                <div className='container'>
                    <h1 className='vacancies'>Регистрация вакансии</h1>
                </div>
                <NameContact/>
            </div>
        )
    }
}
