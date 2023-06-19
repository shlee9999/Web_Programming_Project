import './index.css';

const Feature = () => {
  return (
    <div className='section_wrapper'>
      <div className='proposal_section feature_section'>
        <span className='section_title'>feature</span>
        <div className='section_main'>
          <ul className='feature_list'>
            <li>✔️ 사용자가 프로필 이미지와 닉네임을 입력합니다.</li>
            <li>
              ✔️ 카테고리에서 작성할 언어와 글을 선택하여 타자 연습을
              시작합니다.
            </li>
            <li>✔️ 긴 글, 단어 또는 게임 모드 선택이 가능합니다.</li>
            <li>
              ✔️ 타자 연습 진행 시간, 입력한 타자의 실시간 속도 및 정확도를
              확인할 수 있습니다.
            </li>
            <li>
              ✔️ 틀리게 입력하면 글이 빨간색으로 변하여 오타를 쉽게 확인할 수
              있습니다.
            </li>
            <li>✔️ 사용자의 타자 연습 기록과 통계를 확인할 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Feature;
