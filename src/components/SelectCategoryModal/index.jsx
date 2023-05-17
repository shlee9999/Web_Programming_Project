import React, { useEffect, useState } from 'react';
import './index.css';
import sentence_english from '../../assets/sentence_english.json';
import sentence_korean from '../../assets/sentence_korean.json';

const Modal = ({
  closeModal,
  handleCategorySelect,
  startTyping,
  handleInputValue,
  inputRef,
  intervalRef,
  startTimer,
  handleTotalCorrectKeyStrokes,
  isTyping,
}) => {
  const [language, setLanguage] = useState(false); // false : korean
  const [sentenceIndex, setSentenceIndex] = useState(-1);

  const handleCategoryLanguage = (temp) => {
    setLanguage(temp);
    setSentenceIndex(-1);
  };
  const handleClickStart = () => {
    startTyping();
  };

  const sentence_total = language ? sentence_english : sentence_korean;

  const onClickModal = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isTyping) {
      closeModal();
      handleCategorySelect();
      startTyping();
      handleInputValue();
      inputRef.current.disabled = false;
      inputRef.current.focus();
      intervalRef.current = startTimer();
      handleTotalCorrectKeyStrokes();
    }
  }, [isTyping]);

  return (
    <div className='modal_overlay' onClick={closeModal}>
      <div className='modal_wrapper' onClick={onClickModal}>
        <div className='modal'>
          <div className='header_title'>
            Please choose a typing sentence category
          </div>
          <div className='select_language'>
            <p
              className='select_language_item'
              onClick={() => handleCategoryLanguage(false)}
            >
              한글
            </p>
            <p
              className='select_language_item'
              onClick={() => handleCategoryLanguage(true)}
            >
              English
            </p>
          </div>
          <div className='category_wrapper'>
            <ul className='category_list'>
              {sentence_total.sentence.map((item, index) => {
                return (
                  <li
                    className={`category_list_item ${
                      index === sentenceIndex && 'select_sentence'
                    }`}
                    key={`category_${index}`}
                    onClick={() => {
                      handleCategorySelect(item)();
                      setSentenceIndex(index);
                    }}
                  >
                    {item.title}
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            className='modal_close_button'
            onClick={() => handleClickStart()}
          >
            Start!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
