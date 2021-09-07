import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './mainPage.css';
import Footer from '../footer';
import Questionnaires from '../questionnaires';
import Modal from '../modal';
import MainFilterSearch from '../mainFilterSeach';
import Vacancies from '../vacancies/vacancies';
import ImgText from '../imgText';
import MainFilterSearchWork from '../mainFilterSearchWork';
import HeaderNew from '../header';
import Error404 from '../error404';
import Register from '../register';
import Vacancy from '../vacancy';
import Questionnaire from '../questionnaire';
import UserAgreement from '../userAgreement/userAgreement';
import AdvertMen from '../advertMen/advertMen';
import EmailConfirmation from '../emailConfirmation';
import FAQ from '../FAQ/FAQ';

import { UserContext, PhotoContext, SearchResultContext } from './contexts';

class MainPage extends Component {

    constructor() {
        super();

        this.setPhoto = this.setPhoto.bind(this);
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

    onChangeProfession = (option) =>{
        this.setState({filter:option});
    }

    render() {
        return (
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
                                <Route path='/email-confirmation/:id'>
                                    <EmailConfirmation/>
                                </Route>
                                <Route path='*'>
                                    <Error404/>
                                </Route>
                            </Switch>
                            <Footer/>
                            <PhotoContext.Provider value={{
                                    img: this.state.photo,
                                    setPhoto: this.setPhoto,
                                    closeModal: () => this.setCurrentModalName(null)
                                }}>
                                    
                                {this.props.uiStore.isModalOpened && <Modal/>}
                            </PhotoContext.Provider>
                        </div>
                    </Router>
                </SearchResultContext.Provider>
            </UserContext.Provider>
        );
    }
};

export default inject('uiStore')(observer(MainPage));
