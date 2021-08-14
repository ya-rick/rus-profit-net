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
        return (
            <div className='card-v'>
                <div className='header-card'>
                    <div className='card-name'>
                        <div className='name-text'>
                            <p className='text-job'>
                                Няня
                            </p>
                            <p className='text-city'>
                                Австрия, Вена
                            </p>
                        </div>
                        <Like clazz={like} click={this.onLike}/>
                    </div>
                    <Plus/>
                </div>
                <div className='wrap-box'>
                    <p className='text-options'>Опыт 6 лет</p>
                    <p className='text-options'>Паспорт ЕС</p>
                    <p className='text-options'>10$ в час</p>
                </div>
                <p className='name-text-block start-content'>Описание вакансии</p>
                <div className='border-block'>
                    <p className='main-text'>Здравствуйте, мы ищем добрую няню и одновременно помощницу по дому. Нашим
                        дочкам 1.6 года и 4 месяца. Вы должны очень любить детей, и иметь опыт работы с малышами либо
                        иметь своих собственных детей. Нам очень важно найти человека который будет со всей любовью
                        относиться к нашим девочкам. Здравствуйте, мы ищем добрую няню и одновременно помощницу по дому.
                        Нашим дочкам 1.6 года и 4 месяца......</p>
                </div>
            </div>
        );
    };
};