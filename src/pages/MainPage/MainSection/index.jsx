import React, { lazy, Suspense } from 'react';
import { Element } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import Logo from 'assets/logo.webp';
import './index.css';
import { useRef } from 'react';
import { useEffect } from 'react';
import Introduction from '../Proposal/Introduction';
import Feature from '../Proposal/Feature';

// Below-the-fold 컴포넌트를 lazy loading
const AboutUs = lazy(() => import('../AboutUs/index'));

export const MainSection = () => {
  const navigate = useNavigate();
  const navigateToTypingPage = () => {
    navigate('/Typing/');
  };
  const targetRefs = useRef(null);

  useEffect(() => {
    if (!targetRefs.current) return;
    const handleScroll = (entries) => {
      entries.forEach((entry) => {
        let targetStyle = entry.target.style;
        if (entry.isIntersecting) {
          targetStyle.opacity = 1;
          targetStyle.transition = 'opacity 1s';
        } else {
          targetStyle.opacity = 0;
          targetStyle.transition = 'opacity 1s';
        }
      });
    };
    const observer = new IntersectionObserver(handleScroll, { threshold: 0.5 });
    Array.prototype.forEach.call(targetRefs.current.children, (target) => {
      observer.observe(target);
    });
  }, [targetRefs]);

  return (
    <div className='main_page_main'>
      <div className='upper_container'>
        <img 
          src={Logo} 
          className='main_page_logo' 
          alt='logo'
          width='400'
          height='400'
        />
        <button className='start_button' onClick={navigateToTypingPage}>
          Begin Your Typing Practice
        </button>
      </div>
      <div className='lower_container' ref={targetRefs}>
        <Element name='scrollToProposal' className='title'>
          Proposal
        </Element>
        <Introduction />
        <Feature />
        <Element name='scrollToAboutUs' className='title'>
          About Us
        </Element>
        <div className='about_us_info'>
          Typing Pro를 개발한 사람들을 소개합니다!
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <AboutUs />
        </Suspense>
      </div>

      <footer className='copyrights'>
        ⓒ 2023 Typing Pro. All rights reserved.
      </footer>
    </div>
  );
};
