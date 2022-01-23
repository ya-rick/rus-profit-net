import { inject, observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { DefaultContainer } from '../../../common/components/Layouts';

import { ModalContent, ModalSubtitle, ModalTitle } from '../../../common/components/ModalStyles';


const InfoModal = ({ uiStore: { modalPayload } }) => {
    return (
        <>
            <DefaultContainer>
                <ModalTitle>{modalPayload.title}</ModalTitle>
            </DefaultContainer>
            
            <InfoModalContent>

                <ModalSubtitle>
                    {modalPayload.description}
                </ModalSubtitle>

            </InfoModalContent>
        </>
    )
}

export default inject('uiStore')(observer(InfoModal));

const InfoModalContent = styled(ModalContent)`
    width: 250px;
`;
