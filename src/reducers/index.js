import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import pageProps from './pagePropsReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  pageProps,
  fuelSavings,
  routing: routerReducer
});

export default rootReducer;
