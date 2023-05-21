import { useState, useRef, useEffect } from 'react';
import './index.css';
import { avatarList } from '../../constants/avatarList';

const UserInfoInput = ({ viewUserInfoInputPopup, closeUserInfoInputPopup }) => {
  const nameInputRef = useRef(null);
  const [actived, setActived] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const onClickButton = () => {
    saveUserInfo();
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const saveUserInfo = () => {
    if (inputValue === '') return;
    closeUserInfoInputPopup();
    localStorage.setItem('user_image', focusedAvatarIndex);
    localStorage.setItem('user_name', inputValue);
  };

  const onFocusImage = () => {
    if (!focusedAvatarRef.current) return;
    focusedAvatarRef.current.focus();
  };
  const focusedAvatarRef = useRef(null);
  const [focusedAvatarIndex, setFocusedAvatarIndex] = useState(0);

  useEffect(() => {
    if (!nameInputRef) return;
    nameInputRef.current.focus();
  }, [viewUserInfoInputPopup]);

  const onClickAnywhere = () => {
    if (!nameInputRef) return;
    nameInputRef.current.focus();
  };
  const handleClickAvatar = (index) => () => {
    setFocusedAvatarIndex(index);
  };
  return (
    <div className='modal_overlay' onClick={onClickAnywhere}>
      <div className='modal header_title'>
        Hello! Please choose your Character.
        <br /> And, write your nickname.
        <div className='avatar_container'>
          {avatarList.map((avatar, index) => {
            return (
              <div
                className={`avatar_imageBox ${
                  focusedAvatarIndex === index && `active`
                }`}
                key={`avatar_${index}`}
              >
                <img
                  onClick={handleClickAvatar(index)}
                  onFocus={onFocusImage}
                  className='avatar_image'
                  src={avatar}
                  alt={`avatar_${index}`}
                  ref={focusedAvatarRef}
                />
              </div>
            );
          })}
        </div>
        <div>
          <div className='name_label_wrapper'>
            <label htmlFor='name' className='name_label'>
              닉네임
            </label>
          </div>
          <input
            type='text'
            id='name'
            ref={nameInputRef}
            onChange={handleInputChange}
            className='name_input'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                saveUserInfo();
              }
            }}
          />
        </div>
        <button onClick={onClickButton} className='submit_button'>
          저장
        </button>
      </div>
    </div>
  );
};

export default UserInfoInput;
