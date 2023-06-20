import React from 'react';
import './index.css';
import { developerInfo } from 'constants/aboutUsDeveloperInfo';
import { aboutUsAvatarList } from 'constants/aboutUsAvatarList';

const AboutUs = () => {
  return (
    <div className='container'>
      {developerInfo.map((developer, index) => {
        return (
          <div key={index} className='developer_info_wrapper'>
            <div className='info_left_container'>
              <div className='image_box'>
                <img
                  className='developer_avatar_image'
                  src={aboutUsAvatarList[index]}
                  alt='avatarImage'
                />
              </div>
              <div className='developer_name'>{developer.name}</div>
            </div>
            <div className='developer_info'>{developer.introduction}</div>
          </div>
        );
      })}
    </div>
  );
};

export default AboutUs;
