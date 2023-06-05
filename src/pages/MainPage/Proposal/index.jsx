import React from 'react';
import './index.css';

const Proposal = () => {
  return (
    <div className='container'>
      <div className='proposal_section introduction_section'>
        <span className='section_title'>introduction</span>
        <div className='section_main'>
          <p className='section_main_content'>
            <span className='main_title'>Typing Pro</span>는 한글 및 영어 타자
            연습을 위한 웹 플랫폼 입니다.
          </p>
          카테고리에서 선택한 주제로 긴 글과 낱말 연습을 할 수 있습니다.
          {/* 추가 */}
        </div>
      </div>
      <div className='proposal_section feature_section'>
        <span className='section_title'>feature</span>
        <div className='section_main'>
          <ul className='feature_list'>
            <li>사용자가 프로필 이미지와 닉네임을 입력합니다.</li>
            <li>
              카테고리에서 작성할 언어와 글을 선택하여 타자 연습을 시작합니다.
            </li>
            <li>
              타자 연습 진행 시간, 입력한 타자의 실시간 속도 및 정확도를 확인할
              수 있습니다.
            </li>
            <li>
              틀리게 입력하면 글이 빨간색으로 변하여 오타를 쉽게 확인할 수
              있습니다.
            </li>
            <li>사용자의 타자 연습 기록들을 확인할 수 있습니다.</li>
            {/* 추가 */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
