import React from 'react';
import { action } from '@storybook/addon-actions';
import SocialBar from '../Social-Bar';
import '../Social-Bar.css';

export default {
  title: 'Social Bar',
  component: SocialBar
};

export const FirstDesign = () => (
  <div
    id="mySidepanel"
    style={{
      backgroundColor: '#d1c4e9',
      width: 'fit-content',
      padding: '4px 30px 4px 5px',
      
      opacity: '0.9',
    }}
  >
    <SocialBar
      size={40}
      style={{
        display: 'flex',
        width: 'fit-content',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    ></SocialBar>
  </div>
);
