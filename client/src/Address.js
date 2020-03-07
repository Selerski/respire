import React from 'react';
import Timer from './Timer';
import TimerBlockButton from './TimerBlockButton'
import './Address.css';


const Address = ({blockedStatus, children, onClick}) => {
  
  const buttonPanel = (blockedStatus === 'notBlocked') 
    ? <> <button>block</button><Timer /> </>
    : <TimerBlockButton time={120}/> 

  return (
      <div className='address'>
        { children }
        { buttonPanel }
      </div>
  )
}

export default Address