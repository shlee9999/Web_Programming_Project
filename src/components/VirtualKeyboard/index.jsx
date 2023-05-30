import { useState } from 'react';
import useVirtualKeyboard from 'hooks/useVirtualKeyboard';
import './index.css';
import SelectCategoryModal from '../SelectCategoryModal';
import { keyRowsKorean, keyRowsEnglish } from 'constants/keyRows';
import { getFormattedDate } from 'components/utils/helper';
const VirtualKeyboard = ({
  userName,
  showTypingResultPopup,
  time,
  startTyping,
  stopTyping,

  inputRef,
}) => {
  const [proposalIndex, setProposalIndex] = useState(0); ////현재 제시문이 몇 번째 제시문인가?
  const [isGameReady, setIsGameReady] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);

  const selectCategory = (index) => {
    setProposalIndex(index);
  };

  const currentDate = getFormattedDate();

  const getFormattedTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  const onClickStart = () => {
    setIsSelectModalOpen(true);
  };

  const closeSelectModal = () => {
    if (!isSelectModalOpen) return;
    setIsSelectModalOpen(false);
  };

  const startGame = () => {
    closeSelectModal();
    initializeKeyboard();
    setIsGameReady(true);
    inputRef.current.disabled = false;
    inputRef.current.focus();
    startTyping();
  };

  const addToLocalStorage = (data) => {
    const existingData = localStorage.getItem('TypingStatistics');
    let newData = [];

    if (existingData) {
      newData = JSON.parse(existingData);
    }

    newData = [...newData, data];

    localStorage.setItem('TypingStatistics', JSON.stringify(newData));
  };

  const endGame = () => {
    inputRef.current.disabled = true;
    stopTyping();
    setIsGameReady(false);
    showTypingResultPopup();
    const localStorageDataList = [
      userName,
      title,
      typingSpeed,
      totalAccuracy,
      getFormattedTime(),
      currentDate,
    ];

    addToLocalStorage(localStorageDataList);
  };

  const {
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
    title,
  } = useVirtualKeyboard({ time, proposalIndex, endGame, inputRef });

  const keyRows = language ? keyRowsEnglish : keyRowsKorean;

  return (
    <div className='virtual_keyboard'>
      <div className='keyboard_wrapper'>
        <div>
          <br /> 진행 시간 : {getFormattedTime()}
        </div>

        <div className='proposal'>
          {isGameReady ? (
            <p className='current_sentence'>{currentSentence}</p>
          ) : (
            <button onClick={onClickStart} id='start_typing_button'>
              Start Typing!
            </button>
          )}
        </div>

        <input
          className='keyboard_input'
          onKeyDown={onKeyDown}
          onChange={onChange} //korean
          type='text'
          value={inputValue}
          placeholder={isGameReady ? '' : 'Please Press Start Typing Button.'}
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
      {isSelectModalOpen && (
        <SelectCategoryModal
          closeModal={closeSelectModal}
          // isTyping={isTyping}
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
