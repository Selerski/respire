import { combineReducers } from 'redux';
import {
  BLOCK_ADDRESS,
  UNBLOCK_ADDRESS,
  VisibilityFilters,
  REQUEST_ADDRESSES,
  RECEIVE_ADDRESSES,
  SET_VISIBILITY_FILTER
} from './actions';

const initialState = {
  isFetching: false,
  receivedAt: Date.now(),
  addresses: [],
  widgets: [
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
  ]
}

const addresses = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ADDRESSES:
      return { ...state, isFetching: true };
    case RECEIVE_ADDRESSES:
      return { ...state, addresses: action.addresses, receivedAt: action.receivedAt, isFetching: false };
    case BLOCK_ADDRESS:
      return {
        ...state,
        widgets: state.widgets.map(item => {
          return item.domain === action.address.domain
            ? {
                ...item,
                blockedStatus: 'Blocked',
                [Object.keys(item)[0]]: !item[Object.keys(item)[0]]
              }
            : item;
        }),
        addresses: state.addresses.map(address => {
          return address._id === action.address._id
            ? {
                ...address,
                blockedStatus: action.address.blockedStatus,
                blockedTimePeriod: action.address.blockedTimePeriod
              }
            : address;
        })
      };
    case UNBLOCK_ADDRESS:
      return {
        ...state,
        widgets: state.widgets.map(item => {
          return item.domain === action.address.domain
            ? {
                ...item,
                blockedStatus: 'notBlocked',
                [Object.keys(item)[0]]: !item[Object.keys(item)[0]]
              }
            : item;
        }),
        addresses: state.addresses.map(address => {
          return address._id === action.address._id
            ? { ...address, blockedStatus: 'notBlocked' }
            : address;
        })
      };
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
