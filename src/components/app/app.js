import React from "react";
import { ThemeProvider } from "styled-components";

import './app.css';
import MainPage from "../mainPage";
import { defaultStyles } from '../../common/consts';


const App = () =>{

    return(
        <ThemeProvider theme={defaultStyles}>
            <MainPage/>
        </ThemeProvider>
    );
};

export default App;