import './index.css';

const PauseModal = ({ closeModal }) => {
  const handleClickModal = (e) => {
    e.stopPropagation();
  };
  return (
    <div className='modal_overlay' onClick={closeModal}>
      <div className='pause_modal' onClick={handleClickModal}>
        <h2>Pause</h2>
        <button className='restart_button' onClick={closeModal}>
          Restart
        </button>
      </div>
    </div>
  );
};
export default PauseModal;
