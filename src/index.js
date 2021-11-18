import React from 'react';
import { render } from 'react-snapshot';
import { ThemeProvider } from 'styled-components';
import { Provider as StoreProvider } from 'mobx-react';
import 'url-search-params-polyfill';

import App from './components/mainPage';
import RegistrationStore from './stores/RegistrationStore';
import SearchStore from './stores/SearchStore';
import UIStore from './stores/UIStore';
import { defaultStyles } from './common/consts';
import CreateEditStore from './stores/CreateEditStore';

const stores = {
  registrationStore: new RegistrationStore(),
  uiStore: new UIStore(),
  searchStore: new SearchStore(),
  createEditStore: new CreateEditStore()
}

stores.uiStore.userModel.getUserData()
  .finally(() => {
    const root = document.getElementById('root');

    render( 
      <StoreProvider {...stores}>
        <ThemeProvider theme={defaultStyles}>
          <App/>
        </ThemeProvider>
      </StoreProvider>,
      root
    );
  })


