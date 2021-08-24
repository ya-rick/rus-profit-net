import { Component, createContext } from 'react';
import './registerQuestionaries.css';
import NameContact from "../nameContact/nameContact";
import WorkCluster from "../workCluster";
import MenuButtonsDocs from "../menuButtonsDocs";
import TextArea from "../textArea";
import CheckBox from "../checkbox";
import RegisterFilterQuestionaries from "../registerFilterQuestionaries/registerFilterQuestionaries";
import GeneralInformation from "../generalInformation";
import { PhotoContext } from "../mainPage/contexts";
import { requestWithFormData } from '../../api/exchangeLayer';

class RegisterQuestionaries extends Component {

    constructor() {
        super();

        this.onChangeDate = this.onChangeDate.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    state = {
        agree: false,
        generalInformation: {
            birthday_r: '',
            image_r: null
        }
    }

    check = () => {
        const {agree} = this.state;
        this.setState({agree: !agree});
    }

    onChangeDate(newDate) {
        this.setState({ generalInformation: { birthday_r: newDate } })
    }

    sendData() {
        requestWithFormData('registerQuestionary', {...this.state.generalInformation, image_r: this.context.img});
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
                <GeneralInformation onChangeDate={this.onChangeDate}/>
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
                    <button className='img-reg-button' onClick={this.sendData} >
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

RegisterQuestionaries.contextType = PhotoContext;

export default RegisterQuestionaries;
