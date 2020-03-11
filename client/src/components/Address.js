import React, { useState } from 'react';
import Timer from './Timer';
import TimerBlockButton from './TimerBlockButton';
import './Address.css';
import { blockById, timeBlock } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { Checkbox, Segment } from 'semantic-ui-react';
import SubmitButton from './Submit-Button';
import moment from 'moment';

const Address = ({ address, blockedStatus, children, onClick }) => {
  const dispatch = useDispatch();
  const disabledHours = {
    untimed: () => [...Array(23).keys()].map(i => i + 12),
    timed: () => [...Array(23).keys()].map(i => i + 1)
  };
  const disabledMinutes = {
    untimed: () => [...Array(60).keys()].map(i => i),
    timed: () => [0]
  };

  const [timer, setTimer] = useState({
    hours: null,
    minutes: null,
    indefinite: false
  });
  function handleCheckbox(e) {
    setTimer({ ...timer, indefinite: !timer.indefinite });
  }
  function handleSetTimer(e) {
    if (e === null) {
      setTimer({
        hours: moment(0).format('h'),
        minutes: moment(0).format('mm')
      });

    } else {
      setTimer({
        hours: Number(e.format('h')),
        minutes: Number(e.format('mm'))
      });
    }
  }

  function handleBlock() {
    if (timer.hours === null && timer.minutes === null) {
      dispatch(blockById(address._id));
    } else {
      dispatch(
        timeBlock(address._id, (+timer.hours * 60 + timer.minutes) * 60)
      );
    }
    setTimer({ hours: null, minutes: null, indefinite: false });
  }

  const buttonPanel =
    blockedStatus === 'notBlocked' ? (
      <>
        {' '}
        <div className="checkbox">
          <Segment compact>
            <Checkbox
              toggle
              checked={timer.indefinite}
              onChange={handleCheckbox}
            />
          </Segment>
        </div>
        <Timer onChange={handleSetTimer} disabled={timer.indefinite} />
        <SubmitButton onClick={handleBlock} />
      </>
    ) : (
      <TimerBlockButton
        _id={address._id}
        time={address.blockedTimePeriod || 999999}
      />
    );

  return (
    <>
      <div className="address">
        <div className="domain-name">{address.domain}</div>
        {children}
        {buttonPanel}
      </div>
    </>
  );
};

export default Address;
