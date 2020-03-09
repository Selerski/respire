import { combineReducers } from 'redux';
import { ADD_ADDRESS, BLOCK_ADDRESS, UNBLOCK_ADDRESS, VisibilityFilters, REQUEST_ADDRESSES, RECEIVE_ADDRESSES } from './actions';



const addresses = (state = {addresses: []}, action) => {

  switch(action.type) {


    case REQUEST_ADDRESSES:
      return Object.assign({}, state);
    case RECEIVE_ADDRESSES:
      return Object.assign({}, state, {addresses: action.addresses});
    case BLOCK_ADDRESS:
      return state.addresses.map(address =>
        address.id === action.id ? { ...address, blockedStatus: action.blockedStatus } : address
      )
    default:
      return state
  }


};

const visibilityFilter = (state=SHOW_ALL, action) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
          return action.filter
        default:
          return state
      }
};

const rootReducer = combineReducers({
    addresses,
    visibilityFilter
});
  
  export default rootReducer;