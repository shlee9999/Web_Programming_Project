import { useState, useRef, useEffect } from 'react';
import './index.css';
import { avatarList } from '../../constants/avatarList';

const UserInfoInput = ({ viewPopup, setViewPopup }) => {
  const nameInputRef = useRef(null);
  const [selected, setSelected] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const onClickButton = () => {
    saveUserInfo();
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const saveUserInfo = () => {
    if (inputValue === '') return;
    setViewPopup(false);
    localStorage.setItem('user_image', selected);
    localStorage.setItem('user_name', inputValue);
  };

  const onClickImage = (index) => () => {
    setSelected(index);
  };

  useEffect(() => {
    if (!nameInputRef) return;
    nameInputRef.current.focus();
  }, [viewPopup]);
  const onClickAnywhere = () => {
    if (!nameInputRef) return;
    nameInputRef.current.focus();
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
                className={`avatar_imageBox ${selected === index && `active`}`}
                onClick={onClickImage(index)}
                key={`avatar_${index}`}
              >
                <img
                  className='avatar_image'
                  src={avatar}
                  alt={`avatar_${index}`}
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
