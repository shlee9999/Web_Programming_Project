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
    <div className="page_wrapper">
      <div className="modal_wrapper">
        <div className="content_container">
          <p className="header_title">Hello! Please choose you Character.</p>
          <p className="header_title">And, write you nickname.</p>
          <div className="avatar_container">
            <div className="avatar_imageBox">
              <img
                className="avatar_image"
                src={imageURL.toString()}
                alt="avatar"
              />
            </div>
            <div className="avatar_label_wrapper">
              <label htmlFor="file" className="avatar_label">
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
            <div className="name_label_wrapper">
              <label htmlFor="name" className="name_label">
                닉네임
              </label>
            </div>
            <input
              type="text"
              id="name"
              ref={nameInputRef}
              className="name_input"
            />
          </div>
          <button onClick={handleOnClickButton} className="submit_button">
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoInput;
