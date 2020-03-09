import React from 'react';
import { action } from '@storybook/addon-actions';
import Address from '../components/Address';


export default {
  title: 'Address',
  component: Address,
};

export const unblocked = () => <Address onClick={action('clicked')} blockedStatus="notBlocked">instagram.com</Address>;

export const blocked = () => <Address onClick={action('clicked')} blockedStatus="Blocked">instagram.com</Address>;

export const timeBlocked = () => <Address onClick={action('clicked')} blockedStatus="timeBlocked">instagram.com</Address>;
