import { action, makeAutoObservable } from 'mobx';

import { ModalVariants } from '../common/consts';
import QuestionModalContent from '../components/FAQ/QuestionModalContent';
import Authorization from '../components/authorization';
import ForgotPassword from '../components/forgot-password';
import ThanksForm from '../components/modal/thanks-form';
import RedImg from '../common/components/red-img';

const modals = {
    [ModalVariants.Authorization]: <Authorization/>,
    [ModalVariants.ForgotPassword]: <ForgotPassword/>,
    [ModalVariants.ThanksForm]: <ThanksForm/>,
    [ModalVariants.FAQ]: <QuestionModalContent/>,
    [ModalVariants.RedImg]: <RedImg/>
};

export default class UIStore {

    currentModal = null;
    modalPayload = null;
    onCloseCallback = null;

    constructor() {
        makeAutoObservable(this, {
            openModal: action.bound,
            closeModal: action.bound
        });
    }

    get isModalOpened() {
        return Boolean(this.currentModal);
    }

    openModal(modalType, modalPayload = null, onCloseCallback) {
        this.currentModal = modals[modalType];
        this.modalPayload = modalPayload;
        this.onCloseCallback = onCloseCallback;
    }

    closeModal() {
        this.currentModal = null;
        this.modalPayload = null;
        this.onCloseCallback = null;
    }

}

