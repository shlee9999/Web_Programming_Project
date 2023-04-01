import "./App.css";
function App() {
  return (
    <div className="App">
      <div className="container">
        <header>
          <p>Logo</p>
          <p>nav</p>
        </header>
        <section>
          <div className="centerContainer">
            <p className="introduceText">
              Welcome to Our Typing Practice Web Application
            </p>
            <button className="startButton">Get Started!</button>
          </div>
          <div className="paragraphContainer">
            <div className="paragraphTitle">
              <h1>Proposal</h1>
            </div>
            <div className="paragraphText"></div>
            <div className="paragraphTitle">
              <h1>About us</h1>
            </div>
            <div className="paragraphText"></div>
          </div>
        </section>
        <footer></footer>
      </div>
    </div>
  );
}

export default App;
