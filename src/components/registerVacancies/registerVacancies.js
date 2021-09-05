import React, {Component, useEffect, useState} from 'react';

import './registerVacancies.css';
import WorkCluster from "../workCluster";
import RegisterFilterVacation from "./registerFilterVacation";
import MenuButtonsDocs from "../menuButtonsDocs";
import CheckBox from "../checkbox";
import { requestWithFormData, requestWithParams } from '../../api/exchangeLayer';
import CommonButton from "../../common/components/CommonButton";
import { bindValidator, getErrorMessage, validateAll, validationTypes } from '../../common/validate';
import ErrorMessage from '../../common/components/ErrorMessage';
import TextArea from '../../common/components/TextArea';
import { inject, observer } from 'mobx-react';

function RegisterVacancies({ registrationStore }) {

        // this.onChangeContacts = this.onChangeContacts.bind(this);
        // this.onChangeRestData = this.onChangeRestData.bind(this);
        // this.sendData = this.sendData.bind(this);
        // this.validate = this.validate.bind(this);

        // this.validators = [];

        // validator props
        // [
        //         {
        //             stateScope: 'nameContact', 
        //             validationType: validationTypes.allNotNull,
        //             errorByKey: 'userInfoError',
        //             fieldKeys: ['user_surname', 'user_name', 'user_email', 'user_password', 
        //             'user_password_confirm']
        //         },
        //         {
        //             stateScope: 'nameContact', 
        //             validationType: validationTypes.arrayLength,
        //             errorByKey: 'userInfoError',
        //             fieldKeys: ['user_city']
        //         },
        //         {
        //             stateScope: 'nameContact', 
        //             validationType: validationTypes.length,
        //             errorByKey: 'passwordError',
        //             fieldKeys: ['user_password']
        //         },
        //         {
        //             stateScope: 'nameContact', 
        //             validationType: validationTypes.toBeEqual,
        //             errorByKey: 'passwordError',
        //             fieldKeys: ['user_password', 'user_password_confirm']
        //         },
        //         {
        //             stateScope: 'nameContact', 
        //             validationType: validationTypes.oneNotNullOf,
        //             errorByKey: 'userContactsError',
        //             fieldKeys: ['user_phone', 'user_whatsapp', 'user_viber', 'user_telegram', 'user_second_email',
        //             'user_skype']
        //         },
        //         {
        //             stateScope: 'restData', 
        //             validationType: validationTypes.allNotNull,
        //             errorByKey: 'findOptionsError',
        //             fieldKeys: ['category_global', 'name']
        //         },
        //         {
        //             stateScope: 'restData', 
        //             validationType: validationTypes.allNotNull,
        //             errorByKey: 'descriptionError',
        //             fieldKeys: ['description', 'agree']
        //         }
        // ].forEach(props => {
        //     this.validators.push(bindValidator.call(this, props));
        // })

    // componentDidUpdate(prevProps, prevState) {
    //     if ((prevState.restData.category_global !== this.state.restData.category_global) && (this.state.restData.category_global !== null)) {
    //         requestWithParams('getFiltersByProfession', { value: this.props.restData.category_global })
    //             .then(data => this.setState({ categories: data.category }));
    //     }
    // }

    // validate() {
    //     const errors = validateAll(...this.validators);

    //     this.setState({ errors })

    //     if (errors) return false;

    //     return true;
    // }

    // sendData() {
    //     const { restData, nameContact } = this.state;

    //     console.log(nameContact.user_country)

    //     if (!this.validate()) return;

    //     let requestData = Object.entries({
    //             ...restData,
    //             ...nameContact,
    //             user_country: nameContact.user_country?.map(country => country.name).join(','),
    //             user_city: nameContact.user_city?.reduce((acc, cities) => (acc.push(cities.map(city => city.name).join(',')), acc), [])
    //                 .join(';')
    //         }).reduce((acc, [key, value]) => {
    //         acc[key + '_v'] = value;
    //         return acc;
    //     }, {})

    //     requestWithFormData('registerVacancy', requestData)
    //         .catch(e => console.error(e));
    // }

    const [categories, setCategories] = useState(null);

    const {
        setField, commonInfo: { registration_type },
        targetedInfo: {  
            category_global, description, result_cat, agree
        }
    } = registrationStore;

    useEffect(() => {

        if (category_global) {
            requestWithParams('getFiltersByProfession', { value: category_global })
                .then(data => setCategories(data.category));
        }

    },[category_global])

    // const { findOptionsError,
    // descriptionError } = getErrorMessage.apply(this);

    return (
        <>
            <div>
                <h2 className='register-title'>{registration_type === 'vacancy'
                    ? 'Кого вы ищете'
                    : 'Какую работу вы ищете'}
                    {/* {findOptionsError && 
                        <ErrorMessage>{findOptionsError}</ErrorMessage>} */}
                </h2>
            </div>
            <WorkCluster
                onProfessionChanged={setField('category_global')}
            />

            <RegisterFilterVacation/>
            
            {categories && <MenuButtonsDocs
                    categories={categories}
                    selectedParameters={result_cat}
                    onCheckChanged={setField('result_cat')}/>}
            <div>
                <h2 className='register-title'>Описание вакансии*
                    {/* {descriptionError && 
                        <ErrorMessage>{descriptionError}</ErrorMessage>} */}
                </h2>
            </div>
            <TextArea
                value={description}
                onChange={e => setField('description')(e.target.value)}
            />
            <div>
                <div className='display-right'>
                    <CheckBox isChecked={agree} check={setField('agree')}>
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
                    // onClick={this.sendData}
                >
                    Сохранить вакансию
                </CommonButton>
            </div>
            <div>
                <p className='reg-intro'>*Поля, обязательные для заполнения</p>
            </div>
        </>
    )
}

export default inject('registrationStore')(observer(RegisterVacancies));
