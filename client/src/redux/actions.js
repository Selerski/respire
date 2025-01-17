// import fetch from "cross-fetch";
const baseURL = "http://localhost:3003/addresses";

export const ADD_ADDRESS = "ADD_ADDRESS";
export const BLOCK_ADDRESS = "BLOCK_ADDRESS";
export const BLOCK_WIDGET_ADDRESS = "BLOCK_WIDGET_ADDRESS";
export const UNBLOCK_WIDGET_ADDRESS = "UNBLOCK_WIDGET_ADDRESS";
export const TOGGLE_WIDGET = "TOGGLE_WIDGET";
export const UNBLOCK_ADDRESS = "UNBLOCK_ADDRESS";
export const REQUEST_ADDRESSES = "REQUEST_ADDRESSES";
export const RECEIVE_ADDRESSES = "RECEIVE_ADDRESSES";
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_BLOCKED: "SHOW_BLOCKED",
  SHOW_SEARCHED: "SHOW_SEARCHED",
};

export const addAddress = address => ({
  type: ADD_ADDRESS,
  address,
});

export const blockedAddress = address => ({
  type: BLOCK_ADDRESS,
  address,
});

export const unblockedAddress = address => ({
  type: UNBLOCK_ADDRESS,
  address,
});

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter,
});

export function requestAddresses() {
  return {
    type: REQUEST_ADDRESSES,
  };
}

function receiveAddresses(data) {
  return {
    type: RECEIVE_ADDRESSES,
    addresses: [...data],
    receivedAt: Date.now(),
  };
}

function shouldFetchAddresses (state) {
  if (state.addresses.addresses.length === 0) {
    return true;
  } else if (state.isFetching) {
    return false;
  } else {
    return (Date.now() - state.receivedAt) >= 30000
  }
}

export const fetchAddresses = () => dispatch => {
    return fetch(baseURL)
      .then(response => response.json())
      .then(data => {
        dispatch(receiveAddresses(data));
      })
      .catch(err => console.log("An error occurred.", err));
};

export function fetchIfNeeded () {

  return function (dispatch, getState) {
    if (shouldFetchAddresses(getState())) {
      // Dispatch a thunk
      return dispatch(fetchAddresses())
    } else {
      // We're not going to fetch; let the caller know about this.
      return Promise.resolve()
    }
  }
}

export const blockById = _id => dispatch => {
  return fetch(`${baseURL}/${_id}/block`, {
    method: "PUT",
  })
    .then(response => response.json())
    .then(data => {
      dispatch(blockedAddress(data));
    })
    .catch(err => console.log("An error occurred.", err));
};

export const unblockById = _id => dispatch => {
  return fetch(`${baseURL}/${_id}/unblock`, {
    method: "PUT",
  })
    .then(response => response.json())
    .then(data => {
      dispatch(unblockedAddress(data));
    })
    .catch(err => console.log("An error occurred.", err));
};

export const blockWidget = (
  { domain, https, port, blockedStatus },
  id
) => dispatch => {
  return fetch(
    `${baseURL}/widget/domain=${domain}&https=${https}&port=${port}&blockedStatus=${blockedStatus}`,
    {
      method: "PUT",
    }
  )
    .then(response => response.json())
    .then(data => {
      dispatch(blockById(data._id));
    })
    .catch(err => console.log("An error occurred.", err));
};

export const unblockWidget = (
  { domain, https, port, blockedStatus },
  id
) => dispatch => {
  return fetch(
    `${baseURL}/widget/domain=${domain}&https=${https}&port=${port}&blockedStatus=${blockedStatus}`,
    {
      method: "PUT",
    }
  )
    .then(response => response.json())
    .then(data => {
      dispatch(unblockById(data._id));
    })
    .catch(err => console.log("An error occurred.", err));
};

export const timeBlock = (_id, time) => dispatch => {
  return fetch(`${baseURL}/${_id}/timeblock?time=${time}`, {
    method: "PUT",
  })
    .then(response => response.json())
    .then(data => {
      dispatch(blockedAddress(data));
    })
    .catch(err => console.log("An error occurred.", err));
};
