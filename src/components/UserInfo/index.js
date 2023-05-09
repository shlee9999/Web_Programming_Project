import "./index.css";

const UserInfo = () => {
  const userName = localStorage.getItem("user_name");
  //사용자가 선택한 사진
  return (
    <div className="userInfo-wrapper">
      <div className="profile-container">
        <div className="avatar-imageBox">
          <img alt="선택한 사진" />
        </div>
        <div className="user-name-wrapper">
          <p className="user-name">{userName}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
