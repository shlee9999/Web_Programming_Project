import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import sentence_english from 'constants/sentence_english.json';
import sentence_korean from 'constants/sentence_korean.json';

const SelectCategoryModal = ({
  closeModal,
  selectCategory,
  startGame,
  language,
  toggleLanguage,
  toggleMode,
  typingMode,
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
      case 'Tab':
        toSentenceMode();
        toWordMode();
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
  const handleFocusCategory = (index) => () => {
    setSentenceIndex(index);
    selectCategory(index);
    setFocusedCategoryIndex(index);
  };

  const toSentenceMode = () => {
    if (!typingMode) return;

    toggleMode();
  };

  const toWordMode = () => {
    if (typingMode) return;

    toggleMode();
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
    if (!buttonRef.current) return;
    buttonRef.current.focus();
  }, [language]);

  useEffect(() => {
    if (!buttonRef.current) return;
    buttonRef.current.focus();
  }, [focusedCategoryIndex]);

  useEffect(() => {
    if (!buttonRef.current) return;
    buttonRef.current.focus();
  }, [typingMode]);

  const renderCategory = (mode) => {
    const data = mode ? sentence_total.word : sentence_total.sentence;
    return data.map((item, index) => {
      return (
        <button
          className={`category_item ${
            index === sentenceIndex && 'select_sentence'
          }`}
          key={`${language}_category_${index}`}
          onFocus={handleFocusCategory(index)}
          onKeyDown={handleKeyDown}
          ref={index === focusedCategoryIndex ? buttonRef : null}
        >
          {item.title}
        </button>
      );
    });
  };

  return (
    <div className='modal_overlay' onClick={closeModal}>
      <div className='modal' onClick={onClickModal}>
        <div className='header_title'>
          Please choose a typing sentence category
        </div>
        <div className='select_typing_mode'>
          <button
            className={`select_mode_item select_item ${
              typingMode && 'item_active'
            }`}
            onClick={toSentenceMode}
          >
            긴 글 연습
          </button>
          <button
            className={`select_mode_item select_item ${
              !typingMode && 'item_active'
            }`}
            onClick={toWordMode}
          >
            단어 연습
          </button>
        </div>
        <div className='select_mode_child_wrapper'>
          <div className='select_language'>
            <button
              className={`select_language_item select_item ${
                language && 'item_active'
              }`}
              onClick={toKorean}
            >
              한글
            </button>
            <button
              className={`select_language_item select_item ${
                !language && 'item_active'
              }`}
              onClick={toEnglish}
            >
              English
            </button>
          </div>
          <div className='category_wrapper'>{renderCategory(typingMode)}</div>
        </div>
        <button className='modal_start_button' onClick={handleClickStart}>
          Start!
        </button>
      </div>
    </div>
  );
};

export default SelectCategoryModal;
