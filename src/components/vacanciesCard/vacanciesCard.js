import React, {Component} from 'react';
import './vacanciesCard.css';
import Like from "../like";
import Plus from "../plus";
import {Redirect, useHistory} from "react-router-dom";

const openCard = () => {
    const history = new useHistory();
    history.push('/vacancy');
};

export default class VacanciesCard extends Component {

    state = {
        like: false,
        isRedirecting: false
    }

    onLike = () => {
        const {like} = this.state;
        this.setState({like: !like});
    };

    setRedirectToTrue() {
        this.setState({ isRedirecting: true });
    }

    render() {
        const {like} = this.state;
        const { vacancy: { id, category, city, country, experience, parameters, salary, salary_type, description } } = this.props;
        if (this.state.isRedirecting) {
            return <Redirect to={`/vacancy/${id}`}/>
        }
        return (
            <div className='card-v' onClick={()=> this.setRedirectToTrue()}>
                <div className='header-card'>
                    <div className='card-name'>
                        <div className='name-text'>
                            <p className='text-job'>
                                {category}
                            </p>
                            <p className='text-city'>
                                { `${country}, ${city}` }
                            </p>
                        </div>
                        <Like clazz={like} click={this.onLike}/>
                    </div>
                    <Plus/>
                </div>
                <div className='wrap-box'>
                    <p className='text-options'>Опыт {experience} лет</p>
                    <p className='text-options'>{parameters[0].name}</p>
                    <p className='text-options'>{salary} {salary_type}</p>
                </div>
                <p className='name-text-block start-content'>Описание вакансии</p>
                <div className='border-block'>
                    <p className='main-text'>{description}</p>
                </div>
            </div>
        );
    };
};