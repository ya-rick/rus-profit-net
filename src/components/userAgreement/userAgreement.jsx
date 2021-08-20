import { politic, siteAgreement } from "./text";
import './styles.css';

import LinkedButton from "../../common/components/LinkedButton";
import PageTitle from "../../common/components/PageTitle";
import PageContentWrapper from "../../common/components/PageContentWrapper";
import TwoLinkedButtonGroup from "../../common/components/TwoLinkedButtonGroup";

export default function UserAgreement () {
    return <PageContentWrapper>

        <PageTitle>Условия использования сайта</PageTitle>


        <div className={'borderedTitle'}>Соглашение об использовании сайта</div>

        <div>{siteAgreement}</div>

        <div className={'borderedTitle'}>Политика конфиденциальности</div>

        <div>{politic}</div>

        <TwoLinkedButtonGroup>
            <LinkedButton to={'/vacancies'}>Найти работника</LinkedButton>
            <LinkedButton to={'/questionnaires'}>Найти работу</LinkedButton>
        </TwoLinkedButtonGroup>


    </PageContentWrapper>
    
}
