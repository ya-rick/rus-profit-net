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
import CommonButton from "../../common/components/CommonButton";
import { bindValidator, getErrorMessage, validateAll, validationTypes } from '../../common/validate';
import ErrorMessage from '../../common/components/ErrorMessage';
import { clamp } from '../../common/utils';

class RegisterQuestionaries extends Component {

    constructor() {
        super();

        this.onChangeDate = this.onChangeDate.bind(this);
        this.sendData = this.sendData.bind(this);
        this.onChangeContacts = this.onChangeContacts.bind(this);
        this.onChangeRestData = this.onChangeRestData.bind(this);
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
                user_phone: '',
                user_whatsapp: '',
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
                result_cat: [],
                agree: false,
                categories: null
            },
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
                    fieldKeys: ['user_phone', 'user_whatsapp', 'user_viber', 'user_telegram']
                },
                {
                    stateScope: 'nameContact', 
                    validationType: validationTypes.oneTrueOf,
                    errorByKey: 'userContactsError',
                    fieldKeys: ['user_phone_prefered', 'user_whatsapp_prefered', 'user_second_email_prefered',
                        'user_skype_prefered', 'user_viber_prefered', 'user_telegram_prefered']
                },
                {
                    stateScope: 'generalInformation', 
                    validationType: validationTypes.allNotNull,
                    errorByKey: 'birthdayError',
                    fieldKeys: ['birthday']
                },
                {
                    stateScope: 'restData', 
                    validationType: validationTypes.allNotNull,
                    errorByKey: 'findOptionsError',
                    fieldKeys: ['category_global']
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
        const {agree} = this.state.restData;
        this.setState({restData: {...this.state.restData, agree: !agree }});
    }

    onChangeDate(newDate) {
        this.setState({ generalInformation: { ...this.state.generalInformation, birthday: newDate } })
    }

    validate() {
        const errors = validateAll(...this.validators);

        this.setState({ errors })

        if (errors) return false;

        return true;
    }

    sendData() {
        const { generalInformation, nameContact, restData } = this.state;

        console.log(nameContact.user_country);
        
        if (!this.validate()) return;

        let requestData = Object.entries({
            ...restData,
            ...nameContact,
            ...generalInformation,
            image: this.context.imgFile,
            user_country: nameContact.user_country?.map(country => country.name).join(','),
            user_city: nameContact.user_city?.reduce((acc, cities) => (acc.push(cities.map(city => city.name).join(',')), acc), [])
                .join(';')
        }).reduce((acc, [key, value]) => {
            acc[key + '_r'] = value;
            return acc;
        }, {})

        requestWithFormData('registerQuestionary', requestData)
            .catch(e => console.error(e));
    }

    render() {
        const { agree } = this.state.restData;

        const { userInfoError, passwordError, userContactsError, findOptionsError,
            descriptionError, birthdayError } = getErrorMessage.apply(this);

        const { nameContact } = this.state;

        return (
            <div className='container'>
                <div className='container'>
                    <h1 className='register-title'>Регистрация анкеты
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
                    <h2 className='register-title'>Общие данные
                        {birthdayError && 
                            <ErrorMessage>{birthdayError}</ErrorMessage>}
                    </h2>
                </div>
                <GeneralInformation onChangeDate={this.onChangeDate} />
                <div className='container'>
                    <h2 className='register-title'>Какую работу вы ищете
                        {findOptionsError && 
                            <ErrorMessage>{findOptionsError}</ErrorMessage>}
                    </h2>
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
                    <h2 className='register-title'>О себе*
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
                    <CommonButton onClick={this.sendData} >
                        Сохранить анкету
                    </CommonButton>
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
