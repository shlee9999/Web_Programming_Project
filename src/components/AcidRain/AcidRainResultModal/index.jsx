import './index.css';

const AcidRainResultModal = ({ closeModal, score, openStatisticsModal }) => {
  const handleClickModal = (e) => {
    e.stopPropagation();
  };
  return (
    <div className='modal_overlay' onClick={closeModal}>
      <div className='result_modal' onClick={handleClickModal}>
        <h2>Correct Words : {score}</h2>
      </div>
    </div>
  );
};
export default AcidRainResultModal;
