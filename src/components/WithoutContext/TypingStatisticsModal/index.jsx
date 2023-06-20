import { useState, useEffect } from 'react';
import './index.css';

export const TypingStatisticsModal = ({ closeTypingStatisticsPopup }) => {
  const [typingStatistics, setTypingStatistics] = useState([]);
  const [typingType, setTypingType] = useState('sentence');

  const handleClickModal = (e) => {
    e.stopPropagation();
  };

  const toWordMode = () => {
    setTypingType('word');
  };
  const toSentenceMode = () => {
    setTypingType('sentence');
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
  }, []);

  return (
    <div
      className='modal_overlay statistics'
      onClick={closeTypingStatisticsPopup}
    >
      <div className='modal' onClick={handleClickModal}>
        <div className='button_wrapper'>
          <button
            className={`select_mode_button select_item ${
              typingType === 'sentence' && 'button_active'
            }`}
            onClick={toSentenceMode}
          >
            긴 글
          </button>
          <button
            className={`select_mode_button select_item ${
              typingType === 'word' && 'button_active'
            }`}
            onClick={toWordMode}
          >
            단 어
          </button>
        </div>
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
                {typingType === 'sentence' &&
                  typingStatistics
                    .filter((item) => item[6] === false)
                    .map((data, index) => (
                      <tr key={index} className='table_row'>
                        {data.slice(0, 6).map((d, i) => (
                          <td>
                            {d}
                            {i === 3 ? '%' : ''}
                          </td>
                        ))}
                      </tr>
                    ))}
                {typingType === 'word' &&
                  typingStatistics
                    .filter((item) => item[6] === true)
                    .map((data, index) => (
                      <tr key={index} className='table_row'>
                        {data.slice(0, 6).map((d, i) => (
                          <td>
                            {d}
                            {i === 3 ? '%' : ''}
                          </td>
                        ))}
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
        <div className='modal_button_wrapper'>
          <button
            onClick={onClickClearButton}
            disabled={typingStatistics.length ? false : true}
            className={`modal_button ${
              typingStatistics.length ? '' : 'inactive'
            }`}
          >
            {' '}
            Reset
          </button>
          <button className='modal_button' onClick={closeTypingStatisticsPopup}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
