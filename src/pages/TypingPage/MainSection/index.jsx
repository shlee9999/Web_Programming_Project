import React, { createContext } from 'react';
import VirtualKeyboard from 'components/WithContext/VirtualKeyboard';
import Logo from 'assets/logo.png';
import { useState, useRef } from 'react';
import { UserInfo } from 'components/WithoutContext/UserInfo';
import { UserInfoInputModal } from 'components/WithoutContext/UserInfoInputModal';
import { TypingResultsContainer } from 'components/WithContext/TypingResultsContainer';
import { TypingResultsModal } from 'components/WithContext/TypingResultsModal';
import { TypingStatisticsModal } from 'components/WithoutContext/TypingStatisticsModal';
import PauseModal from 'components/WithoutContext/PauseModal';
import './index.css';
import { useMainSection } from 'hooks/useMainSection';

export const MyContext = createContext();

export const MainSection = () => {
  const inputRef = useRef(null);

  const [typingSpeed, setTypingSpeed] = useState(0);
  const [totalAccuracy, setTotalAccuracy] = useState(100);
  const {
    handleUserName,
    handleUserImageIndex,
    closeUserInfoInputPopup,
    showTypingResultPopup,
    closeTypingResultPopup,
    showTypingStatisticsPopup,
    closeTypingStatisticsPopup,
    handleClickPause,
    closePauseModal,
    startTyping,
    stopTyping,
    isPauseModalOpen,
    viewUserInfoInputPopup,
    viewTypingResultPopup,
    viewTypingStatisticsPopup,
    userName,
    userImageIndex,
    time,
  } = useMainSection();
  return (
    <MyContext.Provider
      value={{ typingSpeed, totalAccuracy, setTypingSpeed, setTotalAccuracy }}
    >
      <div className='typing_page_main'>
        <div className='left_container'>
          <img src={Logo} className='page_logo' alt='logo' />
          <VirtualKeyboard
            userName={userName}
            time={time}
            startTyping={startTyping}
            stopTyping={stopTyping}
            showTypingResultPopup={showTypingResultPopup}
            inputRef={inputRef}
          />
        </div>
        <div className='right_container'>
          <UserInfo
            userName={userName}
            userImageIndex={userImageIndex}
            handleUserName={handleUserName}
          />
          <TypingResultsContainer />
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
          <TypingResultsModal closeTypingResultPopup={closeTypingResultPopup} />
        )}

        {viewTypingStatisticsPopup && (
          <TypingStatisticsModal
            closeTypingStatisticsPopup={closeTypingStatisticsPopup}
          />
        )}

        {isPauseModalOpen && <PauseModal closeModal={closePauseModal} />}
      </div>
    </MyContext.Provider>
  );
};
