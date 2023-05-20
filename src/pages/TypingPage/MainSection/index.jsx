import React from 'react';
import VirtualKeyboard from '../../../components/VirtualKeyboard';
import Logo from '../../../images/logo.png';
import './index.css';
import { useState } from 'react';
import UserInfo from '../../../components/UserInfo';
import UserInfoInput from '../../../components/UserInfoInputModal';

export const MainSection = () => {
  const [viewPopup, setViewPopup] = useState(true);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(100);

  const handleTypingSpeedChange = (speed) => {
    setTypingSpeed(speed);
  };

  const handleTypingAccuracyChange = (accuracy) => {
    setTypingAccuracy(accuracy);
  };
  return (
    <div className='typing_page_main'>
      <div className='left_container'>
        <img src={Logo} className='typing_page_logo' alt='logo' />
        <VirtualKeyboard
          onTypingSpeedChange={handleTypingSpeedChange}
          onTypingAccuracyChange={handleTypingAccuracyChange}
        />
      </div>
      <div className='right_container'>
        <UserInfo typingSpeed={typingSpeed} typingAccuracy={typingAccuracy} />
      </div>
      {viewPopup && (
        <UserInfoInput viewPopup={viewPopup} setViewPopup={setViewPopup} />
      )}
    </div>
  );
};
