import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { Word } from 'components/AcidRain/Word';
import { acidRainWords, levelList } from 'constants/acidRainContents';
import { chunkArray, getInfo, shuffleArray } from 'utils/helper';
import AcidRainResultModal from '../AcidRainResultModal';

let shuffledIndexes = shuffleArray(acidRainWords); //다음 게임 시 초기화
let lastWord = acidRainWords[shuffledIndexes.indexOf(acidRainWords.length - 1)]; //게임 끝내기 위해 필요

export const AcidRainModal = ({ closeAcidRainModal }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [checkedWords, setCheckedWords] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [level, setLevel] = useState(1);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const [fallingWords, setFallingWords] = useState([]);
  const { LENGTH, timeLimit } = getInfo(level);
  const interval = timeLimit / LENGTH;
  const chunks = chunkArray(shuffledIndexes, LENGTH); //LENGTH개의 원소로 나눔
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const handleClickModal = (e) => {
    e.stopPropagation();
  };

  const handleClickOutside = () => {
    if (!isStarted) closeAcidRainModal();
  };
  const addFallingWords = (word) => {
    if (!fallingWords.includes(word))
      setFallingWords((prev) => [...prev, word]);
  };

  const popFallingWords = (word) => {
    if (word === lastWord) {
      setIsResultModalOpen(true);
      setIsStarted(false);
    }
    setFallingWords((prev) => prev.filter((prevWord) => prevWord !== word));
  };

  const handleInputKeyDown = ({ key }) => {
    switch (key) {
      case 'Enter':
        handleEnter();
        return;
      default:
        break;
    }
  };
  const handleButtonKeyDown = ({ key }) => {
    switch (key) {
      case 'ArrowLeft': //한국어로 전환
        setLevel((prev) => prev - 1);
        return;
      case 'ArrowRight':
        setLevel((prev) => prev + 1);
        return;
      case 'Enter':
        onClickStart();
        return;
      default:
        break;
    }
  };
  const handleEnter = () => {
    if (!inputRef.current) return;
    addCheckedWords();
    focusInput();
  };

  const focusInput = () => {
    inputRef.current.disabled = true;
    setTimeout(() => {
      inputRef.current.disabled = false;
      inputRef.current.focus();
    }, 0);
    setInputValue('');
  };

  const addCheckedWords = () => {
    fallingWords.forEach((word) => {
      if (word === inputValue) {
        setCheckedWords((prev) => {
          if (!prev.includes(word)) {
            return [...prev, word];
          }
          return prev;
        });
      }
    });
  };
  const closeResultModal = () => {
    //게임 초기화 & 통계 저장?
    setIsResultModalOpen(false);
    setIsStarted(false);
    setLevel(1);
    setCheckedWords([]);
    closeAcidRainModal();
  };
  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };
  const onClickStart = () => {
    setIsStarted(true);
  };
  const onClickLevelButton = (level) => () => {
    setLevel(level);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    buttonRef.current?.focus();
  }, [level]);
  useEffect(() => {
    inputRef.current?.focus();
  }, [isStarted]);

  if (!isStarted)
    return (
      <div className='modal_overlay' onClick={handleClickOutside}>
        <div className='acid_rain_modal' onClick={handleClickModal}>
          <div className='acid_rain_init_contents'>
            <p className='acid_rain_title'>산 성 비</p>
            <div className='level_buttons_wrapper'>
              {levelList.map((lev, index) => (
                <button
                  key={index}
                  className='level_button'
                  onClick={onClickLevelButton(index + 1)}
                  ref={level - 1 === index ? buttonRef : null}
                  onKeyDown={handleButtonKeyDown}
                >
                  {lev}
                </button>
              ))}
            </div>
            <button className='acid_rain_start_button' onClick={onClickStart}>
              Start!
            </button>
          </div>
        </div>
        {isResultModalOpen && (
          <AcidRainResultModal
            closeModal={closeResultModal}
            score={checkedWords.length}
          />
        )}
      </div>
    );
  return (
    <div className='modal_overlay' onClick={handleClickOutside}>
      <div className='acid_rain_modal' onClick={handleClickModal}>
        <div className='acid_rain_contents'>
          {chunks.map((row, rowIndex) => (
            <div className='acid_rain_top_row' key={rowIndex}>
              {row.map((wordIndex, index) => (
                <Word
                  key={index}
                  word={acidRainWords[wordIndex]}
                  isChecked={checkedWords.includes(acidRainWords[wordIndex])}
                  timeLimit={timeLimit}
                  interval={interval * shuffledIndexes[wordIndex]}
                  addFallingWords={addFallingWords}
                  popFallingWords={popFallingWords}
                />
              ))}
            </div>
          ))}
          <div className='limit'>
            <input
              className='acid_rain_input'
              value={inputValue}
              onChange={onChange}
              onKeyDown={handleInputKeyDown}
              ref={inputRef}
            />
          </div>
          <div className='acid_rain_result'>점수 : {checkedWords.length}</div>
        </div>
      </div>
      {isResultModalOpen && (
        <AcidRainResultModal
          closeModal={closeResultModal}
          score={checkedWords.length}
        />
      )}
    </div>
  );
};
