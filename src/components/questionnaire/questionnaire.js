import React, {useEffect, useState} from 'react';
import './questionnaire.css';
import Like from "../like";
import Share from "../../images/share.svg";
import MoreDetails from "../moreDetails";
import Avatar from '../../images/avatar.png';
import Hand from "../hand";
import {requestWithParams} from "../../api/exchangeLayer";
import {useParams} from "react-router";

export default function Questionnaire() {

    const [state, setState] = useState({
        id: '',
        mark: 3,
        activeHand: null,
        like: false
    });

    const [resume, setResume] = useState(null);

    const {id} = useParams();

    useEffect(() => {
            requestWithParams('getResumeByID', {
                resume_id: id
            })
                .then(res=> {
                    const fromServerResume = res.resume[0];
                    console.log(res);
                    setResume({
                        category: fromServerResume.name || '',
                        description: fromServerResume.description || '',
                        experience: fromServerResume.experience || '',
                        avatar: fromServerResume.avatar || Avatar,
                        docs: fromServerResume.parameters[0].options || [],
                        schedule:  fromServerResume.parameters[1].options || [],
                        native_language: fromServerResume.parameters[2].options[0].name || [],
                        foreign_language: fromServerResume.parameters[3].options || [],
                        education: fromServerResume.parameters[4].options || '',
                        responsibilities: fromServerResume.parameters[5].options || [],
                        salary: fromServerResume.salary,
                        salary_type: fromServerResume.salary_type || '',
                        places: [`${fromServerResume.places[0].country_name}, ${fromServerResume.places[0].cities[0].name}` || '',
                            `${fromServerResume.places[1].country_name}, ${fromServerResume.places[1].cities[0].name}` || '',
                            `${fromServerResume.places[2].country_name}, ${fromServerResume.places[2].cities[0].name}` || '',]
                    });
                })
                .catch(e=>console.error(e));
        }, []);

    console.log(resume);

    const getLikes = (numb) => {
        const likes = [];
        for (let i = 1; i < 6; i++) {
            if (i <= numb) {
                likes[i] =
                    <Hand key={i} keys={i} onDeactive={onHandDeactive} onActive={(i) => onHandActive(i)}
                          onMark={(i) => onMark(i)} clazz='hand-active'/>;
            } else {
                likes[i] =
                    <Hand key={i} keys={i} onDeactive={onHandDeactive} onActive={(i) => onHandActive(i)}
                          onMark={(i) => onMark(i)} clazz='hand'/>;
            }
        }
        return likes;
    };


    const onHandActive = (numb) => {
        setState({activeHand: numb});
    }

    const onHandDeactive = () => {
        setState({activeHand: null});
    }

    const onMark = (numb) => {
        setState({mark: numb});
    };

    const {mark, activeHand} = state;

    const likes = getLikes(activeHand ? activeHand : mark);

    return (
        resume ? <div className='container'>
            <div className='vacancy-head'>
                <div className='vacancy-head-left'>
                    <h1>{resume.category}</h1>
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
                        <img className='col-xs-8 col-md-8 col-lg-8 image' src={resume.avatar} alt='аватар'/>
                        <div className='wrap-box margin-bottom'>
                            {likes}
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-6'>
                        <div className='name-questionnaire col-xs-6 col-md-6 col-lg-6 margin-bottom'>
                            Няня-домработница
                        </div>
                        <div className='col-xs-12 col-md-12 col-lg-12'>
                            <p className='bold-text-info container row margin-bottom'>{resume.salary} {resume.salary_type}</p>
                            <p className='bold-text-info container row margin-bottom'>{resume.schedule.map(item => item.name)}</p>
                            <div className='row flex margin-bottom'>
                                <p className='bold-text-info col-xs-6 col-md-6 col-lg-6'>Город:</p>
                                <p className='light-text-info col-xs-6 col-md-6 col-lg-6 flex-row'>{
                                    resume.places && resume.places.map((item)=><p className='light-text-info col-xs-12 col-md-12 col-lg-12'>{item}</p>)
                                }</p>
                            </div>
                            <div className='row flex margin-bottom'>
                                <p className='bold-text-info col-xs-6 col-md-6 col-lg-6'>Родной язык:</p>
                                <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>{resume.native_language}</p>
                            </div>
                            <div className='row flex margin-bottom'>
                                <p className='bold-text-info col-xs-6 col-md-6 col-lg-6'>Документы:</p>
                                <p className='light-text-info col-xs-6 col-md-6 col-lg-6 flex-row'>{
                                    resume.docs && resume.docs.map((item)=><p className='light-text-info col-xs-12 col-md-12 col-lg-12'>{item.name}</p>)
                                }</p>
                            </div>
                            <div className='row flex margin-bottom'>
                                <p className='bold-text-info col-xs-6 col-md-6 col-lg-6'>Опыт работы:</p>
                                <p className='light-text-info col-xs-6 col-md-6 col-lg-6'>{resume.experience}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className='text-description'>
                        {resume.description}
                    </div>
                </div>
            </div>
            <MoreDetails education={resume.education} foreign_language={resume.foreign_language} responsibilities={resume.responsibilities} authorized={true}/>
        </div>
        : 'Загрузка...'
    );
};
