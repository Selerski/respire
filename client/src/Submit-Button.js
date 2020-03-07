import React from 'react';
import './Submit-Button.css';
import Button from '@material-ui/core/Button';
import BlockIcon from '@material-ui/icons/Block';

function SubmitButton(props) {
  return (
    <>
      <Button
        style={{ height: '56px' }}
        variant="contained"
        color="secondary"
        startIcon={<BlockIcon />}
      >
        Block
      </Button>
    </>
  );
}

export default SubmitButton;
