import React from 'react';
import { action } from '@storybook/addon-actions';
import TimerBlockButton from '../components/TimerBlockButton';

export default {
  title: 'TimerBlockButton',
  component: TimerBlockButton,
};

export const timerActive = () => <TimerBlockButton onClick={action('clicked')} time={120}/>;