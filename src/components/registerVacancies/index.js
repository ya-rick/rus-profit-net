import { inject, observer } from 'mobx-react';
import React from 'react';

import './registerVacancies.css';

import WorkCluster from '../workCluster';
import RegisterFilterVacation from './registerFilterVacation';
import MenuButtonsDocs from '../menuButtonsDocs';
import CheckBox from '../checkbox';
import { CommonButton } from '../../common/components/Buttons';
import ErrorMessage from '../../common/components/ErrorMessage';
import TextArea from '../../common/components/TextArea';
import { ModalVariants } from '../../common/consts';
import { useCategoryFilters } from '../../common/hooks';
import WorkExamples from './WorkExamples';


function RegisterVacancies({
    uiStore: { openModal }, isResume,
    fields: { description, result_cat, agree, category, isWorksAddable, ...restFields },
    error: { targetedInfo, descriptionBlock },
    onFieldChange, onConfirmClicked, successMessage
}) {

    const { categories, setCurrentCategory, filtersByCategory } = useCategoryFilters(category?.id);

    
    async function finishRegistration() {
        try {
            await onConfirmClicked();

            openModal(ModalVariants.InfoModal, successMessage)
        } catch(e) {
            console.error(e);
            
            if (e === false) return;

            openModal(ModalVariants.InfoModal, {
                title: 'Произошла ошибка!',
                description: 'Обратитесь в поддержку'
            });
        } 
    }

    function onChangeCategory(category) {
        onFieldChange('category')(category);
        setCurrentCategory(category.id);
    }

    return (
        <>
            <div>
                <h2 className='register-title'>
                    {isResume ? 'Какую работу вы ищете'
                    : 'Кого вы ищете'}
                    {targetedInfo && 
                        <ErrorMessage>{targetedInfo}</ErrorMessage>}
                </h2>
            </div>
            <WorkCluster
                onCategoryChanged={onChangeCategory}
                currentCategory={category}
                categories={categories}
            />

            <RegisterFilterVacation
                fields={restFields}
                onFieldChange={onFieldChange}
                isResume={isResume}
            />
            
            {filtersByCategory && <MenuButtonsDocs
                    categories={filtersByCategory}
                    selectedParameters={result_cat}
                    onCheckChanged={onFieldChange('result_cat')}/>}
            <div>
                <h2 className='register-title'>{isResume ? 'О себе' : 'Описание вакансии'}*
                    {descriptionBlock && 
                        <ErrorMessage>{descriptionBlock}</ErrorMessage>}
                </h2>
            </div>
            <TextArea
                value={description}
                onChange={e => onFieldChange('description')(e.target.value)}
            />
            {isResume && isWorksAddable && <WorkExamples/>}
            <div>
                <div className='display-right'>
                    <CheckBox isChecked={agree} check={onFieldChange('agree')}>
                        <p className='agree'>
                            Я согласен с условиями оказания услуг и с политикой <br/>
                            конфиденциальности в отношении обработки персональных<br/>
                            данных
                        </p>
                    </CheckBox>
                </div>
            </div>
            <div style={{ margin: '50px 0', display: 'flex', justifyContent: 'center' }}>
                <CommonButton
                    className='img-reg-button'
                    onClick={finishRegistration}
                >
                    Сохранить {isResume ? 'анкету' : 'вакансию'}
                </CommonButton>
            </div>
            <div>
                <p className='reg-intro'>*Поля, обязательные для заполнения</p>
            </div>
        </>
    )
}

export default inject('registrationStore', 'uiStore')(observer(RegisterVacancies));
