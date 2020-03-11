// import fetch from "cross-fetch";
const baseURL = 'http://localhost:3003/addresses';

export const ADD_ADDRESS = 'ADD_ADDRESS';
export const BLOCK_ADDRESS = 'BLOCK_ADDRESS';
export const UNBLOCK_ADDRESS = 'UNBLOCK_ADDRESS';
export const REQUEST_ADDRESSES = 'REQUEST_ADDRESSES';
export const RECEIVE_ADDRESSES = 'RECEIVE_ADDRESSES';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_BLOCKED: 'SHOW_BLOCKED',
  SHOW_SEARCHED: 'SHOW_SEARCHED'
};

export const addAddress = address => ({
  type: ADD_ADDRESS,
  address
});

export const blockedAddress = (address) => ({
  type: BLOCK_ADDRESS,
  address
});

export const unblockedAddress = (_id) => ({
  type: UNBLOCK_ADDRESS,
  _id
});

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
});

export function requestAddresses() {
  return {
    type: REQUEST_ADDRESSES
  };
}

function receiveAddresses(data) {
  return {
    type: RECEIVE_ADDRESSES,
    addresses: [...data]
  };
}

export const fetchAddresses = () => dispatch => {
  return fetch(baseURL)
    .then(response => response.json())
    .then(data => {
      dispatch(receiveAddresses(data));
    })
    .catch(err => console.log('An error occurred.', err));
};


export const blockById = (_id) => (dispatch) => {
  return fetch(`${baseURL}/${_id}/block`, {
    method: 'PUT'
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log(`Address ${data.domain} successfully blocked!`); dispatch(blockedAddress(data))})
    .catch(err => console.log('An error occurred.', err));
};

export const unblockById = (_id) => (dispatch) => {
    return fetch(`${baseURL}/${_id}/unblock`, {
      method: 'PUT'
    })
    .then(response => response.json())
    .then(data => {console.log(`Address ${data.domain} successfully unblocked!`); dispatch(unblockedAddress(data._id))})
    .catch(err => console.log('An error occurred.', err));
};

export const timeBlock = (_id, time) => (dispatch) => {
  return fetch(`${baseURL}/${_id}/timeblock?time=${time}`, {
    method: 'PUT'
  })
    .then(response => response.json())
    .then(data => {
      console.log(`Address ${data.domain} successfully blocked!`); 
      dispatch(blockedAddress(data))})
    .catch(err => console.log('An error occurred.', err));
}