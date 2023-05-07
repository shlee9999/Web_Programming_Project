import "./index.css";
import { useState } from "react";
import VirtualKeyboard from "../../components/VirtualKeyboard";
import UserInfoInput from "../../components/UserInfoInputModal";

function Typing() {
  const [viewPopup, setViewPopup] = useState(true);

  return (
    <>
      <div className="typing_container">
        <header>
          <img
            src={process.env.PUBLIC_URL + "../../images/header_logo.png"}
            className="header_logo"
            alt="헤더"
          />
        </header>
        <img
          src={process.env.PUBLIC_URL + "../../images/logo.png"}
          className="typing_page_logo"
          alt="헤더로고"
        />
        <VirtualKeyboard />
        {viewPopup && <UserInfoInput setViewPopup={setViewPopup} />}
      </div>
    </>
  );
}

export default Typing;
