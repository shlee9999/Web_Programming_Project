import { useNavigate } from 'react-router-dom';
import './index.css';
import React from 'react';
import { Element, Link } from 'react-scroll';
import HeaderLogo from '../../images/header_logo.png';
import Logo from '../../images/logo.png';

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className='main_page_wrapper'>
      <div className='container'>
        <header>
          <img src={HeaderLogo} className='header_logo' alt='header_logo' />
          <div className='nav'>
            <Link
              to='scrollToElement1'
              smooth={true}
              duration={500}
              className='nav_items'
            >
              About us
            </Link>
            <Link
              to='scrollToElement2'
              smooth={true}
              duration={500}
              className='nav_items'
            >
              Proposal
            </Link>
          </div>
        </header>
        <section>
          <div className='center_container'>
            <img src={Logo} className='main_page_logo' alt='logo' />
            <button
              className='start_button'
              onClick={() => {
                navigate('/Typing/');
              }}
            >
              Begin Your Typing Practice
            </button>
          </div>
          <div className='paragraph_container'>
            <div className='paragraph_title'>
              <Element name='scrollToElement1' className='scroll_items'>
                <p className='paragraph-nav'>About us</p>
              </Element>
            </div>
            <div className='paragraph_text'></div>
            <div className='paragraph_title'>
              <Element name='scrollToElement2'>
                <p className='paragraph-items'>Proposal</p>
              </Element>
            </div>
            <div className='paragraph_text'>
              <div>
                <h1>프로젝트 기획서</h1>
              </div>
            </div>
          </div>
        </section>
        <footer></footer>
      </div>
    </div>
  );
};

export default MainPage;
