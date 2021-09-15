import { inject, observer } from 'mobx-react';
import React from 'react';

import './modal.css';

import Background from '../../common/components/Background';
import Icon from '../../common/components/Icon';
import { ModalCloseImgWrapper, ModalContainer, ModalLayout } from '../../common/components/ModalStyles';


const Modal = inject('uiStore')(observer(({ 
        uiStore: { closeModal, currentModal: ModalContent }
    }) => {

    let backgroundRef = null;

    console.log(ModalContent)

    return(
        <Background
            ref={el => backgroundRef = el}
            onClick={e => e.target === backgroundRef && closeModal()}
        >
            <ModalContainer>
                <ModalLayout>
                    <ModalCloseImgWrapper onClick={closeModal}>
                        <Icon iconName={'exit'}/>
                    </ModalCloseImgWrapper>
                    
                    {ModalContent}
                </ModalLayout>
            </ModalContainer>
        </Background>
    );
}));

export default Modal;