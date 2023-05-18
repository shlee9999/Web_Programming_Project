import './index.css';

const PauseModal = ({ closeModal }) => {
  const handleClickModal = (e) => {
    e.stopPropagation();
  };

  return (
    <div className='modal_overlay' onClick={closeModal}>
      <div className='modal' onClick={handleClickModal}>
        <h2>일시정지</h2>
      </div>
    </div>
  );
};
export default PauseModal;
