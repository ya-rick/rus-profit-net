import CommonButton from "../../common/components/CommonButton";
import ErrorMessage from "../../common/components/ErrorMessage";
import { Centerer } from "../../common/components/Layouts";

export default function RegistrationButtonsBlock({ onClickLeft, onClickRight, current, creationInfo }) {
    return <>
        <h2 className='register-title'>Создание вакансии/анкеты
            <p className='subtext-new'>Для продолжения работы с сайтом, необходимо создать вакансию или анкету работника</p>
            {creationInfo && <ErrorMessage>{creationInfo}</ErrorMessage>}
        </h2>

        <Centerer>

            <CommonButton
                onClick={onClickLeft}
                active={'vacancy' === current}
            >Регистрация вакансии</CommonButton>
            <CommonButton
                onClick={onClickRight}
                active={'resume' === current}
            >Регистрация анкеты</CommonButton>

        </Centerer>
    </>
}