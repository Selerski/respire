import React from 'react';
import Address from '../components/Address';

const AddressList = ({addresses}) => {

  return (
    <div>
      {addresses.map(address => <Address key={address._id} blockedStatus={address.blockedStatus} address={address}/>)}
    </div>
  )

}

export default AddressList;