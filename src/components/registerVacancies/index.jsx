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
import { useCategoryFilters, useToggle } from '../../common/hooks';
import WorkExamples from './WorkExamples';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PageSubtitle } from '../../common/components/TitleVariants';


function RegisterVacancies({
    uiStore: { openModal }, isResume,
    fields: { description, result_cat, agree, category, isWorksAddable, files_images, addImage, removeImage, ...restFields },
    error: { targetedInfo, descriptionBlock },
    onFieldChange, onConfirmClicked, successMessage,
    localeService
}) {

    const { categories, setCurrentCategory, filtersByCategory } = useCategoryFilters(category?.id);

    const [isError, toggleIsError] = useToggle();

    async function finishRegistration() {
        try {
            toggleIsError(false);

            await onConfirmClicked();

            openModal(ModalVariants.InfoModal, successMessage)
        } catch(e) {
            if (e === false) {
                toggleIsError(true);
                return;
            };

            openModal(ModalVariants.InfoModal, {
                title: 'Произошла ошибка!',
                description: localeService.getByKey(e.message)
            });
        } 
    }

    function onChangeCategory(category) {
        onFieldChange('category')(category);
        setCurrentCategory(category.id);
    }

    return (
        <>
            <PageSubtitle>
                {isResume ? 'Какую работу вы ищете'
                : 'Кого вы ищете'}
                {targetedInfo && 
                    <ErrorMessage>{targetedInfo}</ErrorMessage>}
            </PageSubtitle>
            
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

            <PageSubtitle>{isResume ? 'О себе' : 'Описание вакансии'}*
                {descriptionBlock && 
                    <ErrorMessage>{descriptionBlock}</ErrorMessage>}
            </PageSubtitle>

            <TextArea
                value={description}
                onChange={e => onFieldChange('description')(e.target.value)}
            />
            {isResume && isWorksAddable && <WorkExamples
                files_images={files_images}
                removeImage={removeImage}
                addImage={addImage}
            />}

            <div className='display-right'>
                <CheckBox isChecked={agree} check={onFieldChange('agree')}>
                    <AgreementLink to={'/userAgreement'}>
                        Я согласен с <Underlined>условиями оказания услуг</Underlined> и с <Underlined>политикой конфиденциальности в отношении обработки 
                        персональных данных</Underlined>
                    </AgreementLink>
                </CheckBox>
            </div>

            <div style={{
                margin: '50px auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '300px',
                rowGap: '20px'
            }}>
                {isError && <ErrorMessage style={{ textAlign: 'center' }}>{localeService.getByKey('invalid_data')}</ErrorMessage>}

                <CommonButton
                    className='img-reg-button'
                    onClick={finishRegistration}
                >
                    Сохранить {isResume ? 'анкету' : 'вакансию'}
                </CommonButton>
            </div>

            <p className='reg-intro'>*Поля, обязательные для заполнения</p>
        </>
    )
}

export default inject('uiStore', 'localeService')(observer(RegisterVacancies));

const AgreementLink = styled(Link)`
    display: inline-block;
    width: 400px;
    line-height: 30px;
`;

const Underlined = styled.span`
    text-decoration: underline;
`;
