import React from 'react';
import VirtualKeyboard from '../../../components/VirtualKeyboard';
import Logo from '../../../images/logo.png';
import './index.css';
import { useState } from 'react';
import { UserInfo } from '../../../components/UserInfo';
import { UserInfoInput } from '../../../components/UserInfoInputModal';
import { TypingResultsContainer } from '../../../components/TypingResultsContainer';
import { TypingResultsModal } from '../../../components/TypingResultsModal';
import { TypingStatisticsModal } from '../../../components/TypingStatisticsModal';
import { useTimer } from '../../../hooks/useTimer';
import PauseModal from '../../../components/PauseModal';


export const MainSection = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
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

  const [totalCorrectKeyStrokes, setTotalCorrectKeyStrokes] = useState(0);

  const { time, startTimer, stopTimer, initializeTimer } = useTimer({
    defaultTime: 0,
  });

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
    initializeStats();
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

  const initializeStats = () => {
    handleTypingAccuracyChange(100);
    setTotalCorrectKeyStrokes(0);
    handleTypingSpeedChange(0);
    initializeTimer();
  };
  const startTyping = () => {
    setIsTyping(true);
  };
  const stopTyping = () => {
    setIsTyping(false);
  };
  const handleClickPauseButton = () => {
    if (!isTyping) return;
    setIsPauseModalOpen(true);
    stopTimer();
  };

  const closeModal = () => {
    setIsPauseModalOpen(false);
    startTimer();
  };

  return (
    <div className='typing_page_main'>
      <div className='left_container'>
        <img src={Logo} className='page_logo' alt='logo' />
        <VirtualKeyboard
          handleTypingSpeedChange={handleTypingSpeedChange}
          handleTypingAccuracyChange={handleTypingAccuracyChange}
          showTypingResultPopup={showTypingResultPopup}
          typingTime={typingTime}
          setTypingSpeed={setTypingSpeed}
          setTypingAccuracy={setTypingAccuracy}
          time={time}
          startTimer={startTimer}
          stopTimer={stopTimer}
          initializeTimer={initializeTimer}
          isTyping={isTyping}
          startTyping={startTyping}
          stopTyping={stopTyping}
          totalCorrectKeyStrokes={totalCorrectKeyStrokes}
          handleTotalCorrectKeyStrokes={setTotalCorrectKeyStrokes}
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

        {!isPauseModalOpen && (
          <button onClick={handleClickPauseButton}>일시 정지</button>
        )}

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

      {isPauseModalOpen && <PauseModal closeModal={closeModal} />}

    </div>
  );
};
