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

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT_VALUE':
      return { ...state, inputValue: action.inputValue };
    case 'CHANGE_CURRENT_SENTENCE':
      return { ...state, currentSentence: action.currentSentence };
    case 'ADD_ACTIVE_KEY':
      return { ...state, activeKeys: [...state.activeKeys, action.lastChar] };
    case 'POP_ACTIVE_KEY':
      return {
        ...state,
        activeKeys: state.activeKeys.filter(
          (activeKey) =>
            activeKey !== action.key && activeKey !== action.lastChar
        ),
      };
    case 'TOGGLE_LANGUAGE':
      return { ...state, language: !state.language };
    default:
      return;
  }
}

const initialState = {
  inputValue: '',
  currentSentence: sentence_korean.sentence[0].text[0],
  activeKeys: [],
  language: false, //Eng: true, Kor: false
};

const useVirtualKeyboard = ({ time, proposalIndex, endGame, inputRef }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentIndex, setCurrentIndex] = useState(0); //현재 문장이 몇 번째 문장인가?
  const [totalCorrectKeyStrokes, setTotalCorrectKeyStrokes] = useState(0);
  const [totalCursor, setTotalCursor] = useState(0);
  const [prevTotalCorrectKeys, setPrevTotalCorrectKeys] = useState(0);
  const [title, setTitle] = useState('');
  const [totalBackSpace, setTotalBackSpace] = useState(0);
  const [typingMode, setTypingMode] = useState(false); // word : true, sentence : false
  const { setTypingSpeed, setTotalAccuracy } = useContext(MyContext);
  const sentences = useMemo(() => {
    if (typingMode) {
      return state.language ? sentence_english.word : sentence_korean.word;
    } else {
      return state.language
        ? sentence_english.sentence
        : sentence_korean.sentence;
    }
  }, [state.language, typingMode]);
  const onChange = ({ target: { value } }) => {
    if (!value) {
      dispatch({ type: 'CHANGE_INPUT_VALUE', inputValue: '' });
      dispatch({
        type: 'CHANGE_CURRENT_SENTENCE',
        currentSentence: sentences[proposalIndex].text[currentIndex],
      });
      return;
    }
    const lastChar = value[value.length - 1];
    const key = state.language ? lastChar : hangul.disassemble(lastChar);
    if (
      !state.language &&
      hangul.disassemble(state.inputValue).length <
        hangul.disassemble(value).length
    ) {
      colorKeyboard(key);
    } else if (state.language && state.inputValue.length < value.length)
      colorKeyboard(key);
    dispatch({ type: 'CHANGE_INPUT_VALUE', inputValue: value });
  };

  const getPrevLength = useCallback(() => {
    return sentences[proposalIndex].text.reduce(
      (acc, sentence, index) =>
        index < currentIndex ? acc + sentence.length : acc,
      0
    );
  }, [currentIndex, proposalIndex, sentences]);

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
    if (state.inputValue.length < state.currentSentence.length - 5) return;
    if (currentIndex < sentences[proposalIndex].text.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setPrevTotalCorrectKeys(totalCorrectKeyStrokes);
      EnterSound.pause();
      EnterSound.currentTime = 0;
      EnterSound.play();
    } //다음 문장으로 넘어간다.

    if (currentIndex === sentences[proposalIndex].text.length - 1) {
      //마지막 문장에서 엔터를 쳤을 때
      EndSound.play();
      endGame();
    } else if (!state.language) {
      inputRef.current.disabled = true;
      setTimeout(() => {
        inputRef.current.disabled = false;
        inputRef.current.focus();
      }, 0); //macOS 한국어 input초기화 시 버그가 있어서 넣은 코드입니다.
    }
    dispatch({ type: 'CHANGE_INPUT_VALUE', inputValue: '' });
  };

  const handleBackspace = () => {
    if (state.inputValue.length < 1) return;
    setTotalBackSpace((prev) => prev + 1);
  };

  const colorKeyboard = (key) => {
    const lastChar = state.language ? key.toUpperCase() : key[key.length - 1];
    if (!state.activeKeys.includes(lastChar)) {
      dispatch({ type: 'ADD_ACTIVE_KEY', lastChar: lastChar });
    }
    setTimeout(() => {
      dispatch({ type: 'POP_ACTIVE_KEY', key: key, lastChar: lastChar });
    }, 300);
  };

  const initializeKeyboard = useCallback(() => {
    dispatch({ type: 'CHANGE_INPUT_VALUE', inputValue: '' });
    setCurrentIndex(0);
    setTotalCorrectKeyStrokes(0);
    setTotalCursor(0);
    setTypingSpeed(0);

    setPrevTotalCorrectKeys(0);
    setTotalAccuracy(100);
  }, [setTotalAccuracy, setTypingSpeed]);

  const toggleLanguage = () => {
    dispatch({ type: 'TOGGLE_LANGUAGE' });
  };

  const checkCurrentSentence = useCallback(() => {
    const splitInput = state.inputValue.split('');
    let correctKeys = 0;
    const newSentence = sentences[proposalIndex].text[currentIndex]
      .split('')
      .map((letter, index) => {
        if (index > state.inputValue.length - 1) return letter;
        if (index === state.inputValue.length - 1) {
          if (!state.language) {
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
      });
    dispatch({ type: 'CHANGE_CURRENT_SENTENCE', currentSentence: newSentence });
    setTotalCorrectKeyStrokes(prevTotalCorrectKeys + correctKeys);
  }, [
    currentIndex,
    state.inputValue,
    state.language,
    prevTotalCorrectKeys,
    proposalIndex,
    sentences,
  ]);
  const toggleMode = () => {
    setTypingMode(!typingMode);
  };
  useEffect(() => {
    if (state.inputValue.length === 0) return;
    setTotalCursor(getPrevLength() + state.inputValue.length - 1);
    if (totalCorrectKeyStrokes - totalBackSpace < 0) setTotalAccuracy(0);
    else
      setTotalAccuracy(
        (
          ((totalCorrectKeyStrokes - totalBackSpace) / (totalCursor + 1)) *
          100
        ).toFixed(0)
      );
    // console.log(totalCorrectKeyStrokes + ' ' + totalCursor);
    checkCurrentSentence(); //Input 검사 로직
  }, [
    totalBackSpace,
    state.inputValue,
    checkCurrentSentence,
    getPrevLength,
    totalCorrectKeyStrokes,
    totalCursor,
    setTotalAccuracy,
  ]); //한글 영어 모두 적용됨.

  useEffect(() => {
    const newTypingSpeed = state.language
      ? ((totalCorrectKeyStrokes / (time + 1)) * 60).toFixed(0)
      : ((totalCorrectKeyStrokes / (time + 1)) * 60 * 1.5).toFixed(0);
    setTypingSpeed(newTypingSpeed);
  }, [time, totalCorrectKeyStrokes, state.language, setTypingSpeed]);

  useEffect(() => {
    setTotalCursor(getPrevLength());
    dispatch({
      type: 'CHANGE_CURRENT_SENTENCE',
      currentSentence: sentences[proposalIndex].text[currentIndex],
    });
  }, [currentIndex, proposalIndex, sentences, getPrevLength]);

  useEffect(() => {
    if (time === 0) initializeKeyboard(); //time=0으로 초기화(게임 초기화)시 키보드 초기화되도록 함
  }, [time, initializeKeyboard]);
  useEffect(() => {
    setTitle(sentences[proposalIndex].title);
  }, [proposalIndex, state.language, sentences]);
  return {
    inputValue: state.inputValue,
    onChange,
    onKeyDown,
    language: state.language,
    activeKeys: state.activeKeys,
    currentSentence: state.currentSentence,
    initializeKeyboard,
    toggleLanguage,
    title,
    toggleMode,
    typingMode,
  };
};

export default useVirtualKeyboard;
