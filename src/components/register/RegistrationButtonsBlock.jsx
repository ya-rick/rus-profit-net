import styled from 'styled-components';

import { CommonButton } from '../../common/components/Buttons';
import ErrorMessage from '../../common/components/ErrorMessage';
import { Centerer } from '../../common/components/Layouts';


export default function RegistrationButtonsBlock({ onClickLeft, onClickRight, current, creationInfo }) {
    return <>
        <h2 className='register-title'>Создание вакансии/анкеты
            <p className='subtext-new'>Для продолжения работы с сайтом, необходимо создать вакансию или анкету работника</p>
            {creationInfo && <ErrorMessage>{creationInfo}</ErrorMessage>}
        </h2>

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
