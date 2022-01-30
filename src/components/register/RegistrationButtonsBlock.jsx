import { CommonButton } from '../../common/components/Buttons';
import { TwoLinkedButtonGroup } from '../../common/components/StaticPagesStyles';


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
    </>
}
