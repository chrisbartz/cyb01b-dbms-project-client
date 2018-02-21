import { combineReducers } from 'redux';
import pageProps from './pagePropsReducer';
import { routerReducer } from 'react-router-redux';
import "../styles/main.css";

const rootReducer = combineReducers({
  pageProps,
  routing: routerReducer
});

export default rootReducer;
