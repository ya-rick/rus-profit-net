import { Component } from 'react';
import './registerQuestionaries.css';
import NameContact from "../nameContact/nameContact";
import WorkCluster from "../workCluster";
import MenuButtonsDocs from "../menuButtonsDocs";
import TextArea from "../textArea";
import CheckBox from "../checkbox";
import RegisterFilterQuestionaries from "../registerFilterQuestionaries/registerFilterQuestionaries";
import GeneralInformation from "../generalInformation";
import { PhotoContext } from "../mainPage/contexts";
import { requestWithFormData, requestWithParams } from '../../api/exchangeLayer';
import LinkedButton from "../../common/components/LinkedButton";

class RegisterQuestionaries extends Component {

    constructor() {
        super();

        this.onChangeDate = this.onChangeDate.bind(this);
        this.sendData = this.sendData.bind(this);
        this.onChangeContacts = this.onChangeContacts.bind(this);
        this.onChangeRestData = this.onChangeRestData.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.restData.category_global !== this.state.restData.category_global) && (this.state.restData.category_global !== null)) {
            requestWithParams('getFiltersByProfession', { value: this.state.restData.category_global })
                .then(data => this.setState({ categories: data.category }));
        }
    }

    state = {
        agree: false,
        nameContact: {
            user_surname: '', 
            user_name: '', 
            user_email: '', 
            user_password: '', 
            user_password_confirm: '',
            user_country: '',
            user_city: '',
            user_phone: '',
            user_whatsapp: '',
            user_viber: '',
            user_telegram: '',
        },
        generalInformation: {
            birthday: '',
            image: null
        },
        restData: {
            category_global: null,
            experience: null,
            salary: null,
            salary_type: null,
            description: '',
            result_cat: []
        },
        categories: null
    }

    onChangeContacts(key) {
        return (e) => {
            const value = e.target.value;
            const newContacts = {...this.state.nameContact, [key]: value};
            this.setState({ nameContact: newContacts });
        }
        
    }

    onChangeRestData(key) {
        return (newValue) => {
            let newRestData;
            
            newRestData = {...this.state.restData, [key]: newValue};

            this.setState({ restData: newRestData });
        }
        
    }

    check = () => {
        const {agree} = this.state;
        this.setState({agree: !agree});
    }

    onChangeDate(newDate) {
        this.setState({ generalInformation: { ...this.state.generalInformation, birthday: newDate } })
    }

    validate() {
        return this.state.agree;
    }

    sendData() {
        const { generalInformation, nameContact, restData } = this.state;

        if (!this.validate()) return;

        let requestData = Object.entries({...restData, ...nameContact, ...generalInformation, image: this.context.imgFile}).reduce((acc, [key, value]) => {
            acc[key + '_r'] = value;
            return acc;
        }, {})

        requestWithFormData('registerQuestionary', requestData)
            .catch(e => console.error(e));
    }

    render() {
        const { agree } = this.state;

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
                <WorkCluster
                    onProfessionChanged={this.onChangeRestData('category_global')}
                />
                <RegisterFilterQuestionaries
                    onChangeData={this.onChangeRestData}
                    data={this.state.restData}
                />
                {this.state.categories && <MenuButtonsDocs
                        categories={this.state.categories}
                        selectedParameters={this.state.restData.result_cat}
                        onCheckChanged={this.onChangeRestData('result_cat')}/>}
                <div className='container'>
                    <h2 className='contacts col-12'>О себе*</h2>
                </div>
                <TextArea
                    value={this.state.restData.description}
                    onChange={this.onChangeRestData('description')}
                />
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
                    <LinkedButton onClick={this.sendData} >
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

RegisterQuestionaries.contextType = PhotoContext;

export default RegisterQuestionaries;
