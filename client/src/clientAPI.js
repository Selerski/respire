const baseURL = 'http://localhost:3000/addresses'

exports.getAddresses = async () => {
  return fetch(baseURL).then( x => x.json()).then( x => x.sort((a,b)=> a.domain < b.domain ? -1 : 1));
}

exports.blockAddress = async (id) => {
  return fetch(`${baseURL}/${id}/block`, {
    method: 'PUT'
  }).then( x => x.json())
}

exports.unblockAddress = async (id) => {
  return fetch(`${baseURL}/${id}/unblock`, {
    method: 'PUT'
  }).then( x => x.json())
}