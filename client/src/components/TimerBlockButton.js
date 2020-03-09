import React, { useState, useEffect } from 'react';
import { Reveal } from 'semantic-ui-react';
import './TimerBlockButton.css';
import formatTime from '../utils/formatTime';

const TimerBlockButton = props => {
  const [ timeRemaining, setTimeRemaining ] = useState(props.time);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = Math.floor(timeRemaining % 60);

  useEffect(
    () => {
        if (timeRemaining > 1) {
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
    <Reveal animated='fade' className='timer' onClick={props.onClick}>
      <Reveal.Content visible>
        <div className="timer-content"> 
          {formatTime(minutes)}:{formatTime(seconds)} 
        </div>
      </Reveal.Content>
      <Reveal.Content hidden className="timer-content unblock">
        <div> 
          unblock
        </div>
      </Reveal.Content>
    </Reveal>
  )
}


export default TimerBlockButton;