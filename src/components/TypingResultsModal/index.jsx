import './index.css';

export const TypingResultsModal = ({
  closeTypingResultPopup,
  typingSpeed,
  totalAccuracy,
}) => {
  const handleClickModal = (e) => {
    e.stopPropagation();
  };
  return (
    <div className='modal_overlay' onClick={closeTypingResultPopup}>
      <div className='modal' onClick={handleClickModal}>
        <h1>Congratulation!</h1>
        <p> Your Typing Speed : {typingSpeed}</p>
        <p> Your Typing Accuracy : {totalAccuracy}%</p>
      </div>
    </div>
  );
};
