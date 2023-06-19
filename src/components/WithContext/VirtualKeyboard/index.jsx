import { useState } from 'react';
import useVirtualKeyboard from 'hooks/useVirtualKeyboard';
import './index.css';
import SelectCategoryModal from 'components/WithoutContext/SelectCategoryModal';
import { keyRowsKorean, keyRowsEnglish } from 'constants/keyRows';
import { getFormattedDate, getFormattedTime } from 'utils/helper';
import { useContext } from 'react';
import { MyContext } from 'pages/TypingPage/MainSection';
import { AcidRainModal } from 'components/AcidRain/AcidRainModal';
const VirtualKeyboard = ({
  userName,
  showTypingResultPopup,
  time,
  startTyping,
  stopTyping,
  inputRef,
}) => {
  const [isAcidRainOpen, setIsAcidRainOpen] = useState(false);
  const [proposalIndex, setProposalIndex] = useState(0); ////현재 제시문이 몇 번째 제시문인가?
  const [isGameReady, setIsGameReady] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const { typingSpeed, totalAccuracy } = useContext(MyContext);
  const selectCategory = (index) => {
    setProposalIndex(index);
  };
  const currentDate = getFormattedDate();
  const formattedTime = getFormattedTime(time);
  const closeAcidRainModal = () => {
    setIsAcidRainOpen(false);
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
    setTimeout(() => {
      //이렇게 안하면 focus 안됨
      inputRef.current.focus();
    }, 0);

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
    setIsGameReady(false);
    stopTyping();
    showTypingResultPopup();
    const localStorageDataList = [
      userName,
      title,
      typingSpeed,
      totalAccuracy,
      formattedTime,
      currentDate,
    ];
    addToLocalStorage(localStorageDataList);
    inputRef.current.disabled = true;
    return;
  };

  const {
    inputValue,
    onChange,
    onKeyDown,
    currentSentence,
    initializeKeyboard,
    language,
    toggleLanguage,
    toggleMode,
    activeKeys,
    title,
    typingMode,
  } = useVirtualKeyboard({ time, proposalIndex, endGame, inputRef });

  const keyRows = language ? keyRowsEnglish : keyRowsKorean;

  return (
    <div className='virtual_keyboard'>
      <div className='keyboard_wrapper'>
        <button
          onClick={() => {
            setIsAcidRainOpen(true);
          }}
        >
          산 성 비
        </button>
        <div>
          <br /> 진행 시간 : {formattedTime}
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
          selectCategory={selectCategory}
          startGame={startGame}
          language={language}
          toggleLanguage={toggleLanguage}
          toggleMode={toggleMode}
          typingMode={typingMode}
        />
      )}
      {isAcidRainOpen && (
        <AcidRainModal
          closeAcidRainModal={closeAcidRainModal}
          userName={userName}
        />
      )}
    </div>
  );
};

export default VirtualKeyboard;
