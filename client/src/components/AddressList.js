import React from 'react'
import PropTypes from 'prop-types'
import Address from './Address'


const AddressList = ({ addresses, onAddressClick }) => (
  <ul>
    {addresses.map((address, index) => (
      <Address key={index} {...address} onClick={() => onAddressClick(index)} />
    ))}
  </ul>
)

AddressList.propTypes = {
  addresses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      blocked: PropTypes.bool.isRequired,
      timed: PropTypes.bool.isRequired,
      time: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onAddressClick: PropTypes.func.isRequired
}

export default AddressList