import React from "react";
import { ThemeProvider } from "styled-components";
import { Provider as StoreProvider } from 'mobx-react';

import MainPage from "../mainPage";
import { defaultStyles } from '../../common/consts';
import RegistrationStore from '../../stores/RegistrationStore'
import UIStore from "../../stores/UIStore";
import MainFiltersStore from "../../stores/MainFiltersStore";
import SearchStore from "../../stores/SearchStore";


const stores = {
    registrationStore: new RegistrationStore(),
    uiStore: new UIStore(),
    mainFiltersStore: new MainFiltersStore(),
    searchStore: new SearchStore(),
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