import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Footer from '../footer';
import { SearchStoreResults } from '../SearchResults';
import Modal from '../modal';
import MainFilterSearch from '../mainFilterSeach';
import ImgText from '../imgText';
import Header from '../header';
import Error404 from '../error404';
import Register from '../register';
import UserAgreement from '../userAgreement/userAgreement';
import AdvertMen from '../advertMen/advertMen';
import EmailConfirmation from '../emailConfirmation';
import FAQ from '../FAQ/FAQ';
import UserProfile from '../userProfile';
import FullResult from '../SearchResults/FullResult';
import PasswordReset from '../passwordReset';
import PrivateRoute from '../../common/components/PrivateRoute';
import ScrollFix from './scrollFix';

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
            <Router>
                <ScrollFix/>
                <MainPageLayout>
                    <Header/>
                    
                    <Switch>
                        <Route path={'/searchWorker'}>
                            <ImgText/>
                            <MainFilterSearch/>
                        </Route>
                        <Route path={'/searchWork'}>
                            <ImgText/>
                            <MainFilterSearch/>
                        </Route>
                        <Route path={'/searchResults/:id'}>
                            <FullResult/>
                        </Route>
                        <Route path={'/searchResults'}>
                            <SearchStoreResults/>
                        </Route>
                        <Route path={'/register'}>
                            <Register/>
                        </Route>
                        <PrivateRoute
                            exact
                            path={[
                                '/profile/:page/:id',
                                '/profile/:page'
                            ]}
                        >
                            <UserProfile/>
                        </PrivateRoute>
                        <Route path={'/userAgreement'}>
                            <UserAgreement/>
                        </Route>
                        <Route path={'/advertMen'}>
                            <AdvertMen/>
                        </Route>
                        <Route path={'/faq'}>
                            <FAQ/>
                        </Route>
                        <Route path={'/email-confirmation/:id'}>
                            <EmailConfirmation/>
                        </Route>
                        <Route path={'/password-reset/:id'}>
                            <ImgText/>
                            <PasswordReset/>
                        </Route>
                        <Route exact path={'/'}>
                            <ImgText/>
                        </Route>
                        <Route path={'*'}>
                            <Error404/>
                        </Route>
                    </Switch>

                    <Footer/>
                    {this.props.uiStore.isModalOpened && <Modal/>}
                </MainPageLayout>
            </Router>
        );
    }
};

export default inject('uiStore')(observer(MainPage));

const MainPageLayout = styled.div`
    background: #F1F3F6;
    height: 100%;
    display: grid;
    grid-template-rows: auto minmax(max-content, 1fr) auto;
`;