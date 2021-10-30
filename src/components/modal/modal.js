import { inject, observer } from 'mobx-react';
import React from 'react';

import './modal.css';

import Background from '../../common/components/Background';
import { ModalContainer, ModalLayout } from '../../common/components/ModalStyles';


const Modal = inject('uiStore')(observer(({ 
        uiStore: { closeModal, currentModal: ModalContent }
    }) => {

    let backgroundRef = null;

    function backgroundClicked(e) {
        e.stopPropagation();

        e.target === backgroundRef && closeModal();
    }

    return(
        <Background
            ref={el => backgroundRef = el}
            onClick={backgroundClicked}
        >
            <ModalContainer>
                <ModalLayout>
                    {ModalContent}
                </ModalLayout>
            </ModalContainer>
        </Background>
    );
}));

export default Modal;