import React, { useEffect, useRef, useState } from 'react';
import Hangul from 'hangul-js';
import './index.css';

const proposalsEnglish = ['Hello, World!', 'Welcome to our project'];
const proposalsKorean = ['안녕하세요', '환영합니다'];
// const totalProposals = ''.concat(proposals.map((p) => p));
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
  const intervalRef = useRef(null);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
  }${seconds}`;
  const proposals = language ? proposalsEnglish : proposalsKorean;
  const handleClickStart = () => {
    setIsTyping(true);
    setInputValue('');
    inputRef.current.disabled = false;
    inputRef.current.focus();
    intervalRef.current = startTimer();
    setTotalCorrectKeyStrokes(0); // 초기화
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
    setCursor(0);
    setCorrectKeyStrokes(0);
    setInputValue('');
    if (proposalIndex === proposals.length - 1) {
      if (totalAccuracy < 60) {
        //통계에 기록되지 않습니다.
      }
      setIsTyping(false);
      setProposalIndex(0);
      inputRef.current.disabled = true;
      stopTimer();
      setTotalCorrectKeyStrokes(0);
      setTime(0);
      setTotalCursor(0);
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
  const handlePressEnglish = (e) => {
    const key = e.nativeEvent.key;
    setCursor((prev) => prev + 1);
    setTotalCursor((prev) => prev + 1);
    setInputValue(inputValue + key);
    if (proposals[proposalIndex].charAt(cursor) === key) {
      setCorrectKeyStrokes((prev) => prev + 1);
      setTotalCorrectKeyStrokes((prev) => prev + 1);
    }
  };

  const handlePressKorean = (e) => {
    const key = e.nativeEvent.key;
    const disassembledInputValue = Hangul.disassemble(inputValue);
    const disassembledProposal = Hangul.disassemble(proposals[proposalIndex]);
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
    if (event.keyCode === 91 || key === 'CapsLock') {
      toggleLanguage();
      return;
    }
    if (
      key === 'Enter' &&
      inputValue.length >= proposals[proposalIndex].length
    ) {
      handlePressEnter();
      return;
    }
    if (key === 'Backspace') {
      handlePressBackspace();
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

  useEffect(() => {
    if (cursor === 0) return;
    setAccuracy((correctKeyStrokes / cursor) * 100);
    setTotalAccuracy((totalCorrectKeyStrokes / totalCursor) * 100);
    onTypingAccuracyChange(accuracy.toFixed(0));
  }, [cursor]);

  useEffect(() => {
    onTypingSpeedChange(((totalCorrectKeyStrokes / time) * 60).toFixed(0));
  }, [totalCorrectKeyStrokes, time]);

  const keyRows = language === true ? keyRowsEnglish : keyRowsKorean;
  return (
    <div className='virtual_keyboard'>
      <div className='keyboard_wrapper'>
        <div>
          <br /> 진행 시간 : {formattedTime}
          {/* <br /> 타수 :
          {time === 0 ? 0 : ((totalCorrectKeyStrokes / time) * 60).toFixed(0)}
          <br /> 전체 정확도 :
          {isTyping && totalAccuracy > 0 ? totalAccuracy.toFixed(0) : 0}%
          <br /> 현재 정확도 :
          {isTyping && totalAccuracy > 0 ? accuracy.toFixed(0) : 0}% */}
        </div>
        <div className='proposal'>
          {isTyping ? (
            <p>{proposals[proposalIndex]}</p>
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
      </div>
    </div>
  );
};

export default VirtualKeyboard;
