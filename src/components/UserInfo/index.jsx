import "./index.css";

const UserInfo = () => {
  const userName = localStorage.getItem("user_name");
  //사용자가 선택한 사진
  return (
    <div className="userInfo_wrapper">
      <div className="profile_container">
        <div className="avatar_imageBox">
          <img alt="선택한 사진" src="" />
        </div>
        <div className="user_name_wrapper">
          <p className="user_name">{userName}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
