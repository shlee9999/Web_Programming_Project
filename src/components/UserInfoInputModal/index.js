import { useState, useRef } from "react";
import "./index.css";
import DefaultImg from "../../images/DefaultImg.png";

const UserInfoInput = ({ setViewPopup }) => {
  const [imageURL, setImageURL] = useState(DefaultImg);

  const fileInputRef = useRef(null);
  const nameInputRef = useRef(null);

  const handleChangedFile = (e) => {
    const reader = new FileReader();
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImage = reader.result;
      setImageURL(resultImage);
    };
  };

  const handleOnClickButton = () => {
    setViewPopup(false);
    localStorage.setItem("user_image", fileInputRef.current.value);
    localStorage.setItem("user_name", nameInputRef.current.value);
    console.log("성공");
  };

  return (
    <div className="page-wrapper">
      <div className="modal-wrapper">
        <div className="content-container">
          <div className="profile-container">
            <div className="profile-imageBox">
              <img className="profile-image" src={imageURL.toString()} />
            </div>
            <div className="profile-label-wrapper">
              <label htmlFor="file" className="profile-label">
                이미지 등록
              </label>
            </div>
          </div>
          <input
            type="file"
            id="file"
            onChange={handleChangedFile}
            ref={fileInputRef}
            className="hidden"
          />
          <div>
            <div className="name-label-wrapper">
              <label htmlFor="name" className="name-label">
                닉네임
              </label>
            </div>
            <input
              type="text"
              id="name"
              ref={nameInputRef}
              className="name-input"
            />
          </div>
          <button onClick={handleOnClickButton} className="submit-button">
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoInput;
