import { combineReducers } from 'redux';
import {
  FETCH_ADDRESSES_BEGIN,
  FETCH_ADDRESSES_SUCCESS,
  FETCH_ADDRESSES_FAILURE,
  BLOCK_PAGE_TIMED_FORM,
  //   BLOCK_PAGE_TIMED_BUTTON,
  BLOCK_PAGE_INDEFINITE,
  UNBLOCK_PAGE,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions';

const { SHOW_ALL } = VisibilityFilters;

const initialState = {
  addresses: [],
  loading: false,
  error: null
};

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function addressFetch(state = initialState, action) {
  switch (action.type) {
    case FETCH_ADDRESSES_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_ADDRESSES_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        addresses: action.payload
      };

    case FETCH_ADDRESSES_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        addresses: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

function pages(state = [], action) {
  switch (action.type) {
    case BLOCK_PAGE_TIMED_FORM:
      return [
        ...state,
        {
          address: action.address,
          blocked: true,
          timed: true,
          time: action.time
        }
      ];
    case BLOCK_PAGE_INDEFINITE:
      return [
        ...state,
        {
          address: action.address,
          blocked: true,
          timed: false,
          time: 0
        }
      ];
    case UNBLOCK_PAGE:
      return state.map((address, index) => {
        if (index === action.index) {
          return Object.assign({}, address, {
            blocked: false,
            timed: false,
            time: 0
          });
        }
        return address;
      });
    default:
      return state;
  }
}

const respireApp = combineReducers({
  visibilityFilter,
  addressFetch,
  pages
});

export default respireApp;
