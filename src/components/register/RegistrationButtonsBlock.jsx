import styled from 'styled-components';

import { CommonButton } from '../../common/components/Buttons';
import { Centerer } from '../../common/components/Layouts';


export default function RegistrationButtonsBlock({ onClickLeft, onClickRight, current }) {
    return <>
        <ButtonsLayout>

            <CommonButton
                onClick={onClickLeft}
                active={'vacancy' === current}
            >Создать вакансию</CommonButton>
            <CommonButton
                onClick={onClickRight}
                active={'resume' === current}
            >Создать анкету</CommonButton>

        </ButtonsLayout>

        <p className='subtext-new'>Для продолжения работы с сайтом, необходимо создать вакансию или анкету работника</p>
    </>
}

const ButtonsLayout = styled(Centerer)`
    flex-wrap: wrap;
    column-gap: 40px;
    margin-block: 40px;
`;
