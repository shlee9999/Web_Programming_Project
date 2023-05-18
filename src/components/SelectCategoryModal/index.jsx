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
    console.log(key);
    if (key === 'Enter') startGame();
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
    console.log(index);
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
    console.log(language);
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
          <ul className='category_list'>
            {sentence_total.sentence.map((item, index) => {
              return (
                <button
                  className={`category_list_item ${
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
          </ul>
        </div>
        <button className='modal_close_button' onClick={handleClickStart}>
          Start!
        </button>
      </div>
    </div>
  );
};

export default Modal;
