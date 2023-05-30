import { useState, useEffect } from 'react';
import './index.css';

export const TypingStatisticsModal = ({ closeTypingStatisticsPopup }) => {
  const [typingStatistics, setTypingStatistics] = useState([]);
  const handleClickModal = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const localStorageData = localStorage.getItem('TypingStatistics');
    if (localStorageData) {
      setTypingStatistics(JSON.parse(localStorageData));
    }
  }, []);
  return (
    <div className='modal_overlay' onClick={closeTypingStatisticsPopup}>
      <div className='modal' onClick={handleClickModal}>
        <table className='statistics_table'>
          <thead>
            <tr>
              <th>닉네임</th>
              <th>타자 속도</th>
              <th>정확도</th>
              <th>진행 시간</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {typingStatistics.map((data, index) => (
              <tr key={index}>
                <td>{data[0]}</td>
                <td>{data[1]}</td>
                <td>{data[2]}</td>
                <td>{data[3]}</td>
                <td>{data[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
