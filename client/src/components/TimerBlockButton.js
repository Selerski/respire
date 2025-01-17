import React, { useState, useEffect } from 'react';
import { Reveal } from 'semantic-ui-react';
import './TimerBlockButton.css';
import formatTime from '../utils/formatTime';
import { useDispatch } from 'react-redux';
import { unblockById } from '../redux/actions';

const TimerBlockButton = props => {
  const dispatch = useDispatch();
  const [timeRemaining, setTimeRemaining] = useState(props.time);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor(timeRemaining % 3600 / 60);
  const seconds = Math.floor(timeRemaining % 60);

  useEffect(
    () => {
      if (timeRemaining >= 1 && timeRemaining !== 999999) {
        let timer = setTimeout(() => {
          setTimeRemaining(timeRemaining => timeRemaining - 1);
          if (timeRemaining === 1) {
            dispatch(unblockById(props._id));
          }
        }, 1000);
        return () => clearTimeout(timer);
      }
    },
    // if this value changes, clear the timer and rerender
    [timeRemaining, dispatch, props._id]
  );

  if (!timeRemaining) return null;

  return (
    <Reveal animated="fade" className="timer" onClick={() => dispatch(unblockById(props._id))}>
      <Reveal.Content visible>
        <div className="timer-content">
          {timeRemaining === 999999 
          ? '♾'
          : formatTime(hours)+':'+formatTime(minutes)+ ':' +formatTime(seconds)}
        </div>
      </Reveal.Content>
      <Reveal.Content hidden className="timer-content unblock">
        <div>unblock</div>
      </Reveal.Content>
    </Reveal>
  );
};

export default TimerBlockButton;
