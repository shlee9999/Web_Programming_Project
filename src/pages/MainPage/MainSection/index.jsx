import React from 'react';
import { Element } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../images/logo.png';
import AboutUs from '../AboutUs/index';
import Proposal from '../Proposal/index';
import './index.css';

export const MainSection = () => {
  const navigate = useNavigate();
  const navigateToTypingPage = () => {
    navigate('/Typing/');
  };
  return (
    <div className='main_page_main'>
      <div className='upper_container'>
        <img src={Logo} className='main_page_logo' alt='logo' />
        <button className='start_button' onClick={navigateToTypingPage}>
          Begin Your Typing Practice
        </button>
      </div>
      <div className='lower_container'>
        <Element name='scrollToAboutUs' className='title'>About Us</Element>
        <AboutUs />
        <Element name='scrollToProposal' className='title'>Proposal</Element>
        <Proposal />
      </div>

      <footer className='copyrights'>
        ⓒ 2023 Typing Pro. All rights reserved.
      </footer>
    </div>
  );
};
