import React from 'react';
import './Submit-Button.css';

function SubmitButton(props) {
    console.log(props)
  return (
      <>
      <button> {props.insert} </button>
      </>
  );
}

export default SubmitButton;
