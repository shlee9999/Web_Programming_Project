import React, { useEffect, useState } from 'react';
import './index.css';
import '../../global.css';
import sentence_english from '../../assets/sentence_english.json';
import sentence_korean from '../../assets/sentence_korean.json';

const Modal = ({ closeModal, selectCategory, isTyping, startGame }) => {
  const [language, setLanguage] = useState(false); // false : korean
  const [sentenceIndex, setSentenceIndex] = useState(-1);

  const handleCategoryLanguage = (temp) => {
    setLanguage(temp);
    setSentenceIndex(-1);
  };
  const handleClickStart = () => {
    startGame();
  };

  const sentence_total = language ? sentence_english : sentence_korean;

  const onClickModal = (e) => {
    e.stopPropagation();
  };
  const handleClickCategory = (item, index) => () => {
    selectCategory(item)();
    setSentenceIndex(index);
  };
  useEffect(() => {
    if (isTyping) {
      startGame();
    }
  }, [isTyping]);

  return (
    <div className='modal_overlay' onClick={closeModal}>
      <div className='modal' onClick={onClickModal}>
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
                  onClick={handleClickCategory(item, index)}
                >
                  {item.title}
                </li>
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
