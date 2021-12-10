import { useEffect, useState } from 'react';

import './styles.css';

import { LinkedButton } from '../../common/components/Buttons';
import { PageTitle } from '../../common/components/TitleVariants';
import { PageContentWrapper } from '../../common/components/Layouts';
import TwoLinkedButtonGroup from '../../common/components/TwoLinkedButtonGroup';
import { requestWithParams } from '../../api/exchangeLayer';

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

        <div>{data.block1_subtitle}</div>

        <TwoLinkedButtonGroup>
            <LinkedButton to={'/searchWorker'}>Найти работника</LinkedButton>
            <LinkedButton to={'/searchWork'}>Найти работу</LinkedButton>
        </TwoLinkedButtonGroup>


    </PageContentWrapper>
    
}
