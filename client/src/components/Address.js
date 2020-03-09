import React from 'react'
import PropTypes from 'prop-types'

const Address = ({ onClick, blocked, address }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: blocked ? 'line-through' : 'none'
    }}
  >
    {address}
  </li>
)

Address.propTypes = {
  onClick: PropTypes.func.isRequired,
  blocked: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired
}

export default Address