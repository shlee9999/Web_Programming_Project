import React from 'react';
import './index.css';
import { aboutUsAvatarList } from '../../../constants/aboutUsAvatarList';

const AboutUs = () => {
  const info = [
    {
      name: '이성훈',
      studentId: '2018112173',
      introduction: '작년 2학기에 교과목에서 Java를 접하며 처음 개발을 시작하게 되었습니다. \n방학동안 알고리즘을 공부하고, 이번 학기 프론트 엔드 관련 교과목을 들으며 UX에 민감한 저의 성격이 프론트 엔드와 적성이 맞다는 것을 느껴 프론트 엔드 개발자를 지망하게 되었습니다. \n첫 프로젝트인 만큼 정성을 다하고, 특히 UX 개선에 최선을 다하겠습니다.',
    },
    {
      name: '김민정',
      studentId: '2019111791',
      introduction: '저는 21년에 소프트웨어 연계전공으로 약 1년 정도 기본적인 프로그래밍 언어와 CS 기초를 공부했고, 작년 1년 동안에는 휴학을 하며 BE 기반 웹 개발 수업을 듣게 되었습니다. \n디테일한 부분을 다루는 FE 프로젝트는 처음 경험해봐서 다소 어렵게 느껴졌지만, FE 관련된 새로운 언어 배우고 디자인 요소에 많은 시간을 쏟을 수 있어 뜻깊은 경험이 될 것 같습니다. \n이번 프로젝트를 통해 같은 팀원 분들에게도 많이 배우면서 함께 성장해 나가겠습니다.',
    },
    {
      name: '한수정',
      studentId: '2019111615',
      introduction: '',
    },
  ];
  return (
    <div className="container">
      {info.map((developer, index) => {
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
              {/* <div>{developer.studentId}</div> */}
            </div>
            <div className='developer_info'>
              {developer.introduction}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AboutUs;
