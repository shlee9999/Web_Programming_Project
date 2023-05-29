import hangul from 'hangul-js';
import { useCallback, useEffect, useState } from 'react';
import sentence_korean from '../constants/sentence_korean.json';
import sentence_english from '../constants/sentence_english.json';
const useVirtualKeyboard = ({ time, proposalIndex, endGame }) => {
  const [language, setLanguage] = useState(false); //Eng: true, Kor: false
  const sentence_total = language ? sentence_english : sentence_korean;
  const [currentIndex, setCurrentIndex] = useState(0); //현재 문장이 몇 번째 문장인가?
  const [currentSentence, setCurrentSentence] = useState(
    //현재 문장
    sentence_total.sentence[proposalIndex].text[currentIndex]
  );
  const [activeKeys, setActiveKeys] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [totalCorrectKeyStrokes, setTotalCorrectKeyStrokes] = useState(0);
  const [totalCursor, setTotalCursor] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [prevLength, setPrevLength] = useState(0);
  const [prevTotalCorrectKeys, setPrevTotalCorrectKeys] = useState(0);
  const [totalAccuracy, setTotalAccuracy] = useState(100);

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  const onKeyDown = ({ key }) => {
    //엔터키 등 특수 이벤트 처리
    switch (key) {
      case 'Enter':
        handleEnter();
        return;
      case 'Backspace':
        handleBackspace();
        return;
      default:
        break;
    }
    if (key.length === 1) {
      setActiveKeys((prev) => [...prev, key.toUpperCase()]);
      setTimeout(() => {
        setActiveKeys((prev) => {
          prev.pop();
          return prev;
        });
      }, 500);
    }
  };

  const initializeKeyboard = () => {
    setInputValue('');
    setCurrentIndex(0);
    setTotalCorrectKeyStrokes(0);
    setTotalCursor(0);
    setTypingSpeed(0);
    setPrevLength(0);
    setPrevTotalCorrectKeys(0);
    setTotalAccuracy(100);
  };

  const handleEnter = () => {
    if (inputValue.length < currentSentence.length - 5) return;
    if (currentIndex < sentence_total.sentence[proposalIndex].text.length - 1) {
      setPrevLength((prev) => prev + currentSentence.length);
      setCurrentIndex((prev) => prev + 1); //왜 2번씩..호출되지..
      setPrevTotalCorrectKeys(totalCorrectKeyStrokes);
    } //다음 문장으로 넘어간다.

    if (
      currentIndex ===
      sentence_total.sentence[proposalIndex].text.length - 1
    ) {
      //마지막 문장에서 엔터를 쳤을 때
      endGame();
    }
    // if (!language) setInputValue(inputValue + ' ');
    setInputValue('');
  };
  const handleBackspace = () => {
    if (inputValue.length < 1) return;
    if (totalCorrectKeyStrokes > 0)
      setTotalCorrectKeyStrokes((prev) => prev - 1);
  };
  const toggleLanguage = () => {
    setLanguage(!language);
  };

  const checkCurrentSentence = useCallback(() => {
    const splitInput = inputValue.split('');
    let correctKeys = 0;
    setCurrentSentence(
      sentence_total.sentence[proposalIndex].text[currentIndex]
        .split('')
        .map((letter, index) => {
          if (index > inputValue.length - 1) return letter;
          if (index === inputValue.length - 1) {
            if (!language) {
              const disassembledLetter = hangul.disassemble(letter);
              const disassembledLastChar = hangul.disassemble(
                inputValue[inputValue.length - 1]
              );
              const minLength = Math.min(
                disassembledLetter.length,
                disassembledLastChar.length
              );
              let isSame = true;
              for (let i = 0; i < minLength; i++) {
                if (disassembledLetter[i] !== disassembledLastChar[i])
                  isSame = false;
              }
              if (isSame) {
                correctKeys++;
                return (
                  <span key={index} className='correctly_typed'>
                    {letter}
                  </span>
                );
              }
              if (!isSame)
                return (
                  <span key={index} className='mistyped'>
                    {letter}
                  </span>
                );
            }
            //영어
          }
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
    setTotalCorrectKeyStrokes(prevTotalCorrectKeys + correctKeys);
  }, [
    currentIndex,
    inputValue,
    language,
    prevTotalCorrectKeys,
    proposalIndex,
    sentence_total.sentence,
  ]);

  useEffect(() => {
    setTotalCursor(prevLength);
  }, [prevLength]);

  useEffect(() => {
    if (inputValue.length === 0) return;
    setTotalCursor(prevLength + inputValue.length - 1);
    setTotalAccuracy(
      ((totalCorrectKeyStrokes / (totalCursor + 1)) * 100).toFixed(0)
    );
    // console.log(totalCorrectKeyStrokes + ' ' + totalCursor);
    checkCurrentSentence(); //Input 검사 로직
  }, [
    inputValue,
    checkCurrentSentence,
    prevLength,
    totalCorrectKeyStrokes,
    totalCursor,
  ]); //한글 영어 모두 적용됨.

  useEffect(() => {
    setTypingSpeed(((totalCorrectKeyStrokes / (time + 1)) * 60).toFixed(0));
  }, [time, totalCorrectKeyStrokes]);

  useEffect(() => {
    setCurrentSentence(
      sentence_total.sentence[proposalIndex].text[currentIndex]
    );
  }, [currentIndex, proposalIndex, sentence_total.sentence]);

  return {
    inputValue,
    onChange,
    onKeyDown,
    currentSentence,
    typingSpeed,
    totalAccuracy,
    initializeKeyboard,
    language,
    toggleLanguage,
    activeKeys,
  };
};

export default useVirtualKeyboard;
