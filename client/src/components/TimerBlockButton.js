import React, { useState, useEffect } from 'react';
import './TimerBlockButton.css';
import formatTime from '../utils/formatTime';
import { useDispatch } from 'react-redux';
import { unblockById } from '../redux/actions';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import UnblockButton from './UnblockButton';

const TimerBlockButton = props => {
  const dispatch = useDispatch();
  const [timeRemaining, setTimeRemaining] = useState(props.time);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = Math.floor(timeRemaining % 60);


  useEffect(() => {
    if (timeRemaining >= 1 && timeRemaining !== 999999) {
      let timer = setTimeout(() => {
        setTimeRemaining(timeRemaining => timeRemaining - 1);
        if (timeRemaining === 1) {
          dispatch(unblockById(props._id));
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, dispatch, props._id]);

  if (!timeRemaining) return null;

  return (
    <div className="timer">
      <div className="timer-content">
        {timeRemaining === 999999 ? (
          <AllInclusiveIcon></AllInclusiveIcon>
        ) : (
          formatTime(hours) +
          ':' +
          formatTime(minutes) +
          ':' +
          formatTime(seconds)
        )}
      </div>
      <UnblockButton onClick={() => dispatch(unblockById(props._id))}></UnblockButton>
    </div>
  );
};

export default TimerBlockButton;
