import React from 'react';
import VirtualKeyboard from '../../../components/VirtualKeyboard';
import Logo from '../../../images/logo.png';
import './index.css';
import { useState } from 'react';
import UserInfo from '../../../components/UserInfo';
import UserInfoInput from '../../../components/UserInfoInputModal';
import { TypingResultsContainer } from '../../../components/TypingResultsContainer';
import { TypingResultsModal } from '../../../components/TypingResultsModal';
import { useTimer } from '../../../hooks/useTimer';
import PauseModal from '../../../components/PauseModal';
export const MainSection = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [viewUserInfoInputPopup, setViewUserInfoInputPopup] = useState(true);
  const [viewTypingResultPopup, setViewTypingResultPopup] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(100);
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

  const handleTypingSpeedChange = (speed) => {
    setTypingSpeed(speed);
  };

  const handleTypingAccuracyChange = (accuracy) => {
    setTypingAccuracy(accuracy);
  };

  const initializeStats = () => {
    handleTypingAccuracyChange(100);
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
    setIsPauseModalOpen(true);
    stopTimer();
  };
  const handleClickResumeButton = () => {
    setIsPauseModalOpen(false);
    startTimer();
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
          onTypingSpeedChange={handleTypingSpeedChange}
          onTypingAccuracyChange={handleTypingAccuracyChange}
          viewTypingResultPopup={viewTypingResultPopup}
          showTypingResultPopup={showTypingResultPopup}
          setTypingSpeed={setTypingSpeed}
          setTypingAccuracy={setTypingAccuracy}
          time={time}
          startTimer={startTimer}
          stopTimer={stopTimer}
          initializeTimer={initializeTimer}
          isTyping={isTyping}
          startTyping={startTyping}
          stopTyping={stopTyping}
        />
      </div>
      <div className='right_container'>
        <UserInfo viewUserInfoInputPopup={viewUserInfoInputPopup} />
        <TypingResultsContainer
          typingSpeed={typingSpeed}
          typingAccuracy={typingAccuracy}
        />
        {!isPauseModalOpen && (
          <button onClick={handleClickPauseButton}>일시 정지</button>
        )}
      </div>
      {viewUserInfoInputPopup && (
        <UserInfoInput
          viewUserInfoInputPopup={viewUserInfoInputPopup}
          closeUserInfoInputPopup={closeUserInfoInputPopup}
        />
      )}
      {viewTypingResultPopup && (
        <TypingResultsModal
          closeTypingResultPopup={closeTypingResultPopup}
          typingSpeed={typingSpeed}
          typingAccuracy={typingAccuracy}
          initializeStats={initializeStats}
        />
      )}
      {isPauseModalOpen && <PauseModal closeModal={closeModal} />}
    </div>
  );
};
