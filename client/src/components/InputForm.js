import React from 'react';
import TextInput from './Text-Input';

export const InputForm = ({onSubmit}) => (


  <div
    style={{
      margin: '2rem auto',
      display: 'flex',
      flexDirection: 'row',
      width: '90%',
      height: "100%",
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
  </div>
);

export default InputForm;