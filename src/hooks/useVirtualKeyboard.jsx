import hangul from 'hangul-js';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
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

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ACTIVE_KEYS':
      return { ...state, activeKeys: [...state.activeKeys, action.lastChar] };
    case 'POP_ACTIVE_KEYS':
      return {
        ...state,
        activeKeys: state.activeKeys.filter(
          (activeKey) =>
            activeKey !== action.key && activeKey !== action.lastChar
        ),
      };
    case 'CHANGE_INPUT_VALUE':
      return { ...state, inputValue: action.inputValue };
    case 'CHANGE_TOTAL_CORRECT_KEYSTROKES':
      return {
        ...state,
        totalCorrectKeyStrokes: action.totalCorrectKeyStrokes,
      };
    case 'CHANGE_TOTAL_CURSOR': //+1?
      return { ...state, totalCursor: action.totalCursor };
    case 'CHANGE_TOTAL_BACKSPACE':
      return;
    case '':
      return;
    default:
      throw new Error();
  }
}

const initialState = {
  activeKeys: [],
  inputValue: '',
  totalCorrectKeyStrokes: 0,
  totalCursor: 0,
  totalBackSpace: 0,
};
const useVirtualKeyboard = ({ time, proposalIndex, endGame, inputRef }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [typingMode, setTypingMode] = useState(false); // word : true, sentence : false
  const [language, setLanguage] = useState(false); //Eng: true, Kor: false

  const sentences = useMemo(() => {
    if (typingMode) {
      return language ? sentence_english.word : sentence_korean.word;
    } else {
      return language ? sentence_english.sentence : sentence_korean.sentence;
    }
  }, [language, typingMode]);

  const [currentSentence, setCurrentSentence] = useState(
    sentences[proposalIndex].text[currentIndex] //현재 문장
  );

  // const [totalCursor, setTotalCursor] = useState(0);
  const [totalBackSpace, setTotalBackSpace] = useState(0);

  const { setTypingSpeed, setTotalAccuracy } = useContext(MyContext);
  const onChange = ({ target: { value } }) => {
    if (!value) {
      dispatch({ type: 'CHANGE_INPUT_VALUE', inputValue: '' });
      setCurrentSentence(sentences[proposalIndex].text[currentIndex]);
      return;
    }
    const lastChar = value[value.length - 1];
    const key = language ? lastChar : hangul.disassemble(lastChar);
    if (
      !language &&
      hangul.disassemble(state.inputValue).length <
        hangul.disassemble(value).length
    ) {
      colorKeyboard(key);
    } else if (language && state.inputValue.length < value.length)
      colorKeyboard(key);
    dispatch({ type: 'CHANGE_INPUT_VALUE', inputValue: value });
  };
  const getPrevLength = useCallback(() => {
    return sentences[proposalIndex].text.reduce(
      (acc, sentence, index) =>
        index < currentIndex ? acc + sentence.length : acc,
      0
    );
  }, [proposalIndex, sentences]);

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
    if (state.inputValue.length < currentSentence.length - 5) return;
    if (currentIndex < sentences[proposalIndex].text.length) {
      currentIndex++;
      prevTotalCorrectKeys = state.totalCorrectKeyStrokes;
    } //다음 문장으로 넘어간다.
    if (currentIndex !== sentences[proposalIndex].text.length) {
      //마지막 문장이 아닌 곳에서 엔터를 쳤을 때
      EnterSound.play();
      if (!language) {
        inputRef.current.disabled = true;
        setTimeout(() => {
          inputRef.current.disabled = false;
          inputRef.current.focus();
        }, 0); //macOS 한국어 input초기화 시 버그가 있어서 넣은 코드입니다.
      }
    } else {
      //마지막 문장에서 엔터를 쳤을 때
      EndSound.play();
      endGame();
    }

    dispatch({ type: 'CLEAR_INPUT_VALUE' });
  };

  const handleBackspace = () => {
    if (state.inputValue.length < 1) return;
    setTotalBackSpace((prev) => prev + 1);
  };

  const colorKeyboard = (key) => {
    const lastChar = language ? key.toUpperCase() : key[key.length - 1];
    if (!state.activeKeys.includes(lastChar))
      dispatch({ type: 'ADD_ACTIVE_KEYS', lastChar: lastChar });
    setTimeout(() => {
      // setActiveKeys((prev) =>
      //   prev.filter((activeKey) => activeKey !== key && activeKey !== lastChar)
      // );
      dispatch({ type: 'POP_ACTIVE_KEYS', key: key, lastChar: lastChar });
    }, 300);
  };

  const initializeKeyboard = useCallback(() => {
    setTotalBackSpace(0);
    dispatch({ type: 'CLEAR_INPUT_VALUE' });
    currentIndex = 0;
    dispatch({
      type: 'CHANGE_TOTAL_CORRECT_KEYSTROKES',
      totalCorrectKeyStrokes: 0,
    });

    dispatch({ type: 'CHANGE_TOTAL_CURSOR', totalCursor: 0 });
    setTypingSpeed(0);
    prevTotalCorrectKeys = 0;
    setTotalAccuracy(100);
  }, [setTotalAccuracy, setTypingSpeed]);

  const toggleLanguage = () => {
    setLanguage(!language);
  };

  const toggleMode = () => {
    setTypingMode(!typingMode);
  };

  const checkCurrentSentence = useCallback(() => {
    const splitInput = state.inputValue.split('');
    let correctKeys = 0;
    setCurrentSentence(
      sentences[proposalIndex].text[currentIndex]
        .split('')
        .map((letter, index) => {
          if (index > state.inputValue.length - 1) return letter;
          if (index === state.inputValue.length - 1) {
            if (!language) {
              //한글 로직
              const disassembledLetter = hangul.disassemble(letter);
              const disassembledLastChar = hangul.disassemble(
                state.inputValue[state.inputValue.length - 1]
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

    dispatch({
      type: 'CHANGE_TOTAL_CORRECT_KEYSTROKES',
      totalCorrectKeyStrokes: prevTotalCorrectKeys + correctKeys,
    });
  }, [state.inputValue, language, proposalIndex, sentences]);

  useEffect(() => {
    if (currentIndex >= sentences[proposalIndex].text.length) return;
    if (state.inputValue.length === 0) {
      setCurrentSentence(sentences[proposalIndex].text[currentIndex]);
      return;
    }

    dispatch({
      type: 'CHANGE_TOTAL_CURSOR',
      totalCursor: getPrevLength() + state.inputValue.length - 1,
    });
    if (state.totalCorrectKeyStrokes - totalBackSpace < 0) setTotalAccuracy(0);
    else
      setTotalAccuracy(
        (
          ((state.totalCorrectKeyStrokes - totalBackSpace) /
            (state.totalCursor + 1)) *
          100
        ).toFixed(0)
      );
    checkCurrentSentence(); //Input 검사 로직
  }, [
    totalBackSpace,
    sentences,
    getPrevLength,
    state.inputValue,
    checkCurrentSentence,
    proposalIndex,
    state.totalCorrectKeyStrokes,
    state.totalCursor,
    setTotalAccuracy,
  ]); //한글 영어 모두 적용됨.

  useEffect(() => {
    const newTypingSpeed = language
      ? ((state.totalCorrectKeyStrokes / (time + 1)) * 60).toFixed(0)
      : ((state.totalCorrectKeyStrokes / (time + 1)) * 60 * 1.5).toFixed(0);
    setTypingSpeed(newTypingSpeed);
  }, [time, state.totalCorrectKeyStrokes, language, setTypingSpeed]);

  useEffect(() => {
    // setTotalCursor(getPrevLength());
    dispatch({ type: 'CHANGE_TOTAL_CURSOR', totalCursor: getPrevLength() });
    setCurrentSentence(sentences[proposalIndex].text[currentIndex]);
  }, [proposalIndex, sentences, getPrevLength]);

  useEffect(() => {
    if (time === 0) initializeKeyboard(); //time=0으로 초기화(게임 초기화)시 키보드 초기화되도록 함
  }, [time, initializeKeyboard]);
  useEffect(() => {
    title = sentences[proposalIndex].title;
  }, [proposalIndex, language, sentences]);
  return {
    onChange,
    onKeyDown,
    currentSentence,
    initializeKeyboard,
    language,
    toggleLanguage,
    toggleMode,
    title,
    typingMode,
    state,
  };
};

export default useVirtualKeyboard;
