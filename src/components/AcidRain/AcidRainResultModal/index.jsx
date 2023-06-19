import './index.css';

const AcidRainResultModal = ({ closeModal, score }) => {
  const handleClickModal = (e) => {
    e.stopPropagation();
  };
  return (
    <div className='modal_overlay' onClick={closeModal}>
      <div className='modal' onClick={handleClickModal}>
        <h2>Correct Words : {score}</h2>
      </div>
    </div>
  );
};
export default AcidRainResultModal;
