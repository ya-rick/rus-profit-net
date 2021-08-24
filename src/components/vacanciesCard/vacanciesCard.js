import React, {Component} from 'react';
import './vacanciesCard.css';
import Like from "../like";
import Plus from "../plus";

export default class VacanciesCard extends Component {

    state = {
        like: false
    }

    onLike = () => {
        const {like} = this.state;
        this.setState({like: !like});
    };

    render() {
        const {like} = this.state;
        const { vacancy: { category, city, country, experience, parameters, salary, salary_type, description } } = this.props;
        return (
            <div className='card-v'>
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