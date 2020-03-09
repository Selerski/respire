import React from 'react';
import SubmitButton from '../components/Submit-Button';

export default {
  component: { SubmitButton },
  title: 'Text '
  // Our exports that end in "Data" are not stories.
};

export const ToStorybook = () => (
  <>
    {' '}
    <SubmitButton
    ></SubmitButton>
  </>
);

ToStorybook.story = {
  name: 'Text Input Design no.1'
};