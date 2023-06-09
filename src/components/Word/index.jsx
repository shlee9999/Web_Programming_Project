import React, { useCallback, useEffect, useState } from 'react';
import './index.css';

const baseStyle = {
  width: '100px',
  margin: '0 10px',
};

const non_movingStyle = {
  ...baseStyle,
  opacity: 0,
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const Word = ({
  word,
  id,
  isChecked,
  timeLimit,
  interval,
  replaceCurrentWordList,
  LENGTH,
}) => {
  const [count, setCount] = useState(0);
  const [isFalling, setIsFalling] = useState(false);
  const [isTyped, setIsTyped] = useState(false);
  const [position, setPosition] = useState(0);

  const movingStyle = {
    ...baseStyle,
    transform: `translateY(${position}vh)`,
    backgroundColor: 'skyblue',
    opacity: position === 0 ? 0 : 1,
    transition: `opacity 0.5s, transform ${timeLimit}s linear`,
  };

  const startFalling = useCallback(async () => {
    try {
      await delay(interval * 1000);
      setIsFalling(true);
      setPosition(70);
    } catch (err) {
      console.error(err);
    }
  }, [interval]);

  const endFalling = useCallback(async () => {
    try {
      await delay(timeLimit * 1000);
      setIsFalling(false);
      setPosition(0); //다 떨어졌을때 올라감
    } catch (err) {
      console.error(err); //type 성공 (다 안떨어짐)
    }
  }, [timeLimit]);

  const checkFallingWords = useCallback(async () => {
    try {
      await startFalling();
      await endFalling();
      await delay(timeLimit * 1000);
      setCount((prev) => prev + 0.5); //왜 2번씩 증가?
      checkFallingWords();
    } catch (err) {
      console.error(err);
    }
  }, [position, timeLimit, endFalling, startFalling]);

  useEffect(() => {
    checkFallingWords();
  }, []);

  useEffect(() => {
    console.log('count = ' + count);
    delay(1000).then(() => {
      replaceCurrentWordList(word, LENGTH * count + id);
    });
  }, [count, LENGTH, id, replaceCurrentWordList, word]);

  useEffect(() => {
    if (isChecked && isFalling) {
      setIsTyped(true);
      delay(0).then(() => {
        throw new Error(word + ' 성공');
      });
    }
  }, [isChecked, word, isFalling]);

  useEffect(() => {
    if (isTyped) {
      setPosition(0);
      setIsTyped(false);
      setIsFalling(false);
    }
  }, [isTyped, replaceCurrentWordList, word]);

  return (
    <div className='word'>
      {isTyped ? (
        <div style={non_movingStyle}></div>
      ) : (
        <div style={movingStyle}>{word}</div>
      )}
    </div>
  );
};
