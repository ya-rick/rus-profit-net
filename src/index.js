import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Provider as StoreProvider } from 'mobx-react';

import App from './components/mainPage';
import RegistrationStore from './stores/RegistrationStore';
import SearchStore from './stores/SearchStore';
import UIStore from './stores/UIStore';
import { defaultStyles } from './common/consts';

const stores = {
  registrationStore: new RegistrationStore(),
  uiStore: new UIStore(),
  searchStore: new SearchStore(),
}

stores.uiStore.userModel.getUserData()
  .finally(() => {
    ReactDOM.render( 
      <StoreProvider {...stores}>
        <ThemeProvider theme={defaultStyles}>
          <App/>
        </ThemeProvider>
      </StoreProvider> ,
      document.getElementById('root')
    );
  })


