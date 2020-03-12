import React, { useState } from 'react';
import Timer from './Timer';
import TimerBlockButton from './TimerBlockButton';
import './Address.css';
import { blockById, timeBlock } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { Checkbox, Segment } from 'semantic-ui-react';
import SubmitButton from './Submit-Button';
import moment from 'moment';

const Address = ({ address, blockedStatus, children }) => {
  const dispatch = useDispatch();

  const [timer, setTimer] = useState({
    hours: null,
    minutes: null,
    timed: false
  });

  function handleCheckbox(e) {
    setTimer({ ...timer, timed: !timer.timed });
  }
  function handleSetTimer(e) {
    if (e === null) {
      setTimer({
        hours: moment(0).format('HH'),
        minutes: moment(0).format('mm')
      });
    } else {
      setTimer({
        hours: Number(e.format('HH')),
        minutes: Number(e.format('mm'))
      });
    }
  }

  function handleBlock() {
    if ((timer.hours === null && timer.minutes === null) || timer.timed === false) {
      dispatch(blockById(address._id));
    } else {
      dispatch(
        timeBlock(address._id, (+timer.hours * 60 + timer.minutes) * 60)
      );
    }
    setTimer({ hours: null, minutes: null, timed: false });
  }

  const buttonPanel =
    blockedStatus === 'notBlocked' ? (
      <>
        {' '}
        <div className="checkbox">
          <Segment compact>
            <Checkbox toggle checked={timer.timed} onChange={handleCheckbox} />
          </Segment>
        </div>
        <Timer onChange={handleSetTimer} disabled={timer.timed === false} />
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
