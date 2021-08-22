import React, {Component} from 'react';
import './registerQuestionaries.css';
import NameContact from "../nameContact/nameContact";
import WorkCluster from "../workCluster";
import MenuButtonsDocs from "../menuButtonsDocs";
import TextArea from "../textArea";
import CheckBox from "../checkbox";
import RegisterFilterQuestionaries from "../registerFilterQuestionaries/registerFilterQuestionaries";
import GeneralInformation from "../generalInformation";

export default class RegisterQuestionaries extends Component {

    state = {
        agree: false
    }

    check = () => {
        const {agree} = this.state;
        this.setState({agree: !agree});
    }

    verify = ()=>{
        this.props.onGetId(3);
    }

    render() {
        const {agree} = this.state;
        return (
            <div className='container'>
                <div className='container'>
                    <h1 className='vacancies'>Регистрация анкеты</h1>
                </div>
                <NameContact/>
                <div className='container'>
                    <h2 className='contacts col-12'>Общие данные</h2>
                </div>
                <GeneralInformation photo={this.props.photo} img={this.props.img} getPhoto = {this.props.onGetId}/>
                <div className='container'>
                    <h2 className='contacts col-12'>Какую работу вы ищете</h2>
                </div>
                <WorkCluster/>
                <RegisterFilterQuestionaries/>
                <MenuButtonsDocs/>
                <div className='container'>
                    <h2 className='contacts col-12'>О себе*</h2>
                </div>
                <TextArea/>
                <div className='container'>
                    <div className='display-right'>
                        <CheckBox isChecked={agree} check={this.check}>
                            <p className='agree'>
                                Я согласен с условиями оказания услуг и с политикой <br/>
                                конфиденциальности в отношении обработки персональных<br/>
                                данных
                            </p>
                        </CheckBox>
                    </div>
                </div>
                <div className='container center margin-top-15'>
                    <button className='img-reg-button' onClick={()=> this.verify()} >
                        Сохранить вакансию
                    </button>
                </div>
                <div className='container'>
                    <p className='reg-intro'>*Поля, обязательные для заполнения</p>
                </div>
            </div>
        )
    }
}