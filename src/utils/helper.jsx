export const getFormattedDate = () => {
  const date = new Date();
  const year = date.getFullYear() % 2000;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}.${month}.${day}`;
};

export const getFormattedTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
  }${seconds}`;
};

export const shuffleArray = (acidRainWords) => {
  let arr = Array.from({ length: acidRainWords.length }, (_, i) => i); // 0부터 10까지의 배열 생성
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 0부터 i까지 랜덤 인덱스 생성
    [arr[i], arr[j]] = [arr[j], arr[i]]; // 해당 인덱스와 랜덤 인덱스의 요소 교환
  }
  return arr;
};

export const chunkArray = (array, chunkSize) => {
  let result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

export const getInfo = (level) => {
  let LENGTH = -1;
  let timeLimit = -1;
  switch (level) {
    case 1:
      LENGTH = 3;
      timeLimit = 6;
      break;
    case 2:
      LENGTH = 5;
      timeLimit = 6;
      break;
    case 3:
      LENGTH = 6;
      timeLimit = 5;
      break;
    case 4:
      LENGTH = 7;
      timeLimit = 5;
      break;
    case 5:
      LENGTH = 8;
      timeLimit = 0;
      break;
    default:
      console.error('Level Missing');
  }
  return { LENGTH, timeLimit };
};
