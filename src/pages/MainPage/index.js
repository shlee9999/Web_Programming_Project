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
          <div className="nav">
            <a href="#paragraph_1">About us</a>
            <a href="#paragraph_2">Proposal</a>
          </div>
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
            <div className="paragraph_title" id="paragraph_1">
              <p>About us</p>
            </div>
            <div className="paragraph_text"></div>
            <div className="paragraph_title" id="paragraph_2">
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
