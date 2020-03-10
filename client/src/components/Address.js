import React from 'react';
import Timer from './Timer';
import TimerBlockButton from './TimerBlockButton'
import './Address.css';


const Address = ({address, blockedStatus, children, onClick}) => {

  const buttonPanel = (blockedStatus === 'notBlocked') 
    ? <> <button>block</button><Timer /> </>
    : <TimerBlockButton time={120}/> 

  return (
      <div className='address'>
        { address.domain}
        { children }
        { buttonPanel }
      </div>
  )
}

export default Address