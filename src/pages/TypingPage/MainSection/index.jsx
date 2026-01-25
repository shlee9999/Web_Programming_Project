import React, { createContext, lazy, Suspense } from 'react';
import VirtualKeyboard from 'components/WithContext/VirtualKeyboard';
import Logo from 'assets/logo.webp';
import { useState, useRef } from 'react';
import { UserInfo } from 'components/WithoutContext/UserInfo';
import { TypingResultsContainer } from 'components/WithContext/TypingResultsContainer';
import PauseModal from 'components/WithoutContext/PauseModal';
import './index.css';
import { useMainSection } from 'hooks/useMainSection';

// 모달 컴포넌트들을 lazy loading (초기 렌더링 성능 향상)
const UserInfoInputModal = lazy(() => import('components/WithoutContext/UserInfoInputModal').then(module => ({ default: module.UserInfoInputModal })));
const TypingResultsModal = lazy(() => import('components/WithContext/TypingResultsModal').then(module => ({ default: module.TypingResultsModal })));
const TypingStatisticsModal = lazy(() => import('components/WithoutContext/TypingStatisticsModal').then(module => ({ default: module.TypingStatisticsModal })));

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
    isTyping,
  } = useMainSection({ inputRef });

  return (
    <MyContext.Provider
      value={{ typingSpeed, totalAccuracy, setTypingSpeed, setTotalAccuracy }}
    >
      <div className='typing_page_main'>
        <div className='left_container'>
          <img 
            src={Logo} 
            className='typing_page_logo' 
            alt='logo'
            width='400'
            height='207'
          />
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
            My Typing Results
          </button>

          {isTyping && !isPauseModalOpen && (
            <button className='modal_button' onClick={handleClickPause}>
              Pause
            </button>
          )}
        </div>
        {viewUserInfoInputPopup && (
          <Suspense fallback={<div>Loading...</div>}>
            <UserInfoInputModal
              viewUserInfoInputPopup={viewUserInfoInputPopup}
              closeUserInfoInputPopup={closeUserInfoInputPopup}
              handleUserName={handleUserName}
              handleUserImageIndex={handleUserImageIndex}
            />
          </Suspense>
        )}
        {viewTypingResultPopup && (
          <Suspense fallback={<div>Loading...</div>}>
            <TypingResultsModal
              closeTypingResultPopup={closeTypingResultPopup}
              startTyping={startTyping}
              stopTyping={stopTyping}
            />
          </Suspense>
        )}

        {viewTypingStatisticsPopup && (
          <Suspense fallback={<div>Loading...</div>}>
            <TypingStatisticsModal
              closeTypingStatisticsPopup={closeTypingStatisticsPopup}
            />
          </Suspense>
        )}

        {isPauseModalOpen && <PauseModal closeModal={closePauseModal} />}
      </div>
    </MyContext.Provider>
  );
};
