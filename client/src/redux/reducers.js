import { combineReducers } from 'redux';
import {
  ADD_ADDRESS,
  BLOCK_ADDRESS,
  UNBLOCK_ADDRESS,
  VisibilityFilters,
  REQUEST_ADDRESSES,
  RECEIVE_ADDRESSES,
  TOGGLE_WIDGET,
  SET_VISIBILITY_FILTER
} from './actions';

const addresses = (state = { addresses: [] }, action) => {
  switch (action.type) {
    case REQUEST_ADDRESSES:
      return { ...state };
    case RECEIVE_ADDRESSES:
      return { ...state, addresses: action.addresses };
    case BLOCK_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.map(address => {
          return address._id === action._id
            ? { ...address, blockedStatus: 'Blocked' }
            : address;
        })
      };
    case UNBLOCK_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.map(address => {
          return address._id === action._id
            ? { ...address, blockedStatus: 'notBlocked' }
            : address;
        })
      };
    default:
      return state;
  }
};

const toggleWidget = (
  state = { widgets: [
    {
      fb: false,
      domain: 'facebook.com',
      https: true,
      port: 443,
      blockedStatus: 'notBlocked'
    },
    {
      lin: false,
      domain: 'linkedin.com',
      https: true,
      port: 443,
      blockedStatus: 'notBlocked'
    },
    {
      ttr: false,
      domain: 'twitter.com',
      https: true,
      port: 443,
      blockedStatus: 'notBlocked'
    },
    {
      igm: false,
      domain: 'instagram.com',
      https: true,
      port: 443,
      blockedStatus: 'notBlocked'
    },
    {
      red: false,
      domain: 'reddit.com',
      https: true,
      port: 443,
      blockedStatus: 'notBlocked'
    }
  ]},
  action
) => {
  switch (action.type) {

    case TOGGLE_WIDGET:
      return {...state, 
        widgets: state.widgets.map(item => (Object.keys(item).includes(action.id)) 
          ? { ...item, blockedStatus: 'Blocked', [action.id]: !item[action.id] }
          : item)
      }
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
  toggleWidget,
  visibilityFilter
});

export default rootReducer;
