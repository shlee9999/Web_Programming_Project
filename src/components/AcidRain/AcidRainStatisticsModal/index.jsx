import { useState } from 'react';
import './index.css';

export const AcidRainStatisticsModal = ({ closeModal }) => {
  const [acidRainStatistics, setAcidRainStatistics] = useState(
    JSON.parse(localStorage.getItem('AcidRainStatistics')) ?? []
  );
  const handleClickModal = (e) => {
    e.stopPropagation();
  };

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
      <div className='acid_rain_statistics_modal' onClick={handleClickModal}>
        <div className='acid_rain_statistics_title'>소나기</div>
        <div className='acid_rain_statistics_wrapper'>
          <table className='acid_rain_statistics_table_header'>
            <thead>
              <tr>
                <th>닉네임</th>
                <th>맞춘 개수</th>
                <th>날짜</th>
                <th>레벨</th>
              </tr>
            </thead>
          </table>
          <table className='acid_rain_statistics_table'>
            {acidRainStatistics.length ? (
              <tbody>
                {acidRainStatistics.map((data, index) => (
                  <tr key={index} className='acid_rain_table_row'>
                    <td>{data.userName}</td>
                    <td>{data.score}</td>
                    <td>{data.date}</td>
                    <td>{data.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className='acid_rain_text_wrapper'>
              <p> 소나기 통계 기록이 없습니다. </p>
            </div>
          )}
        </div>
        <div className='modal_button_wrapper'>
          <button
            onClick={onClickClearButton}
            disabled={acidRainStatistics.length ? false : true}
            className={`modal_button ${
              acidRainStatistics.length ? '' : 'inactive'
            }`}
          >
            {' '}
            Reset
          </button>
          <button className='modal_button' onClick={closeModal}>
            Close
          </button>
        </div>
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
  );
};
