import { useState, useEffect } from 'react';
import './index.css';

export const AcidRainStatisticsModal = ({ closeModal }) => {
  const [acidRainStatistics, setAcidRainStatistics] = useState(
    JSON.parse(localStorage.getItem('AcidRainStatistics')) ?? []
  );
  const handleClickModal = (e) => {
    e.stopPropagation();
  };
  useEffect(() => {
    console.log(acidRainStatistics);
  }, [acidRainStatistics]);

  const onClickClearButton = () => {
    if (acidRainStatistics.length === 0) {
      window.alert('초기화할 데이터가 없습니다');
    }
    const result = window.confirm(
      '정말 산성비 통계 데이터를 초기화하시겠습니까?'
    );
    if (result) {
      localStorage.removeItem('AcidRainStatistics');
      setAcidRainStatistics([]);
    }
  };

  return (
    <div className='modal_overlay' onClick={closeModal}>
      <div className='modal' onClick={handleClickModal}>
        <div className='statistics_wrapper'>
          {acidRainStatistics.length ? (
            <table className='statistics_table'>
              <caption className='acid_rain_statistics_title'>산성비</caption>
              <thead>
                <tr>
                  <th>닉네임</th>
                  <th>맞춘 개수</th>
                  <th>날짜</th>
                  <th>레벨</th>
                </tr>
              </thead>
              <tbody>
                {acidRainStatistics.map((data, index) => (
                  <tr key={index} className='table_row'>
                    <td>{data.userName}</td>
                    <td>{data.score}</td>
                    <td>{data.date}</td>
                    <td>{data.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className='text_wrapper'>
              <p> 산성비 통계 기록이 없습니다. </p>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={onClickClearButton}
            disabled={acidRainStatistics.length ? false : true}
            className={acidRainStatistics.length ? '' : 'inactive'}
          >
            {' '}
            초기화
          </button>
        </div>
      </div>
    </div>
  );
};
