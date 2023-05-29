import React, { useEffect, useState } from 'react';
import Hangul from 'hangul-js';
import './index.css';
import SelectCategoryModal from '../SelectCategoryModal';
import sentence_korean from '../../constants/sentence_korean.json';
import sentence_english from '../../constants/sentence_english.json';

import { keyRowsKorean, keyRowsEnglish } from '../../constants/keyRows';
const isWindow = navigator.platform.toUpperCase().indexOf('WIN') !== -1;
// const isWindow = true;
const VirtualKeyboard = ({
  inputRef,
  onTypingSpeedChange,
  onTypingAccuracyChange,
  showTypingResultPopup,
  time,
  stopTimer,
  startTimer,
  isTyping,
  startTyping,
  stopTyping,
  totalCorrectKeyStrokes,
  handleTotalCorrectKeyStrokes,
}) => {
  const [correctKeyStrokes, setCorrectKeyStrokes] = useState(isWindow ? 1 : 0); //1?
  const [prevTotalCorrectKeys, setPrevTotalCorrectKeys] = useState(0);
  const [prevTotalLength, setPrevTotalLength] = useState(0);
  const [cursor, setCursor] = useState(0);
  const [totalCursor, setTotalCursor] = useState(0);
  const [language, setLanguage] = useState(false); //true = Eng
  const [inputValue, setInputValue] = useState('');
  const [activeKeys, setActiveKeys] = useState([]);
  const [proposalIndex, setProposalIndex] = useState(0);
  const [totalAccuracy, setTotalAccuracy] = useState(100);
  // const [sentenceCategory, setSentenceCategory] = useState('');
  const [sentence, setSentence] = useState(sentence_korean.sentence[0].text);
  const [checkedProposal, setCheckedProposal] = useState(
    sentence[proposalIndex]
  );
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);

  const keyRows = language ? keyRowsEnglish : keyRowsKorean;

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
  }${seconds}`;

  const [isGameReady, setIsGameReady] = useState(false);

  const handleClickStart = () => {
    openSelectModal();
  };

  const openSelectModal = () => {
    if (isSelectModalOpen) return;
    setIsSelectModalOpen(true);
  };
  const closeSelectModal = () => {
    if (!isSelectModalOpen) return;
    setIsSelectModalOpen(false);
  };

  const handlePressEnter = () => {
    //다음 문장으로 넘어가는 기능
    if (inputValue.length < sentence[proposalIndex].length - 8) return; //8글자 덜 써도 넘어갈 수 있습니다.
    if (isWindow)
      setPrevTotalCorrectKeys((prev) => prev + correctKeyStrokes + 1);
    setCursor(0);
    setInputValue('');
    setCorrectKeyStrokes(0);

    if (proposalIndex === sentence.length - 1) {
      //전체 문장을 다 쳤을 때 (게임 끝)
      // endGame();
      if (totalAccuracy < 60) {
        //통계에 기록되지 않습니다. 또는 기록할 것인지 물어보기 기능 추가?
      }
      stopTyping();
      return;
    }
    setProposalIndex((prev) => prev + 1);
  };

  const handlePressBackspace = () => {
    if (isWindow) {
      if (language) {
        setInputValue(inputValue.slice(0, -1));
        if (cursor !== 0) {
          setCursor((prev) => prev - 1);
          setTotalCursor((prev) => prev - 1);
        }

        if (correctKeyStrokes > 0) {
          setCorrectKeyStrokes((prev) => prev - 1);
        }

        if (totalCorrectKeyStrokes > 0) {
          handleTotalCorrectKeyStrokes((prev) => prev - 1);
        }
      }
      //한국어
      setCorrectKeyStrokes((prev) => prev - 2);
      handleTotalCorrectKeyStrokes((prev) => prev - 2);
    } else {
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
        handleTotalCorrectKeyStrokes(
          (prev) => prev - disassembledLastChar.length
        );
      }
    }
  };

  const handlePressEnglish = (key) => {
    setCursor((prev) => prev + 1);
    setTotalCursor((prev) => prev + 1);
    setInputValue(inputValue + key);
    if (sentence[proposalIndex].charAt(cursor) === key) {
      setCorrectKeyStrokes((prev) => prev + 1);
      handleTotalCorrectKeyStrokes((prev) => prev + 1);
    }
  };

  const handlePressKorean = (key) => {
    if (isWindow) return;
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
      handleTotalCorrectKeyStrokes(
        (prev) => prev + Hangul.disassemble(key).length
      );
    }
  };

  const handleKeyDown = ({ nativeEvent: { key } }) => {
    switch (key) {
      case 'Enter':
        handlePressEnter();
        return;
      case 'Backspace':
        handlePressBackspace();
        return;
      default:
        break;
    }

    if (isWindow || !key) return; //영문용
    if (!isTyping && key.length === 1) {
      startTyping();
      startTimer();
    }

    if (key.length === 1) {
      if (language) {
        handlePressEnglish(key);
      } else {
        handlePressKorean(key);
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
    if (language) {
      //영어
      setSentence(sentence_english.sentence[0].text);
    } //한국어
    else setSentence(sentence_korean.sentence[0].text);
  };

  const startGame = () => {
    closeSelectModal();
    setInputValue('');
    handleTotalCorrectKeyStrokes(0);
    setIsGameReady(true);
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const handleInputChange = ({ target: { value } }) => {
    if (language) return;
    if (!isTyping) {
      startTyping();
      startTimer();
    }
    setInputValue(value);
  };
  useEffect(() => {
    if (isWindow) {
      if (totalCursor !== 0) {
        setTotalAccuracy(((1 + totalCorrectKeyStrokes) / totalCursor) * 100);
        handleTotalCorrectKeyStrokes(prevTotalCorrectKeys + correctKeyStrokes);
      }
      onTypingAccuracyChange(
        totalAccuracy.toFixed(0) > 100 ? 100 : totalAccuracy.toFixed(0)
      );
      setTotalCursor(prevTotalLength + cursor);
    } else {
      if (cursor === 0) return;
      setTotalAccuracy((totalCorrectKeyStrokes / totalCursor) * 100);
      onTypingAccuracyChange(totalAccuracy.toFixed(0));
    }
  }, [
    cursor,
    prevTotalCorrectKeys,
    prevTotalLength,
    totalAccuracy,
    correctKeyStrokes,
    totalCursor,
    handleTotalCorrectKeyStrokes,
    onTypingAccuracyChange,
    totalCorrectKeyStrokes,
  ]);

  useEffect(() => {
    if (totalCorrectKeyStrokes < 0) return;
    onTypingSpeedChange(
      ((totalCorrectKeyStrokes / (time + 1)) * 60).toFixed(0)
    );
  }, [
    totalCorrectKeyStrokes,
    time,
    onTypingAccuracyChange,
    onTypingSpeedChange,
  ]);
  useEffect(() => {
    if (!isWindow) return;
    const checkKorean = () => {
      const splitInput = inputValue.split('');
      let correctKeys = 0;
      setCheckedProposal(
        sentence[proposalIndex].split('').map((letter, index) => {
          if (index >= cursor) return letter;
          if (letter === splitInput[index]) {
            correctKeys++;
            return (
              <span key={index} className='correctly_typed'>
                {letter}
              </span>
            );
          }
          return (
            <span key={index} className='mistyped'>
              {letter}
            </span>
          );
        })
      );
      setCorrectKeyStrokes(correctKeys); //감각?
      handleTotalCorrectKeyStrokes(prevTotalCorrectKeys + correctKeys);
    };
    setCursor(inputValue.length);
    checkKorean();
  }, [
    inputValue.length,
    isSelectModalOpen,
    // cursor,
    // handleTotalCorrectKeyStrokes,
    // prevTotalCorrectKeys,
    // proposalIndex,
    // sentence,
  ]);

  useEffect(() => {
    if (isTyping) return; //일시정지 상태일 경우 return되어 초기화 되지 않도록 함.
    if (time === 0) return;
    const endGame = () => {
      setProposalIndex(0);
      inputRef.current.disabled = true;
      setTotalCursor(0);
      stopTimer();
      setIsGameReady(false);
      showTypingResultPopup();
    };
    endGame();
  }, [isTyping, time, inputRef, showTypingResultPopup, stopTimer]);

  const checkedEnglish = () => {
    return sentence[proposalIndex].split('').map((letter, index) => {
      let state = '';
      if (index < cursor) {
        if (letter !== inputValue[index] && index < cursor) state = 'mistyped';
        else state = 'correctly_typed';
      }
      return (
        <span key={index} className={state}>
          {letter}
        </span>
      );
    });
  };
  useEffect(() => {
    if (!isWindow) return;
    let sum = 0;
    for (let i = 0; i < proposalIndex; i++) {
      sum += sentence[i].length;
    }
    setPrevTotalLength(sum);
    setTotalCursor(sum);
  }, [proposalIndex, sentence]);

  useEffect(() => {
    if (totalCorrectKeyStrokes < 0) return;
    onTypingSpeedChange(
      ((totalCorrectKeyStrokes / (time + 1)) * 60).toFixed(0)
    );
  }, [
    totalCorrectKeyStrokes,
    time,
    onTypingAccuracyChange,
    onTypingSpeedChange,
  ]);

  const checkedKorean = () => {
    const disassembled_inputValue = Hangul.disassemble(inputValue);
    let disassembled_cursor = 0;
    const checkedSentence = sentence[proposalIndex]
      .split('')
      .map((letter, index) => {
        let state = '';
        const disassembled = Hangul.disassemble(letter);
        disassembled.forEach((syllable) => {
          if (disassembled_cursor < cursor)
            if (state !== 'mistyped') {
              if (disassembled_inputValue[disassembled_cursor] !== syllable)
                state = 'mistyped';
              else state = 'correctly_typed';
            }
          disassembled_cursor += 1;
        });

        return (
          <span key={index} className={`${state}`}>
            {letter}
          </span>
        );
      });
    return checkedSentence;
  };

  return (
    <div className='virtual_keyboard'>
      <div className='keyboard_wrapper'>
        <div>
          <br /> 진행 시간 : {formattedTime}
        </div>
        <div className='proposal'>
          {isGameReady ? (
            <p>
              {language
                ? checkedEnglish()
                : isWindow
                ? checkedProposal
                : checkedKorean()}
            </p>
          ) : (
            <button onClick={handleClickStart} id='start_typing_button'>
              Start Typing!
            </button>
          )}
        </div>
        {isWindow ? (
          <input
            className='keyboard_input'
            onKeyDown={handleKeyDown}
            onChange={handleInputChange} //korean
            type='text'
            value={inputValue}
            placeholder={
              isGameReady ? '' : 'Window! Please Press Start Typing Button.'
            }
            disabled
            ref={inputRef}
          />
        ) : (
          <input
            className='keyboard_input'
            type='text'
            value={inputValue}
            onKeyDown={handleKeyDown}
            placeholder={
              isGameReady ? '' : 'MacOS! Please Press Start Typing Button.'
            }
            disabled
            ref={inputRef}
          />
        )}
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
      {isSelectModalOpen && (
        <SelectCategoryModal
          closeModal={closeSelectModal}
          isTyping={isTyping}
          selectCategory={selectCategory}
          startGame={startGame}
          language={language}
          toggleLanguage={toggleLanguage}
        />
      )}
    </div>
  );
};

export default VirtualKeyboard;
