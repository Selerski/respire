import fetch from "cross-fetch";

const baseURL = 'http://localhost:3003/addresses'

export const ADD_ADDRESS = "ADD_ADDRESS";
export const BLOCK_ADDRESS = "BLOCK_ADDRESS";
export const UNBLOCK_ADDRESS = "UNBLOCK_ADDRESS";
export const REQUEST_ADDRESSES = "REQUEST_ADDRESSES";
export const RECEIVE_ADDRESSES = "RECEIVE_ADDRESSES";
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

export const VisibilityFilters = {
    SHOW_ALL: "SHOW_ALL",
    SHOW_BLOCKED: "SHOW_BLOCKED",
};

export const addAddress = address => ({
  type: ADD_ADDRESS,
  address,
});

export const blockAddress = address => ({
  type: BLOCK_ADDRESS,
  address
})

export const unblockAddress = address => ({
  type: UNBLOCK_ADDRESS,
  address
})

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter,
});

export function requestPosts() {
  return {
    type: REQUEST_ADDRESSES
  };
}

export function receiveAddresses(json) {
  return {
    type: RECEIVE_ADDRESSES,
    addresses: json.data.children.map(child => child.data),
  };
}


function fetchPosts() {
    return dispatch => {
      dispatch(requestPosts());
      return fetch(baseURL)
        .then(response => response.json())
        .then(json => dispatch(receivePosts(json)));
    };
  }
