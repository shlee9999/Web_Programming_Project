import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import '../../global.css';
import sentence_english from '../../constants/sentence_english.json';
import sentence_korean from '../../constants/sentence_korean.json';

const Modal = ({
  closeModal,
  selectCategory,
  isTyping,
  startGame,
  language,
  toggleLanguage,
}) => {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [focusedCategoryIndex, setFocusedCategoryIndex] = useState(0);
  const buttonRef = useRef(null);
  const sentence_total = language ? sentence_english : sentence_korean;

  const handleKeyDown = ({ nativeEvent: { key } }) => {
    switch (key) {
      case 'ArrowUp':
        if (focusedCategoryIndex <= 0) return;
        setFocusedCategoryIndex((prev) => prev - 1);
        return;
      case 'ArrowDown':
        if (focusedCategoryIndex >= sentence_total.length) return;
        setFocusedCategoryIndex((prev) => prev + 1);
        return;
      case 'ArrowLeft': //한국어로 전환
        toKorean();
        return;
      case 'ArrowRight':
        toEnglish();
        return;
      case 'Enter':
        startGame();
        return;
      case 'Escape':
        closeModal();
        return;
      default:
        break;
    }
  };
  const handleClickStart = () => {
    startGame();
  };
  const onClickModal = (e) => {
    if (!buttonRef.current) return;
    e.stopPropagation();
    buttonRef.current.focus();
  };
  const handleFocusCategory = (item, index) => () => {
    setSentenceIndex(index);
    selectCategory(item)();
    setFocusedCategoryIndex(index);
  };

  const toKorean = () => {
    if (!language) return;
    toggleLanguage();
    setSentenceIndex(0);
  };
  const toEnglish = () => {
    if (language) return;
    toggleLanguage();
    setSentenceIndex(0);
  };

  useEffect(() => {
    if (!isTyping) return;
    startGame();
  }, [isTyping, startGame]);

  useEffect(() => {
    if (!buttonRef.current) return;
    buttonRef.current.focus();
  }, [language]);
  useEffect(() => {
    if (!buttonRef.current) return;
    buttonRef.current.focus();
  }, [focusedCategoryIndex]);

  return (
    <div className='modal_overlay' onClick={closeModal}>
      <div className='modal' onClick={onClickModal}>
        <div className='header_title'>
          Please choose a typing sentence category
        </div>
        <div className='select_language'>
          <p
            className={`select_language_item ${language && 'active'}`}
            onClick={toKorean}
          >
            한글
          </p>
          <p
            className={`select_language_item ${!language && 'active'}`}
            onClick={toEnglish}
          >
            English
          </p>
        </div>
        <div className='category_wrapper'>
          {sentence_total.sentence.map((item, index) => {
            return (
              <button
                className={`category_item ${
                  index === sentenceIndex && 'select_sentence'
                }`}
                key={`${language}_category_${index}`}
                onFocus={handleFocusCategory(item, index)}
                onKeyDown={handleKeyDown}
                ref={index === focusedCategoryIndex ? buttonRef : null}
              >
                {item.title}
              </button>
            );
          })}
        </div>
        <button className='modal_start_button' onClick={handleClickStart}>
          Start!
        </button>
      </div>
    </div>
  );
};

export default Modal;
