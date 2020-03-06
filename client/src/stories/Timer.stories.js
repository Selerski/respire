import React from 'react';
import { action } from '@storybook/addon-actions';
import Timer from '../Timer';

export default {
  title: 'Timer',
  component: Timer,
};

export const FirstDesign = () => <Timer insert="inserted"></Timer>;
