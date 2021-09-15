import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Footer from '../footer';
import SearchResults from '../SearchResults';
import Modal from '../modal';
import MainFilterSearch from '../mainFilterSeach';
import ImgText from '../imgText';
import HeaderNew from '../header';
import Error404 from '../error404';
import Register from '../register';
import UserAgreement from '../userAgreement/userAgreement';
import AdvertMen from '../advertMen/advertMen';
import EmailConfirmation from '../emailConfirmation';
import FAQ from '../FAQ/FAQ';

import { UserContext, PhotoContext, SearchResultContext } from './contexts';
import styled from 'styled-components';
import FullResult from '../SearchResults/FullResult';
import PasswordReset from '../passwordReset';

class MainPage extends Component {

    state = {
        user: {
            id: null
        },
        results: []
    };

    get isLoggedIn() {
        return this.state.user.id !== null;
    }

    setResults(results) {
        this.setState({ results })
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
                        <MainPageLayout>
                            <HeaderNew
                                pathName={(new URL(window.location.href)).pathname}
                            />
                            <Switch>
                                <Route exact path='/'>
                                    <ImgText/>
                                </Route>
                                <Route path='/searchWorker'>
                                    <ImgText/>
                                    <MainFilterSearch/>
                                </Route>
                                <Route path='/searchWork'>
                                    <ImgText/>
                                    <MainFilterSearch/>
                                </Route>
                                <Route path='/searchResults/:searchType/:id'>
                                    <FullResult/>
                                </Route>
                                <Route path='/searchResults'>
                                    <SearchResults/>
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
                                <Route path='/email-confirmation/:id'>
                                    <EmailConfirmation/>
                                </Route>
                                <Route path='/password-reset/:id'>
                                    <PasswordReset/>
                                </Route>
                                <Route path='*'>
                                    <Error404/>
                                </Route>
                            </Switch>
                            <Footer/>
                            {this.props.uiStore.isModalOpened && <Modal/>}
                        </MainPageLayout>
                    </Router>
                </SearchResultContext.Provider>
            </UserContext.Provider>
        );
    }
};

export default inject('uiStore')(observer(MainPage));

const MainPageLayout = styled.div`
    background: #F1F3F6;
    height: 100%;
    display: grid;
    grid-template-rows: 65px minmax(max-content, 1fr) auto;
`;