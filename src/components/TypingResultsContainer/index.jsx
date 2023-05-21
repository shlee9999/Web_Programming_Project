import './index.css';

export const TypingResultsContainer = ({ typingSpeed, typingAccuracy }) => {
  return (
    <div className='typingResult_Wrapper'>
      <div className='result_container'>
        <p className='result_title'>Typing Speed</p>
        <p className='result_value'>{typingSpeed}</p>
      </div>
      <div className='result_container'>
        <p className='result_title'>Typing Accuracy</p>
        <p className='result_value'>{typingAccuracy}%</p>
      </div>
    </div>
  );
};
