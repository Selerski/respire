import React from 'react';
import { action } from '@storybook/addon-actions';
import SubmitButton from '../Submit-Button';

export default {
  title: 'Submit Button',
  component: SubmitButton,
};

export const FirstDesign = () => <SubmitButton onClick={action('clicked')} insert="inserted"></SubmitButton>;

export const SecondDesign = () => <SubmitButton onClick={action('clicked')} insert="Mamma Mia"></SubmitButton>;
