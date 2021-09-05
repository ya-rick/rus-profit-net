import CommonButton from "../../common/components/CommonButton";
import { Centerer } from "../../common/components/Layouts";

export default function RegistrationButtonsBlock({ onClickLeft, onClickRight, current }) {
    return <>
        <h2 className='register-title'>Создание вакансии/анкеты
            <p className='subtext-new'>Для продолжения работы с сайтом, необходимо создать вакансию или анкету работника</p>
            {/* {nameContact && <ErrorMessage>{nameContact}</ErrorMessage>} */}
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