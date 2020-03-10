import React from 'react';
import Address from '../components/Address';

const AddressList = ({addresses, onClick}) => {

  return (
    <div>
      {addresses.map(address => <Address key={address.id} onClick={onClick} blockedStatus={address.blockedStatus} address={address}/>)}
    </div>

  )

}

export default AddressList;