import React from 'react';
import './index.css';
import HeaderLogo from '../../../images/header_logo.png';

export const HeaderSection = () => {
  return (
    <div className='header_section'>
      <img src={HeaderLogo} className='header_logo' alt='header_logo' />
    </div>
  );
};
