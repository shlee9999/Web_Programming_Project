import React from 'react';
import Logo from 'assets/logo.png';
import './index.css';
import { useNavigate } from 'react-router';

const NotFound = () => {
  const nav = useNavigate();
  const handleButtonClick = () => {
    setTimeout(() => {
      nav('/');
    }, 500);
  };
  return (
    <div className='container'>
      <img className='notFoundLogo' src={Logo} alt='Logo' />
      <span className='notFoundTitle'>페이지가 존재하지 않습니다</span>
      <button className='goMainPageButton' onClick={handleButtonClick}>
        돌아가기
      </button>
    </div>
  );
};

export default NotFound;
