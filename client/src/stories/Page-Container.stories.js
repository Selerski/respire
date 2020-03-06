import React from 'react';
import PageContainer from '../Page-Container';
import NewApp from '../New-App';
import TextInput from '../Text-Input';

export default {
  component: { PageContainer, NewApp, TextInput },
  title: 'Text Input for Main Page'
  // Our exports that end in "Data" are not stories.
};

export const ToStorybook = () => (
  <>
    {' '}
    <NewApp></NewApp>
    <PageContainer></PageContainer>
    <TextInput
      id={1}
      label="Enter domain name"
      predicted="California"
      locked={false}
      active={false}
    ></TextInput>
  </>
);

ToStorybook.story = {
  name: 'New Design'
};
