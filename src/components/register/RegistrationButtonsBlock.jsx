import styled from 'styled-components';

import { CommonButton } from '../../common/components/Buttons';
import ErrorMessage from '../../common/components/ErrorMessage';
import { Centerer } from '../../common/components/Layouts';
import { PageSubtitle } from '../../common/components/TitleVariants';


export default function RegistrationButtonsBlock({ onClickLeft, onClickRight, current, creationInfo }) {
    return <>
        <PageSubtitle>Создание вакансии/анкеты
            <p className='subtext-new'>Для продолжения работы с сайтом, необходимо создать вакансию или анкету работника</p>
            {creationInfo && <ErrorMessage>{creationInfo}</ErrorMessage>}
        </PageSubtitle>

        <ButtonsLayout>

            <CommonButton
                onClick={onClickLeft}
                active={'vacancy' === current}
            >Регистрация вакансии</CommonButton>
            <CommonButton
                onClick={onClickRight}
                active={'resume' === current}
            >Регистрация анкеты</CommonButton>

        </ButtonsLayout>
    </>
}

const ButtonsLayout = styled(Centerer)`
    flex-wrap: wrap;
    column-gap: 40px;
`;
