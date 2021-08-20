import { politic, siteAgreement } from "./text";
import './styles.css';
import LinkedButton from "../../common/components/LinkedButton";

export default function UserAgreement () {
    return <div className={'container marginedByVertical'}>
        <h1 className={'pageTitle'}>Условия использования сайта</h1>


        <div className={'borderedTitle'}>Соглашение об использовании сайта</div>

        <div>{siteAgreement}</div>

        <div className={'borderedTitle'}>Политика конфиденциальности</div>

        <div>{politic}</div>

        <div className={'linked-button-group'}>
            <LinkedButton to={'/vacancies'}>Найти работника</LinkedButton>
            <LinkedButton to={'/questionnaires'}>Найти работу</LinkedButton>
        </div>


    </div>
    
}
