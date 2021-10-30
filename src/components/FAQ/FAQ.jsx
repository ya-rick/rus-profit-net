import { inject, observer } from 'mobx-react';

import { CommonButton } from '../../common/components/Buttons';
import Dropdown from '../../common/components/Dropdown';
import { LinkedButton } from '../../common/components/Buttons';
import { PageContentWrapper } from '../../common/components/Layouts';
import { PageTitle } from '../../common/components/TitleVariants';
import TwoLinkedButtonGroup from '../../common/components/TwoLinkedButtonGroup';
import { DropdownContainer } from './styles';
import { ModalVariants } from '../../common/consts';
import { useRequest } from '../../common/hooks';
import Loading from '../../common/components/Loading';


export default inject('uiStore')(observer(function FAQ ({ uiStore: { openModal } }) {
    let {result, isLoading, error} = useRequest({ requestType: 'getFAQs' });

    if (isLoading) return <Loading/>;

    if (error) return 'error';

    if (result.options.length % 2 === 0) result.options.pop();

    return <PageContentWrapper>
        <PageTitle>Вопросы и ответы</PageTitle>

        <DropdownContainer>
            {result.options.map(faqUnit => <Dropdown
                title={faqUnit.question}
                content={faqUnit.answer}
            />)}
            <CommonButton onClick={() => openModal(ModalVariants.FAQ)}>Задать вопрос</CommonButton>
        </DropdownContainer>

        <TwoLinkedButtonGroup>
            <LinkedButton to={'/searchWorker'}>Найти работника</LinkedButton>
            <LinkedButton to={'/searchWork'}>Найти работу</LinkedButton>
        </TwoLinkedButtonGroup>

    </PageContentWrapper>
}))
