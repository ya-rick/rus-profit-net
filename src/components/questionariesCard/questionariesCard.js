import React, {Component} from "react";
import Avatar from '../../images/card-avatar.png';
import './questionariesCard.css';
import Hand from "../hand";
import Like from "../like";
import Plus from "../plus";
import {Redirect} from "react-router-dom";

export default class QuestionariesCard extends Component {

    state = {
        mark: 3,
        activeHand: null,
        like: false,
        isRedirecting: false
    };

    setRedirectingTrue=()=>{
        this.setState({isRedirecting: true})
    }


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

    onLike = () => {
        const {like} = this.state;
        this.setState({like: !like});
    };

    render() {
        const {mark, activeHand, like} = this.state;

        const { resume: {id, category, city, country, experience, parameters,
            salary, salary_type, description, name, avatar } } = this.props;

        if (this.state.isRedirecting) {
            return <Redirect to={`/questionnaire/${id}`}/>
        }

        const likes = this.getLikes(activeHand ? activeHand : mark);
        return (
            <div className='card' onClick={this.setRedirectingTrue}>
                <div className='col-xs-12 col-md-4 col-lg-3'>
                    <img className='avatar' src={avatar} alt='аватар'/>
                    <div className='wrap-box'>
                        {likes}
                    </div>
                </div>
                <div className='col-xs-12 col-md-8 col-lg-9'>
                    <div className='header-card'>
                        <div className='card-name'>
                            <p className='name-text-q'>
                                {name}
                            </p>
                            <Like clazz={like} click={this.onLike}/>
                        </div>
                        <Plus/>
                    </div>
                    <div className='wrap-box'>
                        <p className='text-options'>Опыт {experience} лет</p>
                        <p className='text-options'>{parameters[0].name}</p>
                        <p className='text-options'>{salary}$ {salary_type}</p>
                    </div>
                    <p className='name-text-block start-content'>О себе</p>
                    <div className='border-block-q'>
                        <p className='main-text'>{description}</p>
                    </div>
                </div>
            </div>
        );
    };
};