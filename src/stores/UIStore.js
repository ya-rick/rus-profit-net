import { action, makeAutoObservable } from 'mobx';

import { ModalVariants } from '../common/consts';
import QuestionModalContent from '../components/FAQ/QuestionModalContent';
import Authorization from '../components/authorization';
import ForgotPassword from '../components/forgot-password';
import InfoModal from '../components/modal/info-form';
import RedImg from '../common/components/red-img';
import { requestWithParams } from '../api/exchangeLayer';

const modals = {
    [ModalVariants.Authorization]: <Authorization/>,
    [ModalVariants.ForgotPassword]: <ForgotPassword/>,
    [ModalVariants.InfoModal]: <InfoModal/>,
    [ModalVariants.FAQ]: <QuestionModalContent/>,
    [ModalVariants.RedImg]: <RedImg/>
};

export default class UIStore {

    user = null;

    currentModal = null;
    modalPayload = null;
    onCloseCallback = null;

    constructor() {
        makeAutoObservable(this, {
            openModal: action.bound,
            closeModal: action.bound,
            userLogin: action.bound,
            getUserData: action.bound,
            userLogout: action.bound,
        });
    }

    get isUserAuthenticated() {
        return this.user !== null;
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

    async getUserData() {
        try {
            this.user = await requestWithParams('getUserData', {
                user_id: null
            });
        } catch(e) {
            this.user = null;
        }
    }

    async userLogin(email, password) {

        await requestWithParams('login', {
            email, password
        });

        await this.getUserData();
    }

    async userLogout() {
        try {
            await requestWithParams('logout');
        } catch(e) {
            console.error(e);
        } finally {
            this.user = null;
        }

    }

}

