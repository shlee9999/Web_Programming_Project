import './index.css';

const Introduction = () => {
  return (
    <div className='section_wrapper'>
      <div className='proposal_section introduction_section'>
        <span className='section_title'>introduction</span>
        <div className='section_main'>
          <p className='section_main_content'>
            <span className='main_title'>Typing Pro</span>
            는 한글 및 영어 타자 연습을 위한 웹 플랫폼 입니다.
            <br />
          </p>
          카테고리에서 원하는 글 또는 주제를 선택하여 타자 연습을 할 수
          있습니다.
          <br />
          Typing Pro를 통해 타자 실력을 향상시켜보세요!
        </div>
      </div>
    </div>
  );
};

export default Introduction;
