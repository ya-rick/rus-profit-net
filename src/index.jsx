import React from 'react';
import { render } from 'react-snapshot';
import { ThemeProvider } from 'styled-components';
import { Provider as StoreProvider } from 'mobx-react';
import 'url-search-params-polyfill';

import App from './components/mainPage';
import RegistrationStore from './stores/RegistrationStore';
import LocaleService from './api/LocaleService';
import SearchStore from './stores/SearchStore';
import UIStore from './stores/UIStore';
import { THEME } from './common/consts';
import CreateEditStore from './stores/CreateEditStore';

const stores = {
  registrationStore: new RegistrationStore(),
  uiStore: new UIStore(),
  searchStore: new SearchStore(),
  createEditStore: new CreateEditStore(),
  localeService: LocaleService.getInstance()
}

Promise.allSettled([
  stores.uiStore.userModel.getUserData(),
  stores.localeService.loadErrors()
]).finally(() => {
    const root = document.getElementById('root');

    render( 
      <StoreProvider {...stores}>
        <ThemeProvider theme={THEME}>
          <App/>
        </ThemeProvider>
      </StoreProvider>,
      root
    );
  })


