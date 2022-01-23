import { inject, observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import WorkCluster from '../../../common/components/workCluster';
import RegisterFilters from './Filters';
import MenuButtonsDocs from '../../AdditionalParams';
import CheckBox from '../../../common/components/checkbox';
import { CommonButton } from '../../../common/components/Buttons';
import { DefaultContainer } from '../../../common/components/Layouts';
import ErrorMessage from '../../../common/components/ErrorMessage';
import TextArea from '../../../common/components/TextArea';
import { ModalVariants } from '../../../common/consts';
import { useCategoryFilters, useToggle } from '../../../common/hooks';
import WorkExamples from './WorkExamples';
import { AdditionalText, MainSubtitle, Subtitle } from '../../../common/components/Typography';
import { forDevice } from '../../../common/commonAdaptiveStyles';


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
            <DefaultContainer>
                <DefaultContainer>
                    <Subtitle>
                        {isResume ? 'Какую работу вы ищете'
                        : 'Кого вы ищете'}
                        {targetedInfo && 
                            <ErrorMessage>{targetedInfo}</ErrorMessage>}
                    </Subtitle>
                </DefaultContainer>
                
                <WorkCluster
                    onCategoryChanged={onChangeCategory}
                    currentCategory={category}
                    categories={categories}
                />

                <RegisterFilters
                    fields={restFields}
                    onFieldChange={onFieldChange}
                    isResume={isResume}
                />
                
                {filtersByCategory && <MenuButtonsDocs
                        categories={filtersByCategory}
                        selectedParameters={result_cat}
                        onCheckChanged={onFieldChange('result_cat')}/>}
            </DefaultContainer>

            <DefaultContainer>
                <DefaultContainer>
                    <MainSubtitle>{isResume ? 'О себе' : 'Описание вакансии'}*
                        {descriptionBlock && 
                            <ErrorMessage>{descriptionBlock}</ErrorMessage>}
                    </MainSubtitle>
                </DefaultContainer>

                <TextArea
                    value={description}
                    onChange={e => onFieldChange('description')(e.target.value)}
                />
                {isResume && isWorksAddable && <WorkExamples
                    files_images={files_images}
                    removeImage={removeImage}
                    addImage={addImage}
                />}

                <AlignRightContainer>
                    <CheckBox
                        isChecked={agree}
                        check={onFieldChange('agree')}
                        style={{ marginLeft: 'auto', marginRight: '0' }}
                    >
                        <AdditionalText onClick={() => openModal(ModalVariants.UserAgreement)}>
                            Я согласен с <Underlined>условиями оказания услуг</Underlined> и с <Underlined>политикой конфиденциальности в отношении обработки 
                            персональных данных</Underlined>
                        </AdditionalText>
                    </CheckBox>
                </AlignRightContainer>

                <ButtonWithErrorContainer>
                    {isError && <ErrorMessage style={{ textAlign: 'center' }}>{localeService.getByKey('invalid_data')}</ErrorMessage>}

                    <CommonButton
                        className='img-reg-button'
                        onClick={finishRegistration}
                    >
                        Сохранить {isResume ? 'анкету' : 'вакансию'}
                    </CommonButton>
                </ButtonWithErrorContainer>

                <AdditionalText>*Поля, обязательные для заполнения</AdditionalText>
            </DefaultContainer>
        </>
    )
}

export default inject('uiStore', 'localeService')(observer(RegisterVacancies));

const Underlined = styled.span`
    text-decoration: underline;
`;

const ButtonWithErrorContainer = styled.div`
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    row-gap: 1rem;
`;

const AlignRightContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    
    ${forDevice.M(css`
        justify-content: end;

        > * {
            width: 50%;
        }
    `)}
`;
