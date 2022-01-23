import { action, makeAutoObservable } from 'mobx';

import { ModalVariants } from '../common/consts';
import QuestionModalContent from '../components/modal/faq';
import Authorization from '../components/modal/authorization';
import ForgotPassword from '../components/forgot-password';
import InfoModal from '../components/modal/info-form';
import RedImg from '../common/components/red-img';
import PasswordResetModal from '../components/modal/password-reset';
import UserModel from './Models/UserModel'
import UnregisteredInfo from '../components/modal/unregistered-info';
import Share from '../components/modal/share';
import UserAgreement from '../components/modal/userAgreement';

const modals = {
    [ModalVariants.Authorization]: <Authorization />,
    [ModalVariants.ForgotPassword]: <ForgotPassword />,
    [ModalVariants.InfoModal]: <InfoModal />,
    [ModalVariants.FAQ]: <QuestionModalContent />,
    [ModalVariants.RedImg]: <RedImg />,
    [ModalVariants.PasswordResetModal]: <PasswordResetModal />,
    [ModalVariants.UnregisteredInfo]: <UnregisteredInfo />,
    [ModalVariants.Share]: <Share />,
    [ModalVariants.UserAgreement]: <UserAgreement />,
};

export default class UIStore {

    userModel = null;

    currentModal = null;
    modalPayload = null;
    onCloseCallback = null;

    currentImageIndex = null;
    allImagesLinks = [];

    constructor() {
        this.userModel = new UserModel();

        makeAutoObservable(this, {
            openModal: action.bound,
            closeModal: action.bound,
            hideImage: action.bound,
            openImage: action.bound,
            setImages: action.bound,
            goToNextImage: action.bound,
            goToPreviousImage: action.bound,
        });
    }

    get isImageShown() {
        return this.currentImageIndex !== null;
    }

    get currentImage() {
        return this.isImageShown && this.allImagesLinks[this.currentImageIndex];
    }

    get hasPreviousImage() {
        return this.currentImageIndex > 0;
    }

    get hasNextImage() {
        return this.currentImageIndex < this.allImagesLinks.length - 1;
    }

    goToNextImage() {
        if (this.hasNextImage) this.currentImageIndex += 1;
    }

    goToPreviousImage() {
        if (this.hasPreviousImage) this.currentImageIndex -= 1;
    }

    setImages(images) {
        this.allImagesLinks = images;
    }

    hideImage() {
        this.currentImageIndex = null;
    }

    openImage(index) {
        this.currentImageIndex = index;
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

