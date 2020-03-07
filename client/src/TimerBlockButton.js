import React, { useState, useEffect } from 'react';
import './TimerBlockButton.css';
import formatTime from './utils/formatTime';

const TimerBlockButton = props => {
  const [ timeRemaining, setTimeRemaining ] = useState(props.time);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = Math.floor(timeRemaining % 60);

  useEffect(
    () => {
        if (timeRemaining > 0) {
            let timer = setTimeout(
                () => {
                    setTimeRemaining(timeRemaining => timeRemaining - 1);
                    if (timeRemaining === 1) {
                      // dispatch({type: UNBLOCK_ADDRESS, payload: props.id})
                    };
                }, 1000);
            return () => clearTimeout(timer)
        }
    },
    // if this value changes, clear the timer and rerender
    [timeRemaining]
);

  if (!timeRemaining) return null;

  return (
    <div>
      <button className='timer-button' onClick={props.onClick}> 
        {formatTime(minutes)}:{formatTime(seconds)} 
      </button>
    </div>
  )

}

export default TimerBlockButton;