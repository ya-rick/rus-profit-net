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
        this.onChangeContacts = this.onChangeContacts.bind(this);
    }

    state = {
        agree: false,
        nameContact: {
            user_surname_r: '', 
            user_name_r: '', 
            user_email_r: '', 
            user_password_r: '', 
            user_password_confirm_r: '',
            user_country_r: '',
            user_city_r: '',
            user_phone_r: '',
            user_whatsapp_r: '',
            user_viber_r: '',
            user_telegram_r: '',
        },
        generalInformation: {
            birthday_r: '',
            image_r: null
        },

    }

    onChangeContacts(key) {
        return (e) => {
            const value = e.target.value;
            const newContacts = {...this.state.nameContact, [key]: value};
            this.setState({ nameContact: newContacts });
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
        const { generalInformation, nameContact } = this.state;

        requestWithFormData('registerQuestionary', {
            ...generalInformation,
            image_r: this.context.imgFile,
            ...nameContact}
        );
    }

    render() {
        const {agree} = this.state;
        return (
            <div className='container'>
                <div className='container'>
                    <h1 className='vacancies'>Регистрация анкеты</h1>
                </div>
                <NameContact
                    onChangeContacts={this.onChangeContacts}
                    contacts={this.state.nameContact}/>
                <div className='container'>
                    <h2 className='contacts col-12'>Общие данные</h2>
                </div>
                <GeneralInformation onChangeDate={this.onChangeDate} />
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
