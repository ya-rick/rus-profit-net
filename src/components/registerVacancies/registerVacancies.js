import React, {Component} from 'react';
import './registerVacancies.css';
import NameContact from "../nameContact/nameContact";
import WorkCluster from "../workCluster";
import RegisterFilterVacation from "../registerFilterVacation";
import MenuButtonsDocs from "../menuButtonsDocs";
import TextArea from "../textArea";
import CheckBox from "../checkbox";
import { requestWithFormData, requestWithParams } from '../../api/exchangeLayer';
import CommonButton from "../../common/components/CommonButton";
import { bindValidator, getErrorMessage, validateAll, validationTypes } from '../../common/validate';
import ErrorMessage from '../../common/components/ErrorMessage';

export default class RegisterVacancies extends Component {

    constructor() {
        super();

        this.onChangeContacts = this.onChangeContacts.bind(this);
        this.onChangeRestData = this.onChangeRestData.bind(this);
        this.sendData = this.sendData.bind(this);

        this.state = {
            nameContact: {
                user_surname: '', 
                user_name: '', 
                user_email: '', 
                user_password: '', 
                user_password_confirm: '',
                user_country: '',
                user_city: '',
                user_second_email: '',
                user_skype: '',
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
                agree: false,
            },
            categories: null
        }

        this.validators = [];

        // validator props
        [
                {
                    stateScope: 'nameContact', 
                    validationType: validationTypes.allNotNull,
                    errorByKey: 'userInfoError',
                    fieldKeys: ['user_surname', 'user_name', 'user_email', 'user_password', 
                    'user_password_confirm', 'user_country', 'user_city']
                },
                {
                    stateScope: 'nameContact', 
                    validationType: validationTypes.length,
                    errorByKey: 'passwordError',
                    fieldKeys: ['user_password']
                },
                {
                    stateScope: 'nameContact', 
                    validationType: validationTypes.toBeEqual,
                    errorByKey: 'passwordError',
                    fieldKeys: ['user_password', 'user_password_confirm']
                },
                {
                    stateScope: 'nameContact', 
                    validationType: validationTypes.oneNotNullOf,
                    errorByKey: 'userContactsError',
                    fieldKeys: ['user_phone', 'user_whatsapp', 'user_viber', 'user_telegram', 'user_second_email',
                    'user_skype']
                },
                {
                    stateScope: 'restData', 
                    validationType: validationTypes.allNotNull,
                    errorByKey: 'findOptionsError',
                    fieldKeys: ['category_global', 'name']
                },
                {
                    stateScope: 'restData', 
                    validationType: validationTypes.allNotNull,
                    errorByKey: 'descriptionError',
                    fieldKeys: ['description', 'agree']
                }
        ].forEach(props => {
            this.validators.push(bindValidator.call(this, props));
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.restData.category_global !== this.state.restData.category_global) && (this.state.restData.category_global !== null)) {
            requestWithParams('getFiltersByProfession', { value: this.state.restData.category_global })
                .then(data => this.setState({ categories: data.category }));
        }
    }

    Check = () => {
        const {agree} = this.state.restData;
        this.setState({restData: {...this.state.restData, agree: !agree}});
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
        const errors = validateAll(...this.validators);

        this.setState({ errors })

        if (errors) return false;

        return true;
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
        const {agree} = this.state.restData;

        const { userInfoError, passwordError, userContactsError, findOptionsError,
        descriptionError } = getErrorMessage.apply(this);

        return (
            <div className='container'>
                <div className='container'>
                    <h1 className='register-title'>Регистрация вакансии
                        {(userInfoError || passwordError) && 
                            <ErrorMessage>{userInfoError || passwordError}</ErrorMessage>}
                    </h1>
                </div>
                <NameContact
                    onChangeContacts={this.onChangeContacts}
                    contacts={this.state.nameContact}
                    contactError={userContactsError}
                />
                <div className='container'>
                    <h2 className='register-title'>Кого вы ищете
                        {findOptionsError && 
                            <ErrorMessage>{findOptionsError}</ErrorMessage>}
                    </h2>
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
                    <h2 className='register-title'>Описание вакансии*
                        {descriptionError && 
                            <ErrorMessage>{descriptionError}</ErrorMessage>}
                    </h2>
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
                    <CommonButton
                        className='img-reg-button'
                        onClick={this.sendData}
                    >
                        Сохранить вакансию
                    </CommonButton>
                </div>
                <div className='container'>
                    <p className='reg-intro'>*Поля, обязательные для заполнения</p>
                </div>
            </div>
        )
    }
}
