/* eslint react/prop-types: "off" */

import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from '../store';
// import RootScreen from 'components/RootScreen';

export default ({children}) => (
  <Provider store={store}>
    <PersistGate
      // loading={<RootScreen />}
      persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);
