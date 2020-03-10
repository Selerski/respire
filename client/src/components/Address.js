import React from 'react';
import Timer from './Timer';
import TimerBlockButton from './TimerBlockButton';
import './Address.css';
import { blockById } from '../redux/actions';
import { useDispatch } from 'react-redux';

const Address = ({ address, blockedStatus, children, onClick }) => {
  const dispatch = useDispatch();

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
        <Timer />{' '}
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
