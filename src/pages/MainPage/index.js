import { useNavigate } from "react-router-dom";
import "./index.css";
import React from "react";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="container">
        <header>
          <img
            src={process.env.PUBLIC_URL + "images/header_logo.png"}
            className="header_logo"
          />
          <p className="nav">nav</p>
        </header>
        <section>
          <div className="center_container">
            <img
              src={process.env.PUBLIC_URL + "images/logo.png"}
              className="logo"
            />
            <button
              className="start_button"
              onClick={() => {
                navigate("/Typing/");
              }}
            >
              Begin Your Typing Practice
            </button>
          </div>
          <div className="paragraph_container">
            <div className="paragraph_title">
              <p>About us</p>
            </div>
            <div className="paragraph_text"></div>
            <div className="paragraph_title">
              <p>Proposal</p>
            </div>
            <div className="paragraph_text"></div>
          </div>
        </section>
        <footer></footer>
      </div>
    </div>
  );
}

export default App;
