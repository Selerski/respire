import React from 'react';
import NewApp from '../New-App';

export default {
  component: NewApp,
  title: 'NewApp',
  // Our exports that end in "Data" are not stories.
};

export const ToStorybook = () => <NewApp />;

ToStorybook.story = {
  name: 'Website Box',
};
