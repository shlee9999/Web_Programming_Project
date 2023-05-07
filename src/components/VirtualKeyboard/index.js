import React, { useRef, useState } from "react";

const VirtualKeyboard = () => {
  const inputRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("English");
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
      setInputValue(inputValue + key);
      setActiveKeys((prev) => [...prev, key.toUpperCase()]);
      setTimeout(() => {
        setActiveKeys((prev) => {
          prev.pop();
          return prev;
        });
      }, 500);
    }
  };

  const keyRowsEnglish = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  const keyRowsKorean = [
    "ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔ",
    "ㅁㄴㅇㄹ호ㅓㅏㅣ",
    "ㅋㅌㅊㅍㅠㅜㅡ",
  ];

  const keyRows = language === "English" ? keyRowsEnglish : keyRowsKorean;
  const proposals = ["Hello, this is SeongHoon.", "Nice to meet you"];
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
          placeholder={!isTyping && " Please Press Start Typing Button."}
          disabled
          ref={inputRef}
          // onKeyUp={handleKeyUp}
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
