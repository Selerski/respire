import { combineReducers } from 'redux';
import {
  ADD_ADDRESS,
  BLOCK_ADDRESS,
  UNBLOCK_ADDRESS,
  VisibilityFilters,
  REQUEST_ADDRESSES,
  RECEIVE_ADDRESSES,
  SET_VISIBILITY_FILTER
} from './actions';

const addresses = (state = { addresses: [] }, action) => {
  switch (action.type) {
    case REQUEST_ADDRESSES:
      return { ...state };
    case RECEIVE_ADDRESSES:
      return { ...state, addresses: action.addresses };
    case BLOCK_ADDRESS:
      return {...state, addresses: state.addresses.map(address => {
        return (address._id === action.address._id
          ? { ...address, 
            blockedStatus: action.address.blockedStatus,
            blockedTimePeriod: action.address.blockedTimePeriod
          }
          : address)
        }
      )};
    case UNBLOCK_ADDRESS:
      return {...state, addresses: state.addresses.map(address => {
        return address._id === action._id
          ? { ...address, blockedStatus: 'notBlocked' }
          : address;
      })};
    default:
      return state;
  }
};

const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  addresses,
  visibilityFilter
});

export default rootReducer;
