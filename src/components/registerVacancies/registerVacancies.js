import React, {useEffect, useState} from 'react';

import './registerVacancies.css';
import WorkCluster from "../workCluster";
import RegisterFilterVacation from "./registerFilterVacation";
import MenuButtonsDocs from "../menuButtonsDocs";
import CheckBox from "../checkbox";
import { requestWithParams } from '../../api/exchangeLayer';
import CommonButton from "../../common/components/CommonButton";
import ErrorMessage from '../../common/components/ErrorMessage';
import TextArea from '../../common/components/TextArea';
import { inject, observer } from 'mobx-react';
import { ModalVariants } from '../../common/consts';
import { useCategoryFilters } from '../../common/hooks';
import WorkExamples from './WorkExamples';

function RegisterVacancies({ registrationStore, uiStore: { openModal } }) {

    const {
        setField, sendData, error: { targetedInfo, descriptionBlock },
        commonInfo: { registration_type },
        targetedInfo: {  
            description, result_cat, agree, category_global, isWorksAddable
        },
    } = registrationStore;

    const { categories, setCurrentCategory, filtersByCategory } = useCategoryFilters(category_global?.id);

    
    async function finishRegistration() {
        try {
            await sendData();

            openModal(ModalVariants.InfoModal, {
                title: 'Поздравляю!',
                description: 'Для завершения регистрация на Ваш почтовый ящик было отправлена ссылка, по которой необходимо перейти'
            })
        } catch(e) {
            console.error(e);
            
            if (e === false) return;

            openModal(ModalVariants.InfoModal, {
                title: 'Произошла ошибка!',
                description: 'Пользователь с таким почтовым ящиком уже существует в системе'
            })
        } 
    }

    function onChangeCategory(category) {
        setField('category_global')(category);
        setCurrentCategory(category.id);
    }

    return (
        <>
            <div>
                <h2 className='register-title'>{registration_type === 'vacancy'
                    ? 'Кого вы ищете'
                    : 'Какую работу вы ищете'}
                    {targetedInfo && 
                        <ErrorMessage>{targetedInfo}</ErrorMessage>}
                </h2>
            </div>
            <WorkCluster
                onCategoryChanged={onChangeCategory}
                currentCategory={category_global}
                categories={categories}
            />

            <RegisterFilterVacation/>
            
            {filtersByCategory && <MenuButtonsDocs
                    categories={filtersByCategory}
                    selectedParameters={result_cat}
                    onCheckChanged={setField('result_cat')}/>}
            <div>
                <h2 className='register-title'>{registration_type === 'vacancy' ? 'Описание вакансии' : 'О себе'}*
                    {descriptionBlock && 
                        <ErrorMessage>{descriptionBlock}</ErrorMessage>}
                </h2>
            </div>
            <TextArea
                value={description}
                onChange={e => setField('description')(e.target.value)}
            />
            {registration_type === 'resume' && isWorksAddable && <WorkExamples/>}
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
                    onClick={finishRegistration}
                >
                    Сохранить {registration_type === 'vacancy' ? 'вакансию' : 'анкету'}
                </CommonButton>
            </div>
            <div>
                <p className='reg-intro'>*Поля, обязательные для заполнения</p>
            </div>
        </>
    )
}

export default inject('registrationStore', 'uiStore')(observer(RegisterVacancies));
