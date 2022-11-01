import {combineReducers} from 'redux';
import authReducer from './redux/reducer/auth-reducer';

const appReducer = combineReducers({
  auth: authReducer,
});

// export default appReducer;
export default (state, action) => {
  return appReducer(state, action);
};
