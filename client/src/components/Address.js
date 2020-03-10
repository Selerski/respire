import React, { useState } from 'react';
import Timer from './Timer';
import TimerBlockButton from './TimerBlockButton';
import './Address.css';
import { blockById } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { Checkbox } from 'semantic-ui-react'

const Address = ({ address, blockedStatus, children, onClick }) => {
  const dispatch = useDispatch();
  const disabledHours = {
    untimed: () => [...Array(23).keys() ].map( i => i+12),
    timed: () => [...Array(23).keys() ].map( i => i+1)
  };
  const disabledMinutes = {
    untimed: () => [...Array(60).keys() ].map( i => i),
    timed: () => [0]
  };

  const [timer, setTimer] = useState({
    hours: null,
    minutes: null,
    timed: true
  });
  function handleCheckbox(e) {
    console.log(e)
    setTimer({...timer, timed: !timer.timed})
  }
  function handleSetTimer(e) {
    console.log(e);

    // if (e === null) {
    //   setTimer({
    //     hours: moment(0).format('h'),
    //     minutes: moment(0).format('mm')
    //   });

    // } else {
    //   setTimer({
    //     hours: Number(e.format('h')),
    //     minutes: Number(e.format('mm'))
    //   });

    // }
  }
  const buttonPanel =
    blockedStatus === 'notBlocked' ? (
      <>
        {' '}
        <button
          onClick={() => {
            dispatch(blockById(address._id));
          }}
        >
          block
        </button>
        <Checkbox label="Timed"  checked={timer.timed} onChange={handleCheckbox} />
        <Timer onChange={handleSetTimer} />{' '}
      </>
    ) : (
      <TimerBlockButton _id={address._id} time={120} />
    );

  return (
    <div className="address">
      {address.domain}
      {children}
      {buttonPanel}
    </div>
  );
};

export default Address;
