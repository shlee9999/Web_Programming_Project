import { useState, useRef } from 'react';
import './index.css';
import Dog from '../../images/avatar/Dog.png';
import Female from '../../images/avatar/Female.png';
import Male from '../../images/avatar/Male.png';

const UserInfoInput = ({ setViewPopup }) => {
  const nameInputRef = useRef(null);
  const [selected, setSelected] = useState();

  const OnClickButton = () => {
    setViewPopup(false);
    localStorage.setItem('user_image', selected);
    localStorage.setItem('user_name', nameInputRef.current.value);
    console.log('성공');
  };

  return (
    <div className='page_wrapper'>
      <div className='modal_wrapper'>
        <div className='content_container'>
          <p className='header_title'>Hello! Please choose you Character.</p>
          <p className='header_title'>And, write you nickname.</p>
          <div className='avatar_container'>
            <div
              className={
                selected === 1 ? 'avatar_imageBox active' : 'avatar_imageBox'
              }
              onClick={() => {
                setSelected(1);
              }}
            >
              <img className='avatar_image' src={Male} alt='male' />
            </div>
            <div
              className={
                selected === 2 ? 'avatar_imageBox active' : 'avatar_imageBox'
              }
              onClick={() => {
                setSelected(2);
              }}
            >
              <img className='avatar_image' src={Female} alt='female' />
            </div>
            <div
              className={
                selected === 3 ? 'avatar_imageBox active' : 'avatar_imageBox'
              }
            >
              <img
                className='avatar_image'
                src={Dog}
                alt='dog'
                onClick={() => {
                  setSelected(3);
                }}
              />
            </div>
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
              className='name_input'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  OnClickButton();
                }
              }}
            />
          </div>
          <button onClick={OnClickButton} className='submit_button'>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoInput;
