import React from "react";
import Background from "../../common/components/Background";
import Icon from "../../common/components/Icon";
import { ModalCloseImgWrapper, ModalContainer, ModalLayout } from "../../common/components/ModalStyles";
import './modal.css';

const Modal = ({closeModal, ModalContent, payload})=> {
    let backgroundRef = null;

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
                    
                    <ModalContent closeModal={closeModal} payload = {payload}/>
                </ModalLayout>
            </ModalContainer>
        </Background>
    );
};

export default Modal;