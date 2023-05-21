import React from 'react';
import { Element } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../images/logo.png';
import './index.css';
export const MainSection = () => {
  const navigate = useNavigate();
  const navigateToTypingPage = () => {
    navigate('/Typing/');
  };
  return (
    <div className='main_page_main'>
      <div className='upper_container'>
        <img src={Logo} className='page_logo' alt='logo' />
        <button className='start_button' onClick={navigateToTypingPage}>
          Begin Your Typing Practice
        </button>
      </div>
      <div className='lower_container'>
        <Element name='scrollToElement1' className='title'>
          About us
        </Element>
        <div className='text'>본문입니다.</div>

        <Element name='scrollToElement2' className='title'>
          Proposal
        </Element>
        <div className='text'>
          <div>
            <h1>프로젝트 기획서</h1>
          </div>
          본문입니다.
        </div>
      </div>

      <footer></footer>
    </div>
  );
};
