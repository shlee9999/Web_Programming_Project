import { useEffect, useRef, useState } from 'react';
import './index.css';
import { avatarList } from 'constants/avatarList';

export const UserInfo = ({ userName, userImageIndex, handleUserName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const onClickUserName = () => {
    setIsEditing(true);
    setInputValue(userName);
  };
  const onChange = ({ target: { value } }) => {
    if (value.length > 10) return;
    setInputValue(value);
  };

  const onKeyDown = ({ key }) => {
    switch (key) {
      case 'Enter':
        handleEnter();
        return;
      default:
        break;
    }
  };
  const handleEnter = () => {
    handleUserName(inputValue);
    setIsEditing(false);
  };
  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);
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
        <div className='user_name_wrapper' onClick={onClickUserName}>
          {isEditing ? (
            <input
              className='user_name_input'
              value={inputValue}
              onChange={onChange}
              onKeyDown={onKeyDown}
              ref={inputRef}
            />
          ) : (
            <p className='user_name'>{userName}</p>
          )}
        </div>
      </div>
    </div>
  );
};
