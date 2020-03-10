import React, { useState } from 'react';
import TimePicker from 'rc-time-picker';
import './Timer.css';
import moment from 'moment';

const format = 'hh:mm';

const iconStyle = {
  position: 'absolute',
  width: '24px',
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
const redoPath =
  'M758.2 839.1C851.8 765.9 912 651.9 912' +
  ' 523.9 912 303 733.5 124.3 512.6 124 291.4 123.7 112 ' +
  '302.8 112 523.9c0 125.2 57.5 236.9 147.6 310.2 3.5 2.' +
  '8 8.6 2.2 11.4-1.3l39.4-50.5c2.7-3.4 2.1-8.3-1.2-11.1' +
  '-8.1-6.6-15.9-13.7-23.4-21.2-29.4-29.4-52.5-63.6-68.6' +
  '-101.7C200.4 609 192 567.1 192 523.9s8.4-85.1 25.1-12' +
  '4.5c16.1-38.1 39.2-72.3 68.6-101.7 29.4-29.4 63.6-52.' +
  '5 101.7-68.6C426.9 212.4 468.8 204 512 204s85.1 8.4 1' +
  '24.5 25.1c38.1 16.1 72.3 39.2 101.7 68.6 29.4 29.4 52' +
  '.5 63.6 68.6 101.7 16.7 39.4 25.1 81.3 25.1 124.5s-8.' +
  '4 85.1-25.1 124.5c-16.1 38.1-39.2 72.3-68.6 101.7-9.3' +
  ' 9.3-19.1 18-29.3 26L668.2 724c-4.1-5.3-12.5-3.5-14.1' +
  ' 3l-39.6 162.2c-1.2 5 2.6 9.9 7.7 9.9l167 0.8c6.7 0 1' +
  '0.5-7.7 6.3-12.9l-37.3-47.9z';
function Timer({onChange}) {

  function getIcon(path, style = {}) {
    return (
      <i
        style={{
          fontSize: '30px',
          fontStyle: 'normal',
          color: '#aaa',
          display: 'inline-block',
          lineHeight: '1',
          width: '20px',
          transition: 'color 0.3s ease',
          ...style
        }}
      >
        <svg
          viewBox="0 0 1024 1024"
          width="1em"
          height="1em"
          fill="currentColor"
          style={{ verticalAlign: '-.125em' }}
        >
          <path d={path} p-id="5827" />
        </svg>
      </i>
    );
  }

  const clearIcon = getIcon(redoPath, { ...iconStyle, right: 20 });

  return (
    <>
      <TimePicker
        defaultValue={null}
        clearIcon={clearIcon}
        showSecond={false}
        onChange={onChange}
        format={format}
        disabledHours={() => [
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23
        ]}
        disabledMinutes={() => [0]}
        hideDisabledOptions
      />
    </>
  );
} 

export default Timer;
