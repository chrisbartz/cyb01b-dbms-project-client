import objectAssign from 'object-assign';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.

export default function pagePropsReducer(state = initialState.pageProps, action) {

  switch (action.type) {
    case types.UPDATE_PAGE_PROPS:
      // debugger;
      return objectAssign({}, state, action.pageProps);

    default:
      return state;
  }
}
