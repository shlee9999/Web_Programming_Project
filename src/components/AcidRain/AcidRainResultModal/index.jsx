import './index.css';

const AcidRainResultModal = ({ closeModal, score, openStatisticsModal }) => {
  const handleClickModal = (e) => {
    e.stopPropagation();
  };
  return (
    <div className='modal_overlay' onClick={closeModal}>
      <div className='result_modal' onClick={handleClickModal}>
        <h2>Correct Words : {score}</h2>
        <button
          className='acid_statistics_button'
          onClick={openStatisticsModal}
        >
          My Statistics
        </button>
      </div>
    </div>
  );
};
export default AcidRainResultModal;
