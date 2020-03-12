import React from 'react';
import './Submit-Button.css';
import Button from '@material-ui/core/Button';
import LockOpenIcon from '@material-ui/icons/LockOpen';

function UnblockButton(props) {
  return (
    <>
      <Button
        id="submit"
        style={{ height: '56px' }}
        variant="contained"
        color="secondary"
        startIcon={<LockOpenIcon />}
        onClick={props.onClick}
      >
        Unblock
      </Button>
    </>
  );
}

export default UnblockButton;
