import React, { useEffect, useState } from 'react';
import './index.css';

export const Word = ({ item, order, isChecked }) => {
  const [isAlive, setIsAlive] = useState(false);
  const [isTyped, setIsTyped] = useState(false);
  const [position, setPosition] = useState(0);
  const interval = 1000;
  const limit = 10; //떨어지는 데 걸리는 시간(초기 버튼 클릭으로 받아올듯)

  useEffect(() => {
    setTimeout(() => {
      setIsAlive(true);
      setPosition(70); //렌더링되면서 이동 시작!
      setTimeout(() => {
        setIsAlive(false);
      }, limit * 1000); //도착 후엔 더이상입력불가능
    }, order * interval); //index 순서대로 1초 간격으로 떨어짐
  }, [order]);

  const movingStyle = {
    transform: `translateY(${position}vh)`,
    transition: `transform ${limit}s linear`,
    backgroundColor: 'skyblue',
    width: '100px',
    margin: '0 10px',
  };
  const non_movingStyle = {
    width: '100px',
    margin: '0 10px',
  };
  useEffect(() => {
    if (isTyped) {
      setPosition(0);
    }
  }, [isTyped]);

  useEffect(() => {
    if (isChecked && isAlive) setIsTyped(true);
  }, [isChecked, isAlive]);

  return (
    <div className='word'>
      {isTyped ? (
        <div style={non_movingStyle}></div>
      ) : (
        <div style={movingStyle}>{item}</div>
      )}
    </div>
  );
};
