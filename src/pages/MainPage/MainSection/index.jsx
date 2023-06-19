import React from 'react';
import { Element } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import Logo from 'assets/logo.png';
import AboutUs from '../AboutUs/index';
import Proposal from '../Proposal/index';
import './index.css';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Introduction from '../Proposal/Introduction';
import Feature from '../Proposal/Feature';

export const MainSection = () => {
  const navigate = useNavigate();
  const navigateToTypingPage = () => {
    navigate('/Typing/');
  };
  const targetRefs = useRef(null);
  // const [visibleIndices, setVisibleIndices] = useState([]);

  useEffect(() => {
    if (!targetRefs.current) return;
    const handleScroll = (entries) => {
      // const scrollTop = window.scrollY || window.pageYOffset;
      // const windowHeight = window.innerHeight;
      // const containerTop = targetRefs.current[0]?.offsetTop || 0;

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

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <div className='main_page_main'>
      <div className='upper_container'>
        <img src={Logo} className='main_page_logo' alt='logo' />
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
        <AboutUs />
      </div>

      <footer className='copyrights'>
        ⓒ 2023 Typing Pro. All rights reserved.
      </footer>
    </div>
  );
};
