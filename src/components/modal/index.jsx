import { inject, observer } from 'mobx-react';
import React from 'react';

import Background from '../../common/components/Background';
import { ModalContainer, ModalLayout, ReplacedIcon } from '../../common/components/ModalStyles';


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
                <ReplacedIcon
                    cursorDefault
                    iconName={'exit'}
                    size={'xxs'}
                    onClick={closeModal}
                />
                <ModalLayout>
                    {ModalContent}
                </ModalLayout>
            </ModalContainer>
        </Background>
    );
}));

export default Modal;