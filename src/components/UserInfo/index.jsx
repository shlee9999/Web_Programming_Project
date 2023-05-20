import './index.css';
import Dog from '../../images/avatar/Dog.png';
import Female from '../../images/avatar/Female.png';
import Male from '../../images/avatar/Male.png';

const avatarList = [Male, Female, Dog];
const UserInfo = ({ typingSpeed, typingAccuracy }) => {
  const userName = localStorage.getItem('user_name');
  const userImage = localStorage.getItem('user_image');

  //사용자가 선택한 사진
  return (
    <div className='userInfo_wrapper'>
      <div className='profile_container'>
        <div className='avatar_imageBox_selected'>
          <img
            className='avatar_image'
            alt='선택한 사진'
            src={avatarList[userImage]}
          />
        </div>
        <div className='user_name_wrapper'>
          <p className='user_name'>{userName}</p>
        </div>
        <div>
          <p>{typingSpeed}</p>
          <p>{typingAccuracy}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
