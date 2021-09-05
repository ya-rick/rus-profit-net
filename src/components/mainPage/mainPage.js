import { Component } from "react";
import './mainPage.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Footer from "../footer";
import Questionnaires from "../questionnaires";
import Modal from "../modal";
import Authorization from "../authorization";
import MainFilterSearch from "../mainFilterSeach";
import ForgotPassword from "../forgot-password";
import ThanksForm from "../thanks-form";
import Vacancies from "../vacancies/vacancies";
import ImgText from "../imgText";
import MainFilterSearchWork from "../mainFilterSearchWork";
import HeaderNew from "../header";
import Error404 from "../error404";
import Register from "../register";
import VerifyWithSms from "../verifyWithSms";
import RedImg from "../../common/components/red-img";
import Vacancy from "../vacancy";
import Questionnaire from "../questionnaire";
import UserAgreement from "../userAgreement/userAgreement";
import AdvertMen from "../advertMen/advertMen";
import QuestionModalContent from "../FAQ/QuestionModalContent";
import FAQ from "../FAQ/FAQ";
import { ModalVariants } from '../../common/consts';
import { UserContext, ModalContext, PhotoContext, SearchResultContext } from "./contexts";

const modals = {
    [ModalVariants.Authorization]: Authorization,
    [ModalVariants.ForgotPassword]: ForgotPassword,
    [ModalVariants.VerifyWithSms]: VerifyWithSms,
    [ModalVariants.ThanksForm]: ThanksForm,
    [ModalVariants.FAQ]: QuestionModalContent,
    [ModalVariants.RedImg]: RedImg
};

export default class MainPage extends Component {

    constructor() {
        super();

        this.setCurrentModalName = this.setCurrentModalName.bind(this);
        this.openAuthModal = this.openAuthModal.bind(this);
        this.openForgotPasswordModal = this.openForgotPasswordModal.bind(this);
        this.openVerifyWithSmsModal = this.openVerifyWithSmsModal.bind(this);
        this.openThanksFormModal = this.openThanksFormModal.bind(this);
        this.openFAQModal = this.openFAQModal.bind(this);
        this.openRedImgModal = this.openRedImgModal.bind(this);
        this.setPhoto = this.setPhoto.bind(this);
        this.setResults = this.setResults.bind(this);
    }

    state = {
        currentModalName: null,
        photo: null,
        imgFile: null,
        user: {
            id: null
        },
        results: []
    };

    get isLoggedIn() {
        return this.state.user.id !== null;
    }

    setPhoto = (imgFile) => {
        this.setState({imgFile});
    }

    setResults(results) {
        this.setState({ results })
    }

    get currentModalExists() {
        return typeof ModalVariants[this.state.currentModalName] === 'string';
    }

    setCurrentModalName = (modalName) => {
        if (!modalName) {
            this.setState({ currentModalName: null });
        } else {
            this.setState({ currentModalName: modalName });
        }
    }

    openAuthModal() {
        this.setCurrentModalName(ModalVariants.Authorization);
    }

    openForgotPasswordModal() {
        this.setCurrentModalName(ModalVariants.ForgotPassword);
    }

    openVerifyWithSmsModal() {
        this.setCurrentModalName(ModalVariants.VerifyWithSms);
    }

    openThanksFormModal() {
        this.setCurrentModalName(ModalVariants.ThanksForm);
    }

    openFAQModal() {
        this.setCurrentModalName(ModalVariants.FAQ);
    }

    openRedImgModal() {
        this.setCurrentModalName(ModalVariants.RedImg);
    }

    onChangeProfession = (option) =>{
        this.setState({filter:option});
    }
    
    choosePhoto = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                photo: reader.result
            });
        };

        if (file) {
            reader.readAsDataURL(file);
            this.openRedImgModal();
        }
    }

    generateModalContextValue() {
        return {
            setCurrentModalName: this.setCurrentModalName,
            openAuthModal: this.openAuthModal,
            openForgotPasswordModal: this.openForgotPasswordModal,
            openVerifyWithSmsModal: this.openVerifyWithSmsModal,
            openThanksFormModal: this.openThanksFormModal,
            openFAQModal: this.openFAQModal,
            openRedImgModal: this.openRedImgModal
        }
    }

    render() {
        return (
            <ModalContext.Provider value={this.generateModalContextValue()}>
                <UserContext.Provider value={{
                    isLoggedIn: this.isLoggedIn,
                    setUserId: (id) => this.setState({ user: { id } })
                }}>
                    <SearchResultContext.Provider value={{
                                    results: this.state.results,
                                    setResults: this.setResults
                                }}>
                        <Router>
                            <div className='main-page'>
                                <HeaderNew/>
                                <Switch>
                                    <Route exact path='/'>
                                        <ImgText/>
                                    </Route>
                                    <Route path='/searchWorker'>
                                        <ImgText/>
                                        <MainFilterSearch onChange = {this.onChangeProfession}/>
                                    </Route>
                                    <Route path='/searchWork'>
                                        <ImgText/>
                                        <MainFilterSearchWork onChange = {this.onChangeProfession}/>
                                    </Route>
                                    <Route path='/questionaries'>
                                        <Questionnaires/>
                                    </Route>
                                    <Route path='/vacancies'>
                                        <Vacancies/>
                                    </Route>
                                    <Route path='/404'>
                                        <Error404/>
                                    </Route>
                                    <Route path='/register'>
                                        <PhotoContext.Provider value={{
                                            onImgChanged: this.choosePhoto,
                                            imgFile: this.state.imgFile,
                                            openRedImgModal: this.openRedImgModal
                                        }}>
                                            <Register/>
                                        </PhotoContext.Provider>
                                    </Route>
                                    <Route path='/userAgreement'>
                                        <UserAgreement/>
                                    </Route>
                                    <Route path='/advertMen'>
                                        <AdvertMen/>
                                    </Route>
                                    <Route path='/faq'>
                                        <FAQ/>
                                    </Route>
                                    <Route path='/vacancy/:id'>
                                        <Vacancy/>
                                    </Route>
                                    <Route path='/questionnaire/:id'>
                                        <Questionnaire/>
                                    </Route>
                                </Switch>
                                <Footer/>
                                <PhotoContext.Provider value={{
                                        img: this.state.photo,
                                        setPhoto: this.setPhoto,
                                        closeModal: () => this.setCurrentModalName(null)
                                    }}>
                                        
                                    {this.currentModalExists && <Modal
                                        closeModal={() => this.setCurrentModalName(null)}
                                        ModalContent={modals[this.state.currentModalName]}/>}
                                </PhotoContext.Provider>
                            </div>
                        </Router>
                    </SearchResultContext.Provider>
                </UserContext.Provider>
            </ModalContext.Provider>
        );
    }
};