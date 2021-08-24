import React, {Component} from 'react';
import './registerVacancies.css';
import NameContact from "../nameContact/nameContact";
import WorkCluster from "../workCluster";
import RegisterFilterVacation from "../registerFilterVacation";
import MenuButtonsDocs from "../menuButtonsDocs";
import TextArea from "../textArea";
import CheckBox from "../checkbox";
import LinkedButton from "../../common/components/LinkedButton";

export default class RegisterVacancies extends Component {

    state = {
        agree: false
    }

    Check = () => {
        const {agree} = this.state;
        this.setState({agree: !agree});
    }

    Save = () =>{

    }

    render() {
        const {agree} = this.state;
        return (
            <div className='container'>
                <div className='container'>
                    <h1 className='vacancies'>Регистрация вакансии</h1>
                </div>
                <NameContact/>
                <div className='container'>
                    <h2 className='contacts col-12'>Кого вы ищете</h2>
                </div>
                <WorkCluster/>
                <RegisterFilterVacation/>
                <MenuButtonsDocs/>
                <div className='container'>
                    <h2 className='contacts col-12'>Описание вакансии*</h2>
                </div>
                <TextArea/>
                <div className='container'>
                    <div className='display-right'>
                        <CheckBox isChecked={agree} check={this.Check}>
                            <p className='agree'>
                                Я согласен с условиями оказания услуг и с политикой <br/>
                                конфиденциальности в отношении обработки персональных<br/>
                                данных
                            </p>
                        </CheckBox>
                    </div>
                </div>
                <div className='container center margin-top-15'>
                    <LinkedButton>
                        Сохранить вакансию
                    </LinkedButton>
                </div>
                <div className='container'>
                    <p className='reg-intro'>*Поля, обязательные для заполнения</p>
                </div>
            </div>
        )
    }
}
