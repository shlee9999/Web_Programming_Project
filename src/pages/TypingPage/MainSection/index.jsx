import React from 'react';
import VirtualKeyboard from '../../../components/VirtualKeyboard';
import Logo from '../../../assets/logo.png';
import { useState, useRef } from 'react';
import { UserInfo } from '../../../components/UserInfo';
import { UserInfoInputModal } from '../../../components/UserInfoInputModal';
import { TypingResultsContainer } from '../../../components/TypingResultsContainer';
import { TypingResultsModal } from '../../../components/TypingResultsModal';
import { TypingStatisticsModal } from '../../../components/TypingStatisticsModal';
import { useTimer } from '../../../hooks/useTimer';
import PauseModal from '../../../components/PauseModal';
import './index.css';

export const MainSection = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [viewUserInfoInputPopup, setViewUserInfoInputPopup] = useState(true);
  const [viewTypingResultPopup, setViewTypingResultPopup] = useState(false);
  const [viewTypingStatisticsPopup, setViewTypingStatisticsPopup] =
    useState(false);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(100);

  const [userName, setUserName] = useState('');
  const [userImageIndex, setUserImageIndex] = useState(0);

  const handleUserName = (name) => {
    setUserName(name);
  };

  const handleUserImageIndex = (imageIndex) => {
    setUserImageIndex(imageIndex);
  };

  const inputRef = useRef(null);

  const { time, startTimer, stopTimer, initializeTimer } = useTimer({
    defaultTime: 0,
  });

  const closeUserInfoInputPopup = () => {
    setViewUserInfoInputPopup(false);
  };

  const showTypingResultPopup = () => {
    setViewTypingResultPopup(true);
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

  const handleTypingSpeed = (speed) => {
    //VirtualKeyboard에서 받아옴
    setTypingSpeed(speed);
  };

  const handleTotalAccuracy = (accuracy) => {
    //VirtualKeyboard에서 받아옴
    setTypingAccuracy(accuracy);
  };

  const initializeStats = () => {
    initializeTimer(); //totalAccuracy, typingSpeed는 time=0으로 초기화 시 초기화되도록 useVirtualKeyboard에 useEffect로 구현
  };

  const handleClickPause = () => {
    if (!isTyping) return;
    setIsPauseModalOpen(true);
    stopTimer();
  };

  const closePauseModal = () => {
    setIsPauseModalOpen(false);
    startTimer();
    inputRef?.current.focus();
  };

  const startTyping = () => {
    setIsTyping(true);
    startTimer();
  };
  const stopTyping = () => {
    setIsTyping(false);
    stopTimer();
  };

  return (
    <div className='typing_page_main'>
      <div className='left_container'>
        <img src={Logo} className='page_logo' alt='logo' />
        <VirtualKeyboard
          userName={userName}
          time={time}
          startTyping={startTyping}
          stopTyping={stopTyping}
          showTypingResultPopup={showTypingResultPopup}
          handleTypingSpeed={handleTypingSpeed}
          handleTotalAccuracy={handleTotalAccuracy}
          inputRef={inputRef}
        />
      </div>
      <div className='right_container'>
        <UserInfo
          userName={userName}
          userImageIndex={userImageIndex}
          handleUserName={handleUserName}
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
          <button onClick={handleClickPause}>일시 정지</button>
        )}
      </div>
      {viewUserInfoInputPopup && (
        <UserInfoInputModal
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

      {isPauseModalOpen && <PauseModal closeModal={closePauseModal} />}
    </div>
  );
};
