import { useEffect, useState } from 'react';

import { LinkedButton } from '../../common/components/Buttons';
import { MainTitle } from '../../common/components/Typography';
import { DefaultContainer, MainContainer } from '../../common/components/Layouts';
import { requestWithParams } from '../../api/exchangeLayer';
import { BorderedTitle, RegularTextWrapper, TwoLinkedButtonGroup } from '../../common/components/StaticPagesStyles';

export default function UserAgreement () {
    const [data, setData] = useState({});

    useEffect(() => {
        requestWithParams('getPageLicense')
            .then(data => {
                const [
                    { block1_title },
                    { block1_subtitle },
                    { block2_title },
                    { block2_subtitle },
                    { block_title },
                ] = data.options;

                setData({
                    block1_title,
                    block1_subtitle,
                    block2_title,
                    block2_subtitle,
                    block_title
                })
            });
    }, [])

    return <MainContainer>

        <DefaultContainer>
            <MainTitle>{data.block_title}</MainTitle>
        </DefaultContainer>

        <DefaultContainer>
            <BorderedTitle>{data.block1_title}</BorderedTitle>
        </DefaultContainer>
        
        <RegularTextWrapper>{data.block1_subtitle}</RegularTextWrapper>

        <DefaultContainer>
            <BorderedTitle>{data.block2_title}</BorderedTitle>
        </DefaultContainer>

        <RegularTextWrapper>{data.block2_subtitle}</RegularTextWrapper>

        <TwoLinkedButtonGroup>
            <LinkedButton to={'/searchWorker'}>Найти работника</LinkedButton>
            <LinkedButton to={'/searchWork'}>Найти работу</LinkedButton>
        </TwoLinkedButtonGroup>

    </MainContainer>
}
