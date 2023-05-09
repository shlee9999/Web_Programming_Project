import React, { useEffect, useRef, useState } from "react";
import Hangul from "hangul-js";
import "./index.css";
const VirtualKeyboard = () => {
  const inputRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState(true); //true = Eng
  const [inputValue, setInputValue] = useState("");
  const [activeKeys, setActiveKeys] = useState([]);
  const [proposalIndex, setProposalIndex] = useState(0);
  const handleClickStart = () => {
    setIsTyping(true);
    setInputValue("");
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const handleKeyPress = (event) => {
    const key = event.nativeEvent.key;
    if (!key) return;
    if (event.keyCode === 91 || key === "CapsLock") {
      toggleLanguage();
    }
    if (key === "Enter" && inputValue === proposals[proposalIndex]) {
      if (proposalIndex === proposals.length - 1) {
        setIsTyping(false);
        setProposalIndex(0);
        setInputValue("");
        inputRef.current.disabled = true;
        return;
      }
      setProposalIndex((prev) => prev + 1);
      setInputValue("");
    }
    if (key === "Backspace") {
      setInputValue(inputValue.slice(0, -1));
      return;
    }
    if (key.length === 1) {
      if (language) setInputValue(inputValue + key);
      else {
        const disassembled = Hangul.disassemble(inputValue);
        const temp = Hangul.assemble([...disassembled, key]);
        setInputValue(temp);
      }
      setActiveKeys((prev) => [...prev, key.toUpperCase()]);
      setTimeout(() => {
        setActiveKeys((prev) => {
          prev.pop();
          return prev;
        });
      }, 500);
    }
  };
  const toggleLanguage = () => {
    setLanguage(!language);
    console.log(language);
  };

  const keyRowsEnglish = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  const keyRowsKorean = [
    "ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔ",
    "ㅁㄴㅇㄹ호ㅓㅏㅣ",
    "ㅋㅌㅊㅍㅠㅜㅡ",
  ];

  const keyRows = language === true ? keyRowsEnglish : keyRowsKorean;
  const proposals = ["안녕하세요", "한글 입력 테스트"];
  return (
    <div>
      <div className="keyboard_wrapper">
        <div className="proposal">
          {isTyping ? (
            proposals[proposalIndex]
          ) : (
            <button onClick={handleClickStart} id="start_typing_button">
              StartTyping!
            </button>
          )}
        </div>
        <input
          className="keyboard_input"
          type="text"
          value={inputValue}
          onKeyDown={handleKeyPress}
          onChange={handleKeyPress}
          placeholder={isTyping ? "" : " Please Press Start Typing Button."}
          disabled
          ref={inputRef}
        />
        {keyRows.map((row, rowIndex) => (
          <div key={rowIndex} className="row_keys_wrapper">
            {row.split("").map((key, index) => (
              <button
                key={index}
                className={`keyboard ${
                  activeKeys.includes(key.toUpperCase()) ? "active" : ""
                }`}
                id={key}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
  return;
};

export default VirtualKeyboard;
