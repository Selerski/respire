import React from 'react';
import App from '../App';

export default {
  component: App,
  title: 'Respire',
  // Our exports that end in "Data" are not stories.
};

export const ToStorybook = () => <App />;

ToStorybook.story = {
  name: 'Respire Main View',
};
