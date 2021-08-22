import React, {Component} from 'react';
import './questionnaire.css';
import Like from "../like";
import Share from "../../images/share.svg";
import MoreDetails from "../moreDetails";
import Avatar from '../../images/card-avatar.png';
import Hand from "../hand";

export default class Questionnaire extends Component{

    state = {
        mark: 3,
        activeHand: null,
        like: false
    };

    getLikes = (numb) => {
        const likes = [];
        for (let i = 1; i < 6; i++) {
            if (i <= numb) {
                likes[i] =
                    <Hand key={i} keys={i} onDeactive={this.onHandDeactive} onActive={(i) => this.onHandActive(i)}
                          onMark={(i) => this.onMark(i)} clazz='hand-active'/>;
            } else {
                likes[i] =
                    <Hand key={i} keys={i} onDeactive={this.onHandDeactive} onActive={(i) => this.onHandActive(i)}
                          onMark={(i) => this.onMark(i)} clazz='hand'/>;
            }
        }
        return likes;
    };

    onHandActive = (numb) => {
        this.setState({activeHand: numb});
    }

    onHandDeactive = () => {
        this.setState({activeHand: null});
    }

    onMark = (numb) => {
        this.setState({mark: numb});
    };

    render() {
        const {mark, activeHand} = this.state;
        const likes = this.getLikes(activeHand ? activeHand : mark);
        return(
            <div className='container'>
                <div className='vacancy-head'>
                    <div className='vacancy-head-left'>
                        <h1>Анна, 34</h1>
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
                    <div className='container'>
                        <div className='col-xs-12 col-md-6 col-lg-6 center-img'>
                            <img className='col-xs-8 col-md-8 col-lg-8' src={Avatar} alt='аватар'/>
                            <div className='wrap-box margin-bottom'>
                                {likes}
                            </div>
                        </div>
                        <div className='col-xs-12 col-md-6 col-lg-6'>
                            <div className='name-questionnaire col-xs-6 col-md-6 col-lg-6 margin-bottom'>
                                Няня-домработница
                            </div>
                            <div className='col-xs-12 col-md-12 col-lg-12'>
                                <p className='bold-text-info container row margin-bottom'>1500 евро в месяц</p>
                                <p className='bold-text-info container row margin-bottom'>Без проживания, частичная занятость</p>
                                <div className='row flex margin-bottom'>
                                    <p className='bold-text-info col-xs-6 col-md-6 col-lg-6'>Город:</p>
                                    <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>Австрия, Вена</p>
                                </div>
                                <div className='row flex margin-bottom'>
                                    <p className='bold-text-info col-xs-6 col-md-6 col-lg-6'>Родной язык:</p>
                                    <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>Русский</p>
                                </div>
                                <div className='row flex margin-bottom'>
                                    <p className='bold-text-info col-xs-6 col-md-6 col-lg-6'>Документы:</p>
                                    <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>Вид на жительство</p>
                                </div>
                                <div className='row flex margin-bottom'>
                                    <p className='bold-text-info col-xs-6 col-md-6 col-lg-6'>Опыт работы:</p>
                                    <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>6 лет</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='text-description'>
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
                </div>
                <MoreDetails authorized={true}/>
            </div>
        );
    };
};
