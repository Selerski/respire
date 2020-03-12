import React from 'react';
import './Submit-Button.css';
import Button from '@material-ui/core/Button';
import BlockIcon from '@material-ui/icons/Block';

function SubmitButton(props) {
  return (
    <>
      <Button
        id="submit"
        style={{ height: '56px' }}
        variant="contained"
        color="secondary"
        startIcon={<BlockIcon />}
        onClick={props.onClick}
      >
        Block
      </Button>
    </>
  );
}

export default SubmitButton;
