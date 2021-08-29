import './styles.css';

import LinkedButton from "../../common/components/LinkedButton";
import PageTitle from "../../common/components/PageTitle";
import PageContentWrapper from "../../common/components/PageContentWrapper";
import TwoLinkedButtonGroup from "../../common/components/TwoLinkedButtonGroup";
import { useEffect, useState } from "react";
import { requestWithParams } from "../../api/exchangeLayer";

export default function UserAgreement () {
    const [data, setData] = useState({});

    useEffect(() => {
        requestWithParams('getPageAdvert')
            .then(data => {
                const [
                    { block_title },
                    { block1_title },
                    { block1_subtitle },
                ] = data.options;

                setData({
                    block1_title,
                    block1_subtitle,
                    block_title
                })
            });
    }, [])

    return <PageContentWrapper>

        <PageTitle>{data.block_title}</PageTitle>


        <div className={'borderedTitle'}>{data.block1_title}</div>

        <div>{data.block1_subtitle}</div>

        <TwoLinkedButtonGroup>
            <LinkedButton to={'/vacancies'}>Найти работника</LinkedButton>
            <LinkedButton to={'/questionnaires'}>Найти работу</LinkedButton>
        </TwoLinkedButtonGroup>


    </PageContentWrapper>
    
}