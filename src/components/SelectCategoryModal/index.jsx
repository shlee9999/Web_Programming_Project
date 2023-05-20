import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import '../../global.css';
import sentence_english from '../../assets/sentence_english.json';
import sentence_korean from '../../assets/sentence_korean.json';

const Modal = ({
  closeModal,
  selectCategory,
  isTyping,
  startGame,
  language,
  toggleLanguage,
}) => {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const buttonRef = useRef(null);
  const sentence_total = language ? sentence_english : sentence_korean;

  const handleKeyDown = (e) => {
    const key = e.nativeEvent.key;
    switch (key) {
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
    e.stopPropagation();
  };
  const handleClickCategory = (item, index) => () => {
    selectCategory(item)();
    setSentenceIndex(index);
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

  return (
    <div className='modal_overlay' onClick={closeModal}>
      <div className='modal' onClick={onClickModal}>
        <div className='header_title'>
          Please choose a typing sentence category
        </div>
        <div className='select_language'>
          <p className='select_language_item' onClick={toKorean}>
            한글
          </p>
          <p className='select_language_item' onClick={toEnglish}>
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
                onFocus={handleClickCategory(item, index)}
                onKeyDown={handleKeyDown}
                ref={index === 0 ? buttonRef : null}
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
