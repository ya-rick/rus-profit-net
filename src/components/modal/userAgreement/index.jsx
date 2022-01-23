import { useEffect, useState } from 'react';

import { DefaultContainer } from '../../../common/components/Layouts';
import { requestWithParams } from '../../../api/exchangeLayer';
import { RegularTextWrapper } from '../../../common/components/StaticPagesStyles';
import { ModalContent, ModalSubtitle, ModalTitle } from '../../../common/components/ModalStyles';
import styled from 'styled-components';

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

    return (
        <>
            <DefaultContainer>
                <ModalTitle>{data.block_title}</ModalTitle>
            </DefaultContainer>
                
            <ModalContent>

                <DefaultContainer>
                    <AgreementSubtitle>{data.block1_title}</AgreementSubtitle>
                </DefaultContainer>

                <RegularTextWrapper>{data.block1_subtitle}</RegularTextWrapper>

                <DefaultContainer>
                    <AgreementSubtitle>{data.block2_title}</AgreementSubtitle>
                </DefaultContainer>

                <RegularTextWrapper>{data.block2_subtitle}</RegularTextWrapper>

            </ModalContent>
        </>
    )
}

const AgreementSubtitle = styled(ModalSubtitle)`
    border: 2px solid #6F80A5;
    padding: .75rem;
    
    ${props => props.theme.smallBorderRadius};
`;
