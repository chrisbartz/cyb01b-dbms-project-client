import { combineReducers } from 'redux';
import pageProps from './pagePropsReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  pageProps,
  routing: routerReducer
});

export default rootReducer;
