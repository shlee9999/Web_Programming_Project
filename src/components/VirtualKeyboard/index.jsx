import { useRef, useState } from 'react';
import useVirtualKeyboard from '../../hooks/useVirtualKeyboard';
import './index.css';
import SelectCategoryModal from '../SelectCategoryModal';
import { keyRowsKorean, keyRowsEnglish } from '../../constants/keyRows';
const VirtualKeyboard = ({ time, startTimer }) => {
  const [proposalIndex, setProposalIndex] = useState(0); ////현재 제시문이 몇 번째 제시문인가?
  const [isGameReady, setIsGameReady] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const inputRef = useRef(null);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const selectCategory = (index) => {
    // setSentenceCategory(item.title);
    setProposalIndex(index);
  };
  const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
  }${seconds}`;
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
  } = useVirtualKeyboard({ time, proposalIndex });
  const keyRows = language ? keyRowsEnglish : keyRowsKorean;
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
    startTimer();
  };

  return (
    <div className='virtual_keyboard'>
      <div className='keyboard_wrapper'>
        <div>
          <br /> 진행 시간 : {formattedTime}
        </div>
        <div>타수 : {typingSpeed}</div>
        <div>정확도 : {totalAccuracy}</div>
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
          {/* {keyRows.map((row, rowIndex) => ( 
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
          ))} */}
          키보드
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
