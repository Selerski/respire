import React from 'react';
import TextInput from './Text-Input';
import SubmitButton from './Submit-Button';
import Timer from './Timer';

export const InputForm = ({onSubmit}) => (


  <div
    style={{
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'row',
      width: '90%',
      alignItems: 'center',
      justifyContent:"center"
    }}
  >
    {' '}
    <TextInput
      id={1}
      label="Enter domain"
      predicted=''
      locked={false}
      active={false}
      onEnter={onSubmit}
    ></TextInput>
      <Timer />
      <SubmitButton
        onClick={onSubmit}
        insert="inserted"
      ></SubmitButton>
  </div>
);

export default InputForm;