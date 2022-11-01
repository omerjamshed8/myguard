import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appReducer from 'reducers';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  const {logger} = require(`redux-logger`);

  middlewares.push(logger);
}

middlewares.push(thunk);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

const persistor = persistStore(store);

export {store as default, persistor};
