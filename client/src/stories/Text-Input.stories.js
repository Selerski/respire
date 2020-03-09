import React from 'react';
import { action } from '@storybook/addon-actions';
import TextInput from '../components/Text-Input';
import SubmitButton from '../components/Submit-Button';
import Timer from '../components/Timer';

export default {
  component: { TextInput, SubmitButton, Timer },
  title: 'Text Input for Main Page'
  // Our exports that end in "Data" are not stories.
};

export const InputForm = () => (
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
      predicted="California"
      locked={false}
      active={false}
    ></TextInput>
      <Timer />
      <SubmitButton
        onClick={action('clicked')}
        insert="inserted"
      ></SubmitButton>
  </div>
);

InputForm.story = {
  name: 'Text Input Form with First Button'
};
