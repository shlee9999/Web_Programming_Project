import hangul from 'hangul-js';
import { useCallback, useContext, useEffect, useState } from 'react';
import sentence_korean from 'constants/sentence_korean.json';
import sentence_english from 'constants/sentence_english.json';
import enter_sound from 'assets/sounds/Enter.mp3';
import end_sound from 'assets/sounds/Yeah.wav';
import { MyContext } from 'pages/TypingPage/MainSection';

const EnterSound = new Audio(enter_sound);
const EndSound = new Audio(end_sound);

let prevTotalCorrectKeys = 0;
let title = '';
let currentIndex = 0;

const useVirtualKeyboard = ({ time, proposalIndex, endGame, inputRef }) => {
  const [language, setLanguage] = useState(false); //Eng: true, Kor: false
  const sentence_total = language ? sentence_english : sentence_korean;
  const [currentSentence, setCurrentSentence] = useState(
    sentence_total.sentence[proposalIndex].text[currentIndex] //현재 문장
  );
  const [activeKeys, setActiveKeys] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [totalCorrectKeyStrokes, setTotalCorrectKeyStrokes] = useState(0);
  const [totalCursor, setTotalCursor] = useState(0);

  const { setTypingSpeed, setTotalAccuracy } = useContext(MyContext);
  const onChange = ({ target: { value } }) => {
    if (!value) {
      setInputValue('');
      setCurrentSentence(
        sentence_total.sentence[proposalIndex].text[currentIndex]
      );
      return;
    }
    const lastChar = value[value.length - 1];
    const key = language ? lastChar : hangul.disassemble(lastChar);
    if (
      !language &&
      hangul.disassemble(inputValue).length < hangul.disassemble(value).length
    ) {
      colorKeyboard(key);
    } else if (language && inputValue.length < value.length) colorKeyboard(key);
    setInputValue(value);
  };
  const getPrevLength = useCallback(() => {
    return sentence_total.sentence[proposalIndex].text.reduce(
      (acc, sentence, index) =>
        index < currentIndex ? acc + sentence.length : acc,
      0
    );
  }, [proposalIndex, sentence_total.sentence]);

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
        return;
    }
  };

  const handleEnter = () => {
    if (inputValue.length < currentSentence.length - 5) return;
    if (currentIndex < sentence_total.sentence[proposalIndex].text.length) {
      currentIndex++;
      prevTotalCorrectKeys = totalCorrectKeyStrokes;
    } //다음 문장으로 넘어간다.
    if (currentIndex !== sentence_total.sentence[proposalIndex].text.length)
      EnterSound.play();
    else {
      //마지막 문장에서 엔터를 쳤을 때
      EndSound.play();
      endGame();
    }

    if (!language) {
      inputRef.current.disabled = true;
      setTimeout(() => {
        inputRef.current.disabled = false;
        inputRef.current.focus();
      }, 0); //macOS 한국어 input초기화 시 버그가 있어서 넣은 코드입니다.
    }
    setInputValue('');
  };

  const handleBackspace = () => {
    if (inputValue.length < 1) return;
    if (totalCorrectKeyStrokes > 0)
      setTotalCorrectKeyStrokes((prev) => prev - 1);
  };

  const colorKeyboard = (key) => {
    const lastChar = language ? key.toUpperCase() : key[key.length - 1];
    if (!activeKeys.includes(lastChar)) {
      setActiveKeys((prev) => [...prev, lastChar]);
    }
    setTimeout(() => {
      setActiveKeys((prev) =>
        prev.filter((activeKey) => activeKey !== key && activeKey !== lastChar)
      );
    }, 300);
  };

  const initializeKeyboard = useCallback(() => {
    setInputValue('');
    currentIndex = 0;
    setTotalCorrectKeyStrokes(0);
    setTotalCursor(0);
    setTypingSpeed(0);
    prevTotalCorrectKeys = 0;
    setTotalAccuracy(100);
  }, [setTotalAccuracy, setTypingSpeed]);

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
              //한글 로직
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
            } //한글 로직 끝
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
  }, [inputValue, language, proposalIndex, sentence_total.sentence]);

  useEffect(() => {
    if (currentIndex >= sentence_total.sentence[proposalIndex].text.length)
      return;
    if (inputValue.length === 0) {
      setCurrentSentence(
        sentence_total.sentence[proposalIndex].text[currentIndex]
      );
      return;
    }
    setTotalCursor(getPrevLength() + inputValue.length - 1);
    setTotalAccuracy(
      ((totalCorrectKeyStrokes / (totalCursor + 1)) * 100).toFixed(0)
    );
    // console.log(totalCorrectKeyStrokes + ' ' + totalCursor);
    checkCurrentSentence(); //Input 검사 로직
  }, [
    sentence_total.sentence,
    getPrevLength,
    inputValue,
    checkCurrentSentence,
    proposalIndex,
    totalCorrectKeyStrokes,
    totalCursor,
    setTotalAccuracy,
  ]); //한글 영어 모두 적용됨.

  useEffect(() => {
    const newTypingSpeed = language
      ? ((totalCorrectKeyStrokes / (time + 1)) * 60).toFixed(0)
      : ((totalCorrectKeyStrokes / (time + 1)) * 60 * 1.5).toFixed(0);
    setTypingSpeed(newTypingSpeed);
  }, [time, totalCorrectKeyStrokes, language, setTypingSpeed]);

  useEffect(() => {
    setTotalCursor(getPrevLength());
    setCurrentSentence(
      sentence_total.sentence[proposalIndex].text[currentIndex]
    );
  }, [proposalIndex, sentence_total.sentence, getPrevLength]);

  useEffect(() => {
    if (time === 0) initializeKeyboard(); //time=0으로 초기화(게임 초기화)시 키보드 초기화되도록 함
  }, [time, initializeKeyboard]);
  useEffect(() => {
    title = sentence_total.sentence[proposalIndex].title;
  }, [proposalIndex, language, sentence_total.sentence]);
  return {
    inputValue,
    onChange,
    onKeyDown,
    currentSentence,
    initializeKeyboard,
    language,
    toggleLanguage,
    activeKeys,
    title,
  };
};

export default useVirtualKeyboard;
