import {Component, createContext} from "react";
import './mainPage.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Footer from "../footer";
import Questionnaires from "../questionnaires";
import MenuDoctor from "../menuDoctor";
import Modal from "../modal";
import Authorization from "../authorization";
import MainFilterSearch from "../mainFilterSeach";
import ForgotPassword from "../forgot-password";
import ThanksForm from "../thanks-form";
import Vacancies from "../vacancies/vacancies";
import ImgText from "../imgText";
import MenuNanny from "../menuNanny";
import MainFilterSearchWork from "../mainFilterSearchWork";
import HeaderNew from "../header2";
import Error404 from "../error404";
import Register from "../register";
import RegisterVacancies from "../registerVacancies";
import RegisterQuestionaries from "../registerQuestionaries";
import VerifyWithSms from "../verifyWithSms";
import UserAgreement from "../userAgreement/userAgreement";
import QuestionModalContent from "../FAQ/QuestionModalContent";
import FAQ from "../FAQ/FAQ";
import { ModalVariants } from '../../common/consts';

const modals = {
    [ModalVariants.Authorization]: Authorization,
    [ModalVariants.ForgotPassword]: ForgotPassword,
    [ModalVariants.VerifyWithSms]: VerifyWithSms,
    [ModalVariants.ThanksForm]: ThanksForm,
    [ModalVariants.FAQ]: QuestionModalContent,
};

export const ModalContext = createContext();

export default class MainPage extends Component {

    constructor() {
        super();

        this.setCurrentModalName = this.setCurrentModalName.bind(this);
        this.openAuthModal = this.openAuthModal.bind(this);
        this.openForgotPasswordModal = this.openForgotPasswordModal.bind(this);
        this.openVerifyWithSmsModal = this.openVerifyWithSmsModal.bind(this);
        this.openThanksFormModal = this.openThanksFormModal.bind(this);
        this.openFAQModal = this.openFAQModal.bind(this);
    }

    state = {
        modalActive: true,
        currentModalName: null,
        filter: 'nanny'
    };

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

    onChangeProfession = (option) =>{
        this.setState({filter:option});
    }

    getElementFilter = (filter)=>{
        const {value} = filter;
        if(value === 'nanny'){
            return (<MenuNanny/>);
        }else if (value ==='doctor'){
            return (<MenuDoctor/>);
        }
    }

    generateModalContextValue() {
        return {
            setCurrentModalName: this.setCurrentModalName,
            openAuthModal: this.openAuthModal,
            openForgotPasswordModal: this.openForgotPasswordModal,
            openVerifyWithSmsModal: this.openVerifyWithSmsModal,
            openThanksFormModal: this.openThanksFormModal,
            openFAQModal: this.openFAQModal
        }
    }

    render() {
        const {filter} = this.state;
        const element = this.getElementFilter(filter);
        
        return (
            <ModalContext.Provider value={this.generateModalContextValue()}>
                <Router>
                    <div className='main-page'>
                        <Switch>
                            <Route exact path='/'>
                                <HeaderNew/>
                                <ImgText/>
                                <Footer/>
                            </Route>
                            <Route path='/searchWorker'>
                                <HeaderNew/>
                                <ImgText/>
                                <MainFilterSearch onChange = {this.onChangeProfession}/>
                                {element}
                                <Footer/>
                            </Route>
                            <Route path='/searchWork'>
                                <HeaderNew/>
                                <ImgText/>
                                <MainFilterSearchWork onChange = {this.onChangeProfession}/>
                                {element}
                                <Footer/>
                            </Route>
                            <Route path='/questionaries'>
                                <HeaderNew/>
                                <Questionnaires/>
                                <Footer/>
                            </Route>
                            <Route path='/vacancies'>
                                <HeaderNew/>
                                <Vacancies/>
                                <Footer/>
                            </Route>
                            <Route path='/404'>
                                <HeaderNew/>
                                <Error404/>
                            </Route>
                            <Route path='/register'>
                                <Register/>
                            </Route>
                            <Route path='/registerVacancies'>
                                <HeaderNew/>
                                <RegisterVacancies/>
                                <Footer/>
                            </Route>
                            <Route path='/registerQuestionaries'>
                                <HeaderNew/>
                                <RegisterQuestionaries/>
                                <Footer/>
                            </Route>
                            <Route path='/userAgreement'>
                                <HeaderNew/>
                                <UserAgreement/>
                                <Footer/>
                            </Route>
                            <Route path='/faq'>
                                <HeaderNew/>
                                <FAQ/>
                                <Footer/>
                            </Route>
                        </Switch>
                        {this.currentModalExists && <Modal
                            closeModal={() => this.setCurrentModalName(null)}
                            ModalContent={modals[this.state.currentModalName]}/>}
                    </div>
                </Router>
            </ModalContext.Provider>
        );
    }
};