import styled from 'styled-components';

import { CommonButton } from '../../common/components/Buttons';
import { Centerer } from '../../common/components/Layouts';
import { TwoLinkedButtonGroup } from '../../common/components/StaticPagesStyles';
import { AdditionalText } from '../../common/components/Typography';


export default function RegistrationButtonsBlock({ onClickLeft, onClickRight, current }) {
    return <>
        <TwoLinkedButtonGroup>

            <CommonButton
                onClick={onClickLeft}
                active={'vacancy' === current}
            >Создать вакансию</CommonButton>
            <CommonButton
                onClick={onClickRight}
                active={'resume' === current}
            >Создать анкету</CommonButton>

        </TwoLinkedButtonGroup>

        <AdditionalText>Для продолжения работы с сайтом, необходимо создать вакансию или анкету работника</AdditionalText>
    </>
}
