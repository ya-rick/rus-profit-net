import { DefaultContainer } from '../../../common/components/Layouts';
import { RegularTextWrapper } from '../../../common/components/StaticPagesStyles';
import { ModalContent, ModalSubtitle, ModalTitle } from '../../../common/components/ModalStyles';
import styled from 'styled-components';
import { useRequest } from '../../../common/hooks';
import Loading from '../../../common/components/Loading';

export default function UserAgreement () {
    const { isLoading, result } = useRequest({ requestType: 'getPageLicense' });
    
    if (isLoading) return <Loading />;
    
    const { options } = result;

    return (
        <>
            <DefaultContainer>
                <ModalTitle>{options[4].block_title}</ModalTitle>
            </DefaultContainer>
                
            <ModalContent>

                <DefaultContainer>
                    <AgreementSubtitle>{options[0].block1_title}</AgreementSubtitle>
                </DefaultContainer>

                <RegularTextWrapper>{options[1].block1_subtitle}</RegularTextWrapper>

                <DefaultContainer>
                    <AgreementSubtitle>{options[2].block2_title}</AgreementSubtitle>
                </DefaultContainer>

                <RegularTextWrapper>{options[3].block2_subtitle}</RegularTextWrapper>

            </ModalContent>
        </>
    )
}

const AgreementSubtitle = styled(ModalSubtitle)`
    border: 2px solid #6F80A5;
    padding: .75rem;
    
    ${props => props.theme.smallBorderRadius};
`;
