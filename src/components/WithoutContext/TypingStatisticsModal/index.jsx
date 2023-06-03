import { useState, useEffect } from 'react';
import './index.css';

export const TypingStatisticsModal = ({ closeTypingStatisticsPopup }) => {
  const [typingStatistics, setTypingStatistics] = useState([]);
  const handleClickModal = (e) => {
    e.stopPropagation();
  };

  const onClickClearButton = () => {
    if (typingStatistics.length === 0) {
      window.alert('초기화할 데이터가 없습니다');
    }
    const result = window.confirm('정말 통계 데이터를 초기화하시겠습니까?');
    if (result) {
      localStorage.removeItem('TypingStatistics');
      setTypingStatistics([]);
    }
  };

  const localStorageData = localStorage.getItem('TypingStatistics');
  useEffect(() => {
    if (localStorageData) {
      setTypingStatistics(JSON.parse(localStorageData));
    }
  }, [localStorageData]);

  useEffect(() => {
    localStorage.setItem('TypingStatistics', JSON.stringify(typingStatistics));
  }, [typingStatistics]);

  return (
    <div
      className='modal_overlay statistics'
      onClick={closeTypingStatisticsPopup}
    >
      <div className='modal' onClick={handleClickModal}>
        <div className='statistics_wrapper'>
          {typingStatistics.length ? (
            <table className='statistics_table'>
              <thead>
                <tr>
                  <th>닉네임</th>
                  <th>제목</th>
                  <th>타자 속도</th>
                  <th>정확도</th>
                  <th>진행 시간</th>
                  <th>날짜</th>
                </tr>
              </thead>
              <tbody>
                {typingStatistics.map((data, index) => (
                  <tr key={index} className='table_row'>
                    <td>{data[0]}</td>
                    <td>{data[1]}</td>
                    <td>{data[2]}</td>
                    <td>{data[3]}%</td>
                    <td>{data[4]}</td>
                    <td>{data[5]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className='text_wrapper'>
              <p> 통계 기록이 없습니다. </p>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={onClickClearButton}
            disabled={typingStatistics.length ? '' : 'true'}
            className={typingStatistics.length ? '' : 'inactive'}
          >
            {' '}
            초기화
          </button>
        </div>
      </div>
    </div>
  );
};
