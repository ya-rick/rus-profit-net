import { inject, observer } from 'mobx-react';

import { CommonButton } from '../../common/components/Buttons';
import Dropdown from '../../common/components/Dropdown';
import { DefaultContainer, MainContainer } from '../../common/components/Layouts';
import { MainTitle } from '../../common/components/Typography';
import { DropdownContainer } from './styles';
import { ModalVariants } from '../../common/consts';
import { useRequest } from '../../common/hooks';
import Loading from '../../common/components/Loading';
import styled from 'styled-components';
import { TwoLinkedButtonGroup } from '../../common/components/StaticPagesStyles';


export default inject('uiStore', 'localeService')(observer(function FAQ ({
    uiStore: { openModal },
    localeService
}) {
    let {result, isLoading, error} = useRequest({ requestType: 'getFAQs' });

    if (isLoading) return <Loading/>;

    if (error) return localeService(error.message);

    if (result.options.length % 2 === 0) result.options.pop();

    return (
        <MainContainer>
            <DefaultContainer>
                <MainTitle>Вопросы и ответы</MainTitle>
            </DefaultContainer>

            <DropdownContainer>
                {result.options.map(faqUnit => <Dropdown
                    title={faqUnit.question}
                    content={faqUnit.answer}
                />)}
                <TwoLinkedButtonGroup>
                    <CommonButton
                        onClick={() => openModal(ModalVariants.FAQ)}
                    >
                        Задать вопрос
                    </CommonButton>
                </TwoLinkedButtonGroup>
            </DropdownContainer>
        </MainContainer>
    );
}));
