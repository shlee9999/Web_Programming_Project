import VirtualKeyboard from '../../../components/VirtualKeyboard';
import Logo from '../../../images/logo.png';
import './index.css';
import { useState } from 'react';
import { UserInfo } from '../../../components/UserInfo';
import { UserInfoInput } from '../../../components/UserInfoInputModal';
import { TypingResultsContainer } from '../../../components/TypingResultsContainer';
import { TypingResultsModal } from '../../../components/TypingResultsModal';
import { TypingStatisticsModal } from '../../../components/TypingStatisticsModal';

export const MainSection = () => {
  const [viewUserInfoInputPopup, setViewUserInfoInputPopup] = useState(true);
  const [viewTypingResultPopup, setViewTypingResultPopup] = useState(false);
  const [viewTypingStatisticsPopup, setViewTypingStatisticsPopup] =
    useState(false);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(100);
  const [typingTime, setTypingTime] = useState('');
  const [userName, setUserName] = useState('');
  const [userImageIndex, setUserImageIndex] = useState(0);

  const date = new Date();

  const year = date.getFullYear() % 2000;
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const currentDate = `${year}.${month}.${day}`;

  const addToLocalStorage = (data) => {
    const existingData = localStorage.getItem('TypingStatistics');
    let newData = [];

    if (existingData) {
      newData = JSON.parse(existingData);
    }

    newData = [...newData, data];

    localStorage.setItem('TypingStatistics', JSON.stringify(newData));
  };

  const handleUserName = (name) => {
    setUserName(name);
  };

  const handleUserImageIndex = (imageIndex) => {
    setUserImageIndex(imageIndex);
  };

  const closeUserInfoInputPopup = () => {
    setViewUserInfoInputPopup(false);
  };

  const showTypingResultPopup = () => {
    setViewTypingResultPopup(true);
    const localStorageDateList = [
      userName,
      typingSpeed,
      typingAccuracy,
      typingTime,
      currentDate,
    ];

    addToLocalStorage(localStorageDateList);
  };

  const closeTypingResultPopup = () => {
    setViewTypingResultPopup(false);
  };

  const showTypingStatisticsPopup = () => {
    setViewTypingStatisticsPopup(true);
  };
  const closeTypingStatisticsPopup = () => {
    setViewTypingStatisticsPopup(false);
  };

  const handleTypingSpeedChange = (speed) => {
    setTypingSpeed(speed);
  };

  const handleTypingAccuracyChange = (accuracy) => {
    setTypingAccuracy(accuracy);
  };

  const handleTypingTimechange = (time) => {
    setTypingTime(time);
  };

  return (
    <div className='typing_page_main'>
      <div className='left_container'>
        <img src={Logo} className='page_logo' alt='logo' />
        <VirtualKeyboard
          handleTypingSpeedChange={handleTypingSpeedChange}
          handleTypingAccuracyChange={handleTypingAccuracyChange}
          handleTypingTimechange={handleTypingTimechange}
          showTypingResultPopup={showTypingResultPopup}
          typingTime={typingTime}
        />
      </div>
      <div className='right_container'>
        <UserInfo
          userName={userName}
          userImageIndex={userImageIndex}
          viewUserInfoInputPopup={viewUserInfoInputPopup}
        />
        <TypingResultsContainer
          typingSpeed={typingSpeed}
          typingAccuracy={typingAccuracy}
        />
        <button
          className='statistics_button'
          onClick={showTypingStatisticsPopup}
        >
          나의 타이핑 기록
        </button>
      </div>
      {viewUserInfoInputPopup && (
        <UserInfoInput
          viewUserInfoInputPopup={viewUserInfoInputPopup}
          closeUserInfoInputPopup={closeUserInfoInputPopup}
          handleUserName={handleUserName}
          handleUserImageIndex={handleUserImageIndex}
        />
      )}
      {viewTypingResultPopup && (
        <TypingResultsModal
          closeTypingResultPopup={closeTypingResultPopup}
          typingSpeed={typingSpeed}
          typingAccuracy={typingAccuracy}
        />
      )}
      {viewTypingStatisticsPopup && (
        <TypingStatisticsModal
          closeTypingStatisticsPopup={closeTypingStatisticsPopup}
        />
      )}
    </div>
  );
};
