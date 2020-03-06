import React from 'react';
import { action } from '@storybook/addon-actions';
import TextInput from '../Text-Input';
import SubmitButton from '../Submit-Button';

export default {
  component: { TextInput, SubmitButton },
  title: 'Text Input for Main Page'
  // Our exports that end in "Data" are not stories.
};

export const InputForm = () => (
  <>
    {' '}
    <TextInput
      id={1}
      label="Enter domain name"
      predicted="California"
      locked={false}
      active={false}
    ></TextInput>
    <SubmitButton onClick={action('clicked')} insert="inserted"></SubmitButton>
  </>
);

InputForm.story = {
  name: 'Text Input Form with First Button'
};
