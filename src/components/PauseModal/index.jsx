// import './index.css';

const PauseModal = ({ closeModal }) => {
  //closModal 시 stopTimer
  const handleClickModal = (e) => {
    e.stopPropagation();
  };
  return (
    <div className='modal_overlay' onClick={closeModal}>
      <div className='modal_wrapper' onClick={handleClickModal}>
        일시정지
      </div>
    </div>
  );
};
export default PauseModal;
