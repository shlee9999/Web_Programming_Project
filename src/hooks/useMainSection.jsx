import { useState, inputRef } from 'react';
import { useTimer } from './useTimer';
export const useMainSection = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [viewUserInfoInputPopup, setViewUserInfoInputPopup] = useState(true);
  const [viewTypingResultPopup, setViewTypingResultPopup] = useState(false);
  const [viewTypingStatisticsPopup, setViewTypingStatisticsPopup] =
    useState(false);

  const [userName, setUserName] = useState('');
  const [userImageIndex, setUserImageIndex] = useState(0);

  const handleUserName = (name) => {
    setUserName(name);
  };

  const handleUserImageIndex = (imageIndex) => {
    setUserImageIndex(imageIndex);
  };

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

  return {
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
  };
};
