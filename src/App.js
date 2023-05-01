import "./App.css";
import React from "react";

function App() {
  return (
    <div className="App">
      <div className="container">
        <header>
          <p className="logo">Logo</p>
          <p className="nav">nav</p>
        </header>
        <section>
          <div className="center_container">
            <p className="introduce_text">
              Welcome to Our Typing Practice Web Application
            </p>
            <button className="start_button">Get Started!</button>
          </div>
          <div className="paragraph_container">
            <div className="paragraph_title">
              <h1>Proposal</h1>
            </div>
            <div className="paragraph_text"></div>
            <div className="paragraph_title">
              <h1>About us</h1>
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
