import React, { useState } from 'react';
import TimePicker from 'rc-time-picker';
import './Timer.css';
import moment from 'moment';

function Timer() {
  const [timer, setTimer] = useState({
    hours: moment().format('h'),
    minutes: moment().format('mm')
  });

function onChange(e) {
    setTimer({ hours: Number(e.format('h')), minutes: Number(e.format('mm')) });
    const { hours, minutes } = timer;
    localStorage.setItem('hours', Number(e.format('h')) + ':' + Number(e.format('mm')));
  }

  


  return (
    <>
      <TimePicker
        defaultValue={moment(0)}
        showSecond={false}
        onChange={onChange}
        disabledHours={() => [0,12,13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}
        disabledMinutes={() => [0]}
        hideDisabledOptions
      />
    </>
  );
}

export default Timer;
