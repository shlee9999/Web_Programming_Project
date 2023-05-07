import "./index.css";
import VirtualKeyboard from "../../components/VirtualKeyboard";
function Typing() {
  return (
    <div className="typing_container">
      <header>
        <img
          src={process.env.PUBLIC_URL + "../../images/header_logo.png"}
          className="header_logo"
        />
      </header>
      <img
        src={process.env.PUBLIC_URL + "../../images/logo.png"}
        className="typing_page_logo"
      />
      <VirtualKeyboard />
    </div>
  );
}

export default Typing;
