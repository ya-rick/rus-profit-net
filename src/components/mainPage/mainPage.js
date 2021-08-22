import React, {Component} from "react";
import './mainPage.css';
import Header from "../header";
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
import RedImg from "../red-img";
import HeaderAfterReg from "../headerAfterReg";
import Vacancy from "../vacancy";
import Questionnaire from "../questionnaire";

export default class MainPage extends Component {

    state = {
        modalActive: false,
        idModal: null,
        filter: 'nanny',
        photo: null
    };

    setPhoto = (photo)=>{
        this.setState({photo});
    }

    setIdModal = (id) => {
        const {modalActive} = this.state;
        if (modalActive) {
            if(id===1000){
                this.setModalActive(false);
            }else{
                this.setState({idModal: id});
            }
        } else {
            this.setState({idModal: id});
            this.setModalActive();
        }
    }


    setModalActive = () => {
        const {modalActive} = this.state;
        this.setState({modalActive: !modalActive});
    };

    getChildren = (list) => {
        const {idModal} = this.state;
        return list[idModal];
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
            this.setIdModal(4);
        }
    }


    render() {
        const {modalActive, filter, photo} = this.state;
        const element = this.getElementFilter(filter);
        const modals = [
            <Authorization onGetID={this.setIdModal}/>,
            <ForgotPassword onGetID={this.setIdModal}/>,
            <ThanksForm/>,
            <VerifyWithSms/>,
            <RedImg image={this.state.photo} setPhoto={this.setPhoto}/>
        ];
        return (
            <Router>
                <div className='main-page'>
                    <Switch>
                        <Route exact path='/'>
                            <Header onGetId={this.setIdModal}/>
                            <ImgText/>
                        </Route>
                        <Route path='/searchWorker'>
                            <HeaderNew onGetId={this.setIdModal}/>
                            <ImgText/>
                            <MainFilterSearch onChange = {this.onChangeProfession}/>
                            {element}
                            <Footer/>
                        </Route>
                        <Route path='/searchWork'>
                            <HeaderNew onGetId={this.setIdModal}/>
                            <ImgText/>
                            <MainFilterSearchWork onChange = {this.onChangeProfession}/>
                            {element}
                            <Footer/>
                        </Route>
                        <Route path='/questionaries'>
                            <HeaderNew onGetId={this.setIdModal}/>
                            <Questionnaires/>
                            <Footer/>
                        </Route>
                        <Route path='/vacancies'>
                            <HeaderNew onGetId={this.setIdModal}/>
                            <Vacancies/>
                            <Footer/>
                        </Route>
                        <Route path='/404'>
                            <HeaderNew onGetId={this.setIdModal}/>
                            <Error404/>
                        </Route>
                        <Route path='/register'>
                            <Register/>
                        </Route>
                        <Route path='/registerVacancies'>
                            <HeaderNew onGetId={this.setIdModal}/>
                            <RegisterVacancies onGetId={this.setIdModal}/>
                            <Footer/>
                        </Route>
                        <Route path='/registerQuestionaries'>
                            <HeaderNew onGetId={this.setIdModal}/>
                            <RegisterQuestionaries photo={this.choosePhoto} img={this.state.photo} onGetId={this.setIdModal}/>
                            <Footer/>
                        </Route>
                        <Route path='/vacancy'>
                            <HeaderAfterReg/>
                            <Vacancy/>
                            <Footer/>
                        </Route>
                        <Route path='/questionnaire'>
                            <HeaderAfterReg/>
                            <Questionnaire/>
                            <Footer/>
                        </Route>
                    </Switch>
                    <Modal active={modalActive} setActive={this.setModalActive}>
                        {this.getChildren(modals)}
                    </Modal>
                </div>
            </Router>
        );
    }
};