import { useState, useRef, useEffect } from 'react';
import './index.css';
import { avatarList } from 'constants/avatarList';

export const UserInfoInputModal = ({
  viewUserInfoInputPopup,
  closeUserInfoInputPopup,
  handleUserName,
  handleUserImageIndex,
}) => {
  const nameInputRef = useRef(null);
  const focusedAvatarRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [focusedAvatarIndex, setFocusedAvatarIndex] = useState(0);

  const onClickButton = () => {
    saveUserInfo();
  };
  const onChange = ({ target: { value } }) => {
    if (value.length > 10) return;
    setInputValue(value);
  };
  const saveUserInfo = () => {
    if (inputValue === '') return;
    handleUserName(nameInputRef.current.value);
    handleUserImageIndex(focusedAvatarIndex);
    closeUserInfoInputPopup();
  };

  const onFocusImage = () => {
    if (!focusedAvatarRef.current) return;
    focusedAvatarRef.current.focus();
  };

  const onClickAnywhere = () => {
    if (!nameInputRef) return;
    nameInputRef.current.focus();
  };

  const handleClickAvatar = (index) => () => {
    setFocusedAvatarIndex(index);
  };

  useEffect(() => {
    if (!nameInputRef) return;
    nameInputRef.current.focus();
  }, [viewUserInfoInputPopup]);

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
            onChange={onChange}
            className='name_input'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                saveUserInfo();
              }
            }}
            value={inputValue}
          />
        </div>
        <button onClick={onClickButton} className='submit_button'>
          저장
        </button>
      </div>
    </div>
  );
};
