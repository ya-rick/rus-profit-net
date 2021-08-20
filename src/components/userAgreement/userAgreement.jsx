import { politic, siteAgreement } from "./text";
import './styles.css';

export default function UserAgreement () {
    return <div className={'container marginedByVertical'}>
        <h1 className={'pageTitle'}>Условия использования сайта</h1>


        <div className={'borderedTitle'}>Соглашение об использовании сайта</div>

        <div>{siteAgreement}</div>

        <div className={'borderedTitle'}>Политика конфиденциальности</div>

        <div>{politic}</div>


    </div>
    
}
