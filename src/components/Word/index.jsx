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

// Helper function to create a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const Word = ({
  word,
  isChecked,
  timeLimit,
  interval,
  replaceCurrentWordList,
}) => {
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
    } catch (err) {
      console.error(err);
    }
  }, [timeLimit]);

  const checkFallingWords = useCallback(async () => {
    try {
      await startFalling();
      await endFalling();
      if (position === 0) {
        await delay(timeLimit * 1000);
        checkFallingWords();
      }
    } catch (err) {
      console.error(err);
    }
  }, [position, timeLimit, endFalling, startFalling]);

  useEffect(() => {
    checkFallingWords();
  }, []);

  useEffect(() => {
    if (isTyped) {
      setPosition(0);
      setIsTyped(false);
      setIsFalling(false);
      delay(1000).then(() => {
        replaceCurrentWordList(word);
      });
    }
  }, [isTyped, replaceCurrentWordList, word]);

  useEffect(() => {
    if (isChecked && isFalling) {
      setIsTyped(true);
      delay(0).then(() => {
        throw new Error(word + ' 성공');
      });
    }
  }, [isChecked, word, isFalling]);

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
