import React from 'react';
import Timer from './Timer';
import './Address.css';


const Address = ({blockedStatus, children, onClick}) => {
  
  const buttonPanel = (blockedStatus === 'notBlocked') 
    ? <span> <button>block me</button> <Timer /> </span>
    : <button>unblock me</button>

  return (
      <div className='address'>
        { children }
        { buttonPanel }
      </div>
  )
}

export default Address