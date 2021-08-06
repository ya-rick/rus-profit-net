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

export default class MainPage extends Component {

    state = {
        modalActive: false,
        idModal: null,
        filter: 'nanny'
    };

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

    render() {
        const {modalActive, filter} = this.state;
        const element = this.getElementFilter(filter);
        const modals = [
            <Authorization onGetID={this.setIdModal}/>,
            <ForgotPassword onGetID={this.setIdModal}/>,
            <ThanksForm/>];
        return (
            <Router>
                <div className='main-page'>
                    <Header onGetId={this.setIdModal}/>
                    <Switch>
                        <Route exact path='/'>
                            <ImgText/>
                        </Route>
                        <Route path='/searchWorker'>
                            <ImgText/>
                            <MainFilterSearch onChange = {this.onChangeProfession}/>
                            {element}
                            <Footer/>
                        </Route>
                        <Route path='/searchWork'>
                            <ImgText/>
                            <MainFilterSearchWork onChange = {this.onChangeProfession}/>
                            {element}
                            <Footer/>
                        </Route>
                        <Route path='/questionaries'>
                            <Questionnaires/>
                            <Footer/>
                        </Route>
                        <Route path='/vacancies'>
                            <Vacancies/>
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