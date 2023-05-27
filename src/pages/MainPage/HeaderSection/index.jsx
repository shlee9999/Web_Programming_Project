import React from 'react';
import './index.css';
import HeaderLogo from '../../../images/header_logo.png';
import { Link } from 'react-scroll';

export const HeaderSection = () => {
  return (
    <div className='header_section'>
      <img src={HeaderLogo} className='header_logo' alt='header_logo' />
      <div className='navigation_item'>
        <Link to='scrollToAboutUs' smooth={true} duration={500}>
          About us
        </Link>
        <Link to='scrollToProposal' smooth={true} duration={500}>
          Proposal
        </Link>
      </div>
    </div>
  );
};
