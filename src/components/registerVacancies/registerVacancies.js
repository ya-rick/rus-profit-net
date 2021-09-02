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
import { clamp } from '../../common/utils';

export default class RegisterVacancies extends Component {

    constructor() {
        super();

        this.onChangeContacts = this.onChangeContacts.bind(this);
        this.onChangeRestData = this.onChangeRestData.bind(this);
        this.sendData = this.sendData.bind(this);
        this.validate = this.validate.bind(this);
        this.onChangeCountries = this.onChangeCountries.bind(this);
        this.onChangeCities = this.onChangeCities.bind(this);
        this.onChangeActiveEditableCountry = this.onChangeActiveEditableCountry.bind(this);

        this.state = {
            nameContact: {
                user_surname: '', 
                user_name: '', 
                user_email: '', 
                user_password: '', 
                user_password_confirm: '',
                user_second_email: '',
                user_skype: '',
                user_viber: '',
                user_telegram: '',
                user_phone_prefered: false,
                user_whatsapp_prefered: false,
                user_second_email_prefered: false,
                user_skype_prefered: false,
                user_viber_prefered: false,
                user_telegram_prefered: false,
                user_country: [],
                user_city: [],
                currentEditCountry: null
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

    onChangeCountries(newCountry, operationType) {
        let newCountries = [...this.state.nameContact.user_country];
        let newActiveEditableCountry = null;

        if (this.state.nameContact.user_country.length === 3  && operationType !== 'delete') {
            return;
        }

        if (operationType === 'delete') {

            const countryIndex = this.state.nameContact.user_country
                .findIndex(country => country.id === newCountry.id);
            newCountries
                .splice(countryIndex, 1);

            if (this.state.nameContact.user_city[countryIndex]) {
                this.state.nameContact.user_city.splice(countryIndex);
            }
            
            if (newCountries.length === 0) {
                newActiveEditableCountry = null;
            } else {
                newActiveEditableCountry = clamp(0, countryIndex, newCountries.length - 2);
            }
        } else if (operationType === 'add') {
            newCountries.push(newCountry);

            newActiveEditableCountry = newCountry;
        }

        this.setState({ 
            nameContact: {
                ...this.state.nameContact, 
                user_country: [...newCountries],
                currentEditCountry: newActiveEditableCountry
            }
        });
    }

    onChangeCities(newCity, operationType) {

        const { user_country, user_city, currentEditCountry } = this.state.nameContact;

        if (user_city?.flat().length === 3 && operationType !== 'delete') {
            return;
        }

        const editableIndex = user_country.findIndex(country => 
            country.id === currentEditCountry.id);

        let editableCitiesArray = null;

        if (user_city[editableIndex]) {
            editableCitiesArray = user_city[editableIndex];
        } else {
            editableCitiesArray = [];
            user_city.push(editableCitiesArray);
        }

        if (operationType === 'delete') {
            editableCitiesArray.splice(editableCitiesArray.findIndex(city => city.id === newCity.id), 1);

            if (editableCitiesArray.length === 0) {
                user_city.splice(editableIndex, 1);
            }
        } else if (operationType === 'add') {
            editableCitiesArray.push(newCity);
        }

        this.setState({ nameContact: {
            ...this.state.nameContact,
            user_city: [...this.state.nameContact.user_city]}
        })
    }

    onChangeActiveEditableCountry(newCountry) {
        this.setState({ nameContact: {...this.state.nameContact, currentEditCountry: newCountry } });
    }

    check = () => {
        const {agree} = this.state.restData;
        this.setState({restData: {...this.state.restData, agree: !agree }});
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

        console.log(nameContact.user_country)

        if (!this.validate()) return;

        let requestData = Object.entries({
                ...restData,
                ...nameContact,
                user_country: nameContact.user_country?.map(country => country.name).join(','),
                user_city: nameContact.user_city?.reduce((acc, cities) => (acc.push(cities.map(city => city.name).join(',')), acc), [])
                    .join(';')
            }).reduce((acc, [key, value]) => {
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

        const { nameContact } = this.state;

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
                    contacts={nameContact}
                    contactError={userContactsError}

                    onChangeCountries={this.onChangeCountries}
                    onChangeCities={this.onChangeCities}
                    onChangeActiveEditableCountry={this.onChangeActiveEditableCountry}
                    chosenCountries={nameContact.user_country}
                    chosenCities={nameContact.user_city?.flat()}
                    activeCountry={this.state.nameContact.currentEditCountry}
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
