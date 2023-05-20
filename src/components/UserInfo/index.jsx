import './index.css';
import { avatarList } from '../../constants/avatarList';
import { useEffect, useState } from 'react';

const UserInfo = ({ viewPopup }) => {
  const [userName, setUserName] = useState('');
  const [userImageIndex, setUserImageIndex] = useState(0);

  useEffect(() => {
    //불러오기
    if (viewPopup) return;
    setUserName(localStorage.getItem('user_name'));
    setUserImageIndex(localStorage.getItem('user_image'));
  }, [viewPopup]);
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

export default UserInfo;
