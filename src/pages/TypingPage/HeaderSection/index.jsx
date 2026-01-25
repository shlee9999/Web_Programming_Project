import React from 'react';
import './index.css';
import HeaderLogo from 'assets/header_logo.webp';
import { useNavigate } from 'react-router-dom';

export const HeaderSection = () => {
  const nav = useNavigate();
  const handleHeaderLogoClick = () => {
    nav('/');
  };
  return (
    <div className='header_section'>
      <img
        src={HeaderLogo}
        className='header_logo'
        alt='header_logo'
        onClick={handleHeaderLogoClick}
        width='180'
        height='50'
      />
    </div>
  );
};
