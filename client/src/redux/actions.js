// import fetch from "cross-fetch";
const baseURL = 'http://localhost:3003/addresses';

export const ADD_ADDRESS = 'ADD_ADDRESS';
export const BLOCK_ADDRESS = 'BLOCK_ADDRESS';
export const BLOCK_WIDGET_ADDRESS = 'BLOCK_WIDGET_ADDRESS';
export const UNBLOCK_WIDGET_ADDRESS = 'UNBLOCK_WIDGET_ADDRESS';
export const TOGGLE_WIDGET = 'TOGGLE_WIDGET';
export const UNBLOCK_ADDRESS = 'UNBLOCK_ADDRESS';
export const REQUEST_ADDRESSES = 'REQUEST_ADDRESSES';
export const RECEIVE_ADDRESSES = 'RECEIVE_ADDRESSES';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_BLOCKED: 'SHOW_BLOCKED'
};

export const addAddress = address => ({
  type: ADD_ADDRESS,
  address
});

export const blockedAddress = (_id) => ({
  type: BLOCK_ADDRESS,
  _id
});

export const unblockedAddress = (_id) => ({
  type: UNBLOCK_ADDRESS,
  _id
});

export const toggleWidget = (id) => ({
  type: TOGGLE_WIDGET,
  id
})

export const blockedWidgetAddress = (domain) => ({
  type: BLOCK_WIDGET_ADDRESS,
  domain
});

export const unblockedWidgetAddress = (domain) => ({
  type: UNBLOCK_WIDGET_ADDRESS,
  domain
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
    .then(data => {dispatch(blockedAddress(data._id))})
    .catch(err => console.log('An error occurred.', err));
};

export const unblockById = (_id) => (dispatch) => {
    return fetch(`${baseURL}/${_id}/unblock`, {
      method: 'PUT'
    })
    .then(response => response.json())
    .then(data => {dispatch(unblockedAddress(data._id))})
    .catch(err => console.log('An error occurred.', err));
};

export const blockWidget = ({domain,https,port,blockedStatus}, id) => (dispatch) => {
    return fetch(`${baseURL}/widget/domain=${domain}&https=${https}&port=${port}&blockedStatus=${blockedStatus}`, {
      method: 'PUT'
    })
    .then(response => response.json())
    .then(data => {return dispatch(blockById(data._id))}).then(() => dispatch(toggleWidget(id)))
    .catch(err => console.log('An error occurred.', err));
};

export const unblockWidget = ({domain,https,port,blockedStatus}, id) => (dispatch) => {
    return fetch(`${baseURL}/widget/domain=${domain}&https=${https}&port=${port}&blockedStatus=${blockedStatus}`, {
      method: 'PUT'
    })
    .then(response => response.json())
    .then(data => {return dispatch(unblockById(data._id))}).then(() => dispatch(toggleWidget(id)))
    .catch(err => console.log('An error occurred.', err));
};


