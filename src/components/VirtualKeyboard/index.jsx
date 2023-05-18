import React, { useEffect, useRef, useState } from 'react';
import Hangul from 'hangul-js';
import './index.css';
import SelectSentenceCategoryModal from '../SelectCategoryModal';
import PauseModal from '../PauseModal';

const keyRowsEnglish = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
const keyRowsKorean = [
  'ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔ',
  'ㅁㄴㅇㄹㅎㅗㅓㅏㅣ',
  'ㅋㅌㅊㅍㅠㅜㅡ',
];
const VirtualKeyboard = ({ onTypingSpeedChange, onTypingAccuracyChange }) => {
  const inputRef = useRef(null);
  const [totalCorrectKeyStrokes, setTotalCorrectKeyStrokes] = useState(0);
  const [correctKeyStrokes, setCorrectKeyStrokes] = useState(0);
  const [cursor, setCursor] = useState(0);
  const [totalCursor, setTotalCursor] = useState(0);
  const [time, setTime] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState(true); //true = Eng
  const [inputValue, setInputValue] = useState('');
  const [activeKeys, setActiveKeys] = useState([]);
  const [proposalIndex, setProposalIndex] = useState(0);
  const [totalAccuracy, setTotalAccuracy] = useState(100);
  const [accuracy, setAccuracy] = useState(100);
  // const [sentenceCategory, setSentenceCategory] = useState('');
  const [sentence, setSentence] = useState([]);
  const intervalRef = useRef(null);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
  }${seconds}`;

  const handleClickStart = () => {
    openSelectModal();
  };
  const openPauseModal = () => {
    if (!isTyping) return;
    setIsPauseModalOpen(true);
    stopTimer();
  };
  const closePauseModal = () => {
    if (!isPauseModalOpen) return;
    setIsPauseModalOpen(false);
    intervalRef.current = startTimer();
    inputRef.current.focus();
  };
  const openSelectModal = () => {
    if (isSelectModalOpen) return;
    setIsSelectModalOpen(true);
  };
  const closeSelectModal = () => {
    if (!isSelectModalOpen) return;
    setIsSelectModalOpen(false);
  };

  const startTimer = () => {
    return setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };
  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };
  const handlePressEnter = () => {
    if (inputValue.length < sentence[proposalIndex].length - 8) return; //8글자 덜 써도 넘어갈 수 있습니다.
    setCursor(0);
    setCorrectKeyStrokes(0);
    setInputValue('');
    if (proposalIndex === sentence.length - 1) {
      //전체 문장을 다 쳤을 때 (게임 끝)
      if (totalAccuracy < 60) {
        //통계에 기록되지 않습니다. 또는 기록할 것인지 물어보기 기능 추가?
      }
      setIsTyping(false);
      return;
    }
    setProposalIndex((prev) => prev + 1);
  };

  const handlePressBackspace = () => {
    const lastChar = inputValue.slice(-1);
    const disassembledLastChar = Hangul.disassemble(lastChar);
    setInputValue(inputValue.slice(0, -1));

    if (cursor !== 0) {
      setCursor((prev) => prev - disassembledLastChar.length);
      setTotalCursor((prev) => prev - disassembledLastChar.length);
    }

    if (correctKeyStrokes > 0) {
      setCorrectKeyStrokes((prev) => prev - disassembledLastChar.length);
    }

    if (totalCorrectKeyStrokes > 0) {
      setTotalCorrectKeyStrokes((prev) => prev - disassembledLastChar.length);
    }
  };

  const handlePressESC = () => {
    openPauseModal(); //일시정지 띄우기(stoptimer)
    //일시정지 모달 띄우고, 모달 종료하면 다시 시작되게 하기
  };

  const handlePressEnglish = (e) => {
    const key = e.nativeEvent.key;
    setCursor((prev) => prev + 1);
    setTotalCursor((prev) => prev + 1);
    setInputValue(inputValue + key);
    if (sentence[proposalIndex].charAt(cursor) === key) {
      setCorrectKeyStrokes((prev) => prev + 1);
      setTotalCorrectKeyStrokes((prev) => prev + 1);
    }
  };

  const handleClickPauseButton = () => {
    openPauseModal();
  };

  const handlePressKorean = (e) => {
    const key = e.nativeEvent.key;
    const disassembledInputValue = Hangul.disassemble(inputValue);
    const disassembledProposal = Hangul.disassemble(sentence[proposalIndex]);
    const temp = Hangul.assemble([...disassembledInputValue, key]);

    setCursor((prev) => prev + Hangul.disassemble(key).length);
    setTotalCursor((prev) => prev + Hangul.disassemble(key).length);
    setInputValue(temp);

    if (
      disassembledProposal
        .slice(cursor, cursor + Hangul.disassemble(key).length)
        .join('') === key
    ) {
      setCorrectKeyStrokes((prev) => prev + Hangul.disassemble(key).length);
      setTotalCorrectKeyStrokes(
        (prev) => prev + Hangul.disassemble(key).length
      );
    }
  };

  const handleKeyPress = (event) => {
    const key = event.nativeEvent.key;
    if (!key) return;
    switch (key) {
      case 'Enter':
        handlePressEnter();
        return;
      case 'Backspace':
        handlePressBackspace();
        return;
      case 'CapsLock':
        toggleLanguage();
        return;
      case 'Escape':
        handlePressESC();
        return;
    }

    if (key.length === 1) {
      if (language) {
        handlePressEnglish(event);
      } else {
        handlePressKorean(event);
      }
      setActiveKeys((prev) => [...prev, key.toUpperCase()]);
      setTimeout(() => {
        setActiveKeys((prev) => {
          prev.pop();
          return prev;
        });
      }, 500);
    }
  };

  const toggleLanguage = () => {
    setLanguage(!language);
  };

  const selectCategory = (item) => () => {
    // setSentenceCategory(item.title);
    setSentence(item.text);
  };

  const startTyping = () => {
    setIsTyping(true);
  };

  const clearInputValue = () => {
    setInputValue('');
  };

  const handleTotalCorrectKeyStrokes = () => {
    setTotalCorrectKeyStrokes(0); // 초기화
  };

  const initialize = () => {
    setProposalIndex(0);
    inputRef.current.disabled = true;
    stopTimer();
    setTotalCorrectKeyStrokes(0);
    setTime(0);
    setTotalCursor(0);
    onTypingAccuracyChange(100);
  };

  useEffect(() => {
    if (cursor === 0) return;
    if (correctKeyStrokes >= 0) setAccuracy((correctKeyStrokes / cursor) * 100);
    setTotalAccuracy((totalCorrectKeyStrokes / totalCursor) * 100);
    onTypingAccuracyChange(accuracy.toFixed(0));
  }, [cursor]);

  useEffect(() => {
    if (totalCorrectKeyStrokes < 0 || time === 0) return;
    onTypingSpeedChange(((totalCorrectKeyStrokes / time) * 60).toFixed(0));
  }, [totalCorrectKeyStrokes, time]);

  useEffect(() => {
    if (isTyping) return; //일시정지 상태일 경우 return되어 초기화 되지 않도록 함.
    initialize();
  }, [isTyping]);
  const startGame = () => {
    closeSelectModal();
    startTyping();
    clearInputValue();
    inputRef.current.disabled = false;
    inputRef.current.focus();
    intervalRef.current = startTimer();
    handleTotalCorrectKeyStrokes();
  };

  const keyRows = language ? keyRowsEnglish : keyRowsKorean;
  return (
    <div className='virtual_keyboard'>
      <div className='keyboard_wrapper'>
        <div>
          <br /> 진행 시간 : {formattedTime}
        </div>
        <div className='proposal'>
          {isTyping ? (
            <p>{sentence[proposalIndex]}</p>
          ) : (
            <button onClick={handleClickStart} id='start_typing_button'>
              StartTyping!
            </button>
          )}
        </div>

        <input
          className='keyboard_input'
          type='text'
          value={inputValue}
          onKeyDown={handleKeyPress}
          onChange={handleKeyPress}
          placeholder={isTyping ? '' : ' Please Press Start Typing Button.'}
          disabled
          ref={inputRef}
        />
        <div className='keyboard_keys_container'>
          {keyRows.map((row, rowIndex) => (
            <div key={rowIndex} className='row_keys_wrapper'>
              {row.split('').map((key, index) => (
                <button
                  key={index}
                  className={`keyboard_keys ${
                    activeKeys.includes(key.toUpperCase()) ? 'active' : ''
                  }`}
                  id={key}
                >
                  {key}
                </button>
              ))}
            </div>
          ))}
        </div>
        {isTyping && (
          <button className='pause_button' onClick={handleClickPauseButton}>
            일시 정지
          </button>
        )}
      </div>
      {isSelectModalOpen && (
        <SelectSentenceCategoryModal
          closeModal={closeSelectModal}
          isTyping={isTyping}
          selectCategory={selectCategory}
          startGame={startGame}
        />
      )}
      {isPauseModalOpen && <PauseModal closeModal={closePauseModal} />}
    </div>
  );
};

export default VirtualKeyboard;
