import './index.css';
import { avatarList } from 'constants/avatarList';

export const UserInfo = ({ userName, userImageIndex }) => {
  return (
    <div className='userInfo_wrapper'>
      <div className='profile_container'>
        <div className='avatar_imageBox_selected'>
          <img
            className='avatar_image'
            alt='select_image'
            src={avatarList[userImageIndex]}
          />
        </div>
        <div className='user_name_wrapper'>
          <p className='user_name'>{userName}</p>
        </div>
      </div>
    </div>
  );
};
