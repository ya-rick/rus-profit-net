import React, {Component} from 'react';
import './registerVacancies.css';
import NameContact from "../nameContact/nameContact";
import WorkCluster from "../workCluster";
import RegisterFilterVacation from "../registerFilterVacation";
import MenuButtonsDocs from "../menuButtonsDocs";
import TextArea from "../textArea";
import CheckBox from "../checkbox";
import { requestWithFormData, requestWithParams } from '../../api/exchangeLayer';

export default class RegisterVacancies extends Component {

    constructor() {
        super();

        this.onChangeContacts = this.onChangeContacts.bind(this);
        this.onChangeRestData = this.onChangeRestData.bind(this);
        this.sendData = this.sendData.bind(this);
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
        restData: {
            category_global: null,
            experience: null,
            salary: null,
            salary_type: null,
            description: '',
            result_cat: [],
            years_with: 18,
            years_to: 60,
            name: '',
        },
        categories: null
    }

    Check = () => {
        const {agree} = this.state;
        this.setState({agree: !agree});
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

            if (key === 'years') {
                newRestData = {...this.state.restData, years_with: newValue[0], years_to: newValue[1]};
            } else {
                newRestData = {...this.state.restData, [key]: newValue};
            }

            this.setState({ restData: newRestData });
        }
        
    }

    validate() {
        return this.state.agree;
    }

    sendData() {
        const { restData, nameContact } = this.state;

        if (!this.validate()) return;

        let requestData = Object.entries({...restData, ...nameContact}).reduce((acc, [key, value]) => {
            acc[key + '_v'] = value;
            return acc;
        }, {})

        requestWithFormData('registerVacancy', requestData)
            .catch(e => console.error(e));
    }

    render() {
        const {agree} = this.state;
        return (
            <div className='container'>
                <div className='container'>
                    <h1 className='vacancies'>Регистрация вакансии</h1>
                </div>
                <NameContact
                    onChangeContacts={this.onChangeContacts}
                    contacts={this.state.nameContact}/>
                <div className='container'>
                    <h2 className='contacts col-12'>Кого вы ищете</h2>
                </div>
                <WorkCluster
                    onProfessionChanged={this.onChangeRestData('category_global')}
                />
                <RegisterFilterVacation
                    onChangeData={this.onChangeRestData}
                    data={this.state.restData}
                />
                {this.state.categories && <MenuButtonsDocs
                        categories={this.state.categories}
                        selectedParameters={this.state.restData.result_cat}
                        onCheckChanged={this.onChangeRestData('result_cat')}/>}
                <div className='container'>
                    <h2 className='contacts col-12'>Описание вакансии*</h2>
                </div>
                <TextArea
                    value={this.state.restData.description}
                    onChange={this.onChangeRestData('description')}
                />
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
                    <button
                        className='img-reg-button'
                        onClick={this.sendData}
                    >
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
