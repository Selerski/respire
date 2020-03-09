/*
 * action types
 */

export const BLOCK_PAGE_TIMED_FORM = 'BLOCK_PAGE_TIMED_FORM';
// export const BLOCK_PAGE_TIMED_BUTTON = 'BLOCK_PAGE_TIMED_BUTTON';
export const BLOCK_PAGE_INDEFINITE = 'BLOCK_PAGE_INDEFINITE';
export const UNBLOCK_PAGE = 'UNBLOCK_PAGE';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

// Api call actions

export const FETCH_ADDRESSES_BEGIN   = 'FETCH_ADDRESSES_BEGIN';
export const FETCH_ADDRESSES_SUCCESS = 'FETCH_ADDRESSES_SUCCESS';
export const FETCH_ADDRESSES_FAILURE = 'FETCH_ADDRESSES_FAILURE';

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  //   SHOW_VISITED: 'SHOW_VISITED',
  SHOW_BLOCKED: 'SHOW_BLOCKED',
  SHOW_BLOCKED_INDEFINITE: 'SHOW_BLOCKED_INDEFINITE'
};

/*
 * action creators
 */

export function blockPageTimedForm(address, time) {
  return { type: BLOCK_PAGE_TIMED_FORM, address, time };
}

// export function blockPageTimedButton(address) {
//   return { type: BLOCK_PAGE_TIMED_BUTTON, address };
// }

export function blockPageIndefinite(address) {
  return { type: BLOCK_PAGE_INDEFINITE, address };
}

export function unblockPage(index) {
  return { type: UNBLOCK_PAGE, index };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}

export const fetchAddressesBegin = () => ({
    type: FETCH_ADDRESSES_BEGIN
  });
  
  export const fetchAddressSuccess = addresses => ({
    type: FETCH_ADDRESSES_SUCCESS,
    payload: { addresses }
  });
  
  export const fetchAddressFailure = error => ({
    type: FETCH_ADDRESSES_FAILURE,
    payload: { error }
  });

const baseURL = 'http://localhost:3003/addresses';

export function fetchProducts() {
  return dispatch => {
    dispatch(fetchAddressesBegin());
    return fetch(baseURL)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchAddressSuccess(json.products));
        return json.products;
      })
      .catch(error => dispatch(fetchAddressFailure(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

// exports.getAddresses = async () => {
//   return fetch(baseURL).then( x => x.json()).then( x => x.sort((a,b)=> a.domain < b.domain ? -1 : 1));
// }

// exports.blockAddress = async (id) => {
//   return fetch(`${baseURL}/${id}/block`, {
//     method: 'PUT'
//   }).then( x => x.json())
// }

// exports.unblockAddress = async (id) => {
//   return fetch(`${baseURL}/${id}/unblock`, {
//     method: 'PUT'
//   }).then( x => x.json())
// }

// exports.timeBlockAddress = async (id, time) => {
//   return fetch(`${baseURL}/${id}/timeblock/?time=${time}`, {
//     method: 'PUT'
//   }).then( x => x.json())
// }
