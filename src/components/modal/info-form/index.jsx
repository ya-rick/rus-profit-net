import { inject, observer } from 'mobx-react';
import React from 'react';
import { DefaultContainer } from '../../../common/components/Layouts';

import { ModalContent, ModalSubtitle, ModalTitle } from '../../../common/components/ModalStyles';


const InfoModal = ({ uiStore: { modalPayload } }) => {
    return (
        <>
            <DefaultContainer>
                <ModalTitle>{modalPayload.title}</ModalTitle>
            </DefaultContainer>
            
            <ModalContent>

                <ModalSubtitle>
                    {modalPayload.description}
                </ModalSubtitle>

            </ModalContent>
        </>
    )
}

export default inject('uiStore')(observer(InfoModal));