import './index.css';

export const TypingResultsContainer = ({ typingSpeed, typingAccuracy }) => {
  return (
    <div className='typingResult_Wrapper'>
      <div className='TypingSpeed result_container'>
        <p className='result_title'>Your Typing Speed</p>
        <p className='result_value'>{typingSpeed}</p>
      </div>
      <div className='TypingAccuracy result_container'>
        <p className='result_title'>Your Typing Accuracy</p>
        <p className='result_value'>{typingAccuracy}</p>
      </div>
    </div>
  );
};
