import React, {Component} from "react";
import './questionnaires.css';
import QuestionariesCard from "../questionariesCard/questionariesCard";
import { SearchResultContext } from "../mainPage/contexts";

class Questionnaires extends Component{
    render() {
        const { results: resumes } = this.context;

        console.log(resumes)

        return(
            <div className='container'>
                <h1 className='questionaries'>Анкеты</h1>
                {resumes && resumes.map(resume => <QuestionariesCard
                    key={resumes.id}
                    resume={resume}
                />)}
            </div>
        );
    }
};

Questionnaires.contextType = SearchResultContext;

export default Questionnaires;
