import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { Word } from 'components/Word';

const acidRainWords = ['사과', '바나나', '딸기', '수박', '포도'];
function shuffleArray() {
  //순서 섞기 위한 배열
  let arr = Array.from({ length: acidRainWords.length }, (_, i) => i); // 0부터 10까지의 배열 생성
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 0부터 i까지 랜덤 인덱스 생성
    [arr[i], arr[j]] = [arr[j], arr[i]]; // 해당 인덱스와 랜덤 인덱스의 요소 교환
  }
  return arr;
}

let shuffledIndexes = shuffleArray(); //다음 게임 시 초기화

export const AcidRainModal = () => {
  const [checkedWords, setCheckedWords] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const onKeyDown = ({ key }) => {
    switch (key) {
      case 'Enter':
        handleEnter();
        return;
      default:
        break;
    }
  };
  const handleEnter = () => {
    if (!inputRef.current) return;
    acidRainWords.forEach((word, index) => {
      if (word === inputValue) {
        setCheckedWords((prev) => [...prev, index]);
        console.log(index);
      }
    });
    inputRef.current.disabled = true;
    setTimeout(() => {
      inputRef.current.disabled = false;
      inputRef.current.focus();
    }, 0);
    setInputValue('');
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className='modal_overlay'>
      <div className='acid_rain_modal'>
        <div className='limit'>
          <br />
          경계선 - 구현 완료 후 아래로 내리면 글씨 안보임
        </div>
        {acidRainWords.map((item, index) => (
          <Word
            key={index}
            item={item}
            order={shuffledIndexes[index]}
            inputValue={inputValue}
            isChecked={checkedWords.includes(index)}
          />
        ))}
        <input
          className='acid_rain_input'
          value={inputValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          ref={inputRef}
        />
      </div>
    </div>
  );
};
