import React, {Component} from "react";
import './questionnaires.css';
import QuestionariesCard from "../questionariesCard/questionariesCard";

export default class Questionnaires extends Component{
    render() {
        return(
            <div className='container'>
                <h1 className='questionaries'>Анкеты</h1>
                <QuestionariesCard/>
                <QuestionariesCard/>
                <QuestionariesCard/>
                <QuestionariesCard/>
            </div>
        );
    }
};
