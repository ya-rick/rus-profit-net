import React from "react";
import { ThemeProvider } from "styled-components";
import { Provider as StoreProvider } from 'mobx-react';

import './app.css';
import MainPage from "../mainPage";
import { defaultStyles } from '../../common/consts';
import RegistrationStore from '../../stores/RegistrationStore'


const stores = {
    registrationStore: new RegistrationStore()
}

const App = () =>{
    return(
        <StoreProvider {...stores}>
            <ThemeProvider theme={defaultStyles}>
                <MainPage/>
            </ThemeProvider>
        </StoreProvider>
    );
};

export default App;