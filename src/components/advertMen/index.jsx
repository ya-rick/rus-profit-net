import { useEffect, useState } from 'react';

import { LinkedButton } from '../../common/components/Buttons';
import { MainTitle } from '../../common/components/Typography';
import { DefaultContainer, MainContainer } from '../../common/components/Layouts';
import { requestWithParams } from '../../api/exchangeLayer';
import { RegularTextWrapper, TwoLinkedButtonGroup } from '../../common/components/StaticPagesStyles';


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

    return (
        <MainContainer>
    
            <DefaultContainer>
                <MainTitle>{data.block_title}</MainTitle>
            </DefaultContainer>
    
            <RegularTextWrapper>{data.block1_subtitle}</RegularTextWrapper>
    
            <TwoLinkedButtonGroup>
                <LinkedButton to={'/searchWorker'}>Найти работника</LinkedButton>
                <LinkedButton to={'/searchWork'}>Найти работу</LinkedButton>
            </TwoLinkedButtonGroup>
    
        </MainContainer>
    )
}
