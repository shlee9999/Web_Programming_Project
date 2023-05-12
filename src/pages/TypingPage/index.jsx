import './index.css';
import { useState } from 'react';
import VirtualKeyboard from '../../components/VirtualKeyboard';
import UserInfoInput from '../../components/UserInfoInputModal';
import UserInfo from '../../components/UserInfo';

function Typing() {
  const [viewPopup, setViewPopup] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(100);
  const handleTypingSpeedChange = (speed) => {
    setTypingSpeed(speed);
  };

  const handleTypingAccuracyChange = (accuracy) => {
    setTypingAccuracy(accuracy);
  };

  return (
    <div className='typingPage-wrapper'>
      <div className='typing_container'>
        <header>
          <img
            src={process.env.PUBLIC_URL + '../../images/header_logo.png'}
            className='header_logo'
            alt='헤더'
          />
        </header>
        <div className='body-wrapper'>
          <div className='left-container'>
            <img
              src={process.env.PUBLIC_URL + '../../images/logo.png'}
              className='typing_page_logo'
              alt='헤더로고'
            />
            <VirtualKeyboard
              onTypingSpeedChange={handleTypingSpeedChange}
              onTypingAccuracyChange={handleTypingAccuracyChange}
            />
          </div>
          <div className='right-container'>
            <UserInfo
              typingSpeed={typingSpeed}
              typingAccuracy={typingAccuracy}
            />
          </div>
        </div>
      </div>
      {viewPopup && <UserInfoInput setViewPopup={setViewPopup} />}
    </div>
  );
}

export default Typing;
