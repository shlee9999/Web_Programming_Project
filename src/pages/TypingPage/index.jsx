import './index.css';
import { useState } from 'react';
import VirtualKeyboard from '../../components/VirtualKeyboard';
import UserInfoInput from '../../components/UserInfoInputModal';
import UserInfo from '../../components/UserInfo';
import { useNavigate } from 'react-router-dom';
import HeaderLogo from '../../images/header_logo.png';
import Logo from '../../images/logo.png';
function Typing() {
  const [viewPopup, setViewPopup] = useState(true);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(100);
  const nav = useNavigate();
  const handleTypingSpeedChange = (speed) => {
    setTypingSpeed(speed);
  };

  const handleTypingAccuracyChange = (accuracy) => {
    setTypingAccuracy(accuracy);
  };
  const navigate = (to) => () => {
    nav(to);
  };

  return (
    <div className='typingPage_wrapper'>
      <div className='typing_container'>
        <header>
          <img
            src={HeaderLogo}
            className='header_logo'
            alt='헤더'
            onClick={navigate('/')}
          />
        </header>
        <div className='body-wrapper'>
          <div className='left-container'>
            <img src={Logo} className='typing_page_logo' alt='헤더로고' />
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
        {viewPopup && (
          <UserInfoInput viewPopup={viewPopup} setViewPopup={setViewPopup} />
        )}
      </div>
    </div>
  );
}

export default Typing;
