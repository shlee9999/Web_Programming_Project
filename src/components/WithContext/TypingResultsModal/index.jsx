import { useContext } from 'react';
import { MyContext } from 'pages/TypingPage/MainSection';
import './index.css';

export const TypingResultsModal = ({ closeTypingResultPopup }) => {
  const { typingSpeed, totalAccuracy } = useContext(MyContext);
  const handleClickModal = (e) => {
    e.stopPropagation();
  };
  return (
    <div className='modal_overlay' onClick={closeTypingResultPopup}>
      <div className='result_modal' onClick={handleClickModal}>
        <h1>Congratulation!</h1>
        <p> Your Typing Speed : {typingSpeed}</p>
        <p> Your Typing Accuracy : {totalAccuracy}%</p>
        <button
          className='typing_result_close_button'
          onClick={closeTypingResultPopup}
        >
          close
        </button>
      </div>
    </div>
  );
};
