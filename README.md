# ⭐TypingPro ReadMe⭐

![긴 글 연습](https://github.com/user-attachments/assets/5aa8d5a0-b69b-4437-b5a6-47e5c5e48a36)

- 배포 URL : https://typing-pro-sigma.vercel.app/

## **✨ 프로젝트 소개**

TypingPro는 한컴타자연습에서 영감을 받아 개발된 타자 연습 웹 플랫폼입니다. DB와 백엔드 의존성을 제거하고 로그인 절차를 생략하여 누구나 즉시 타자 연습을 시작할 수 있으며 기록은 로컬 스토리지에 저장됩니다.
떨어지는 단어를 제한 시간 내에 입력해야 하는 게임 요소도 도입하여 재미와 도전 의식을 더해보았습니다.

## **⏰ 개발 기간**

2023.04 ~ 2023.06

## **👪 팀원 구성**

- 김민정
- 이성훈
- 한수정

## **♻️ 개발 환경**

| 카테고리    | 기술/도구                    |
| ----------- | ---------------------------- |
| Front-end   | React, Javascript, HTML, CSS |
| 협업 도구   | Notion, Figma, Discord       |
| 배포 서비스 | Vercel                       |

## **🏗️** 프로젝트 구조

```
📦src
 ┣ 📂assets
 ┃ ┣ 📂avatar (Dog.webp, Female.webp, Male.webp)
 ┃ ┣ 📂sounds (Enter.mp3, Rain.mp3, WaterDrop.wav, Yeah.wav)
 ┃ ┣ 📜ExitButton.svg
 ┃ ┣ 📜header_logo.webp
 ┃ ┗ 📜logo.webp
 ┣ 📂components
 ┃ ┣ 📂AcidRain
 ┃ ┣ 📂WithContext
 ┃ ┗ 📂WithoutContext
 ┣ 📂constants
 ┣ 📂hooks
 ┣ 📂images
 ┃ ┗ 📂aboutUs
 ┣ 📂pages
 ┃ ┣ 📂MainPage
 ┃ ┣ 📂NotFound
 ┃ ┗ 📂TypingPage
 ┣ 📂utils
 ┣ 📜global.css
 ┗ 📜index.jsx
```

## 🌈 핵심 기능

### 긴 글 연습

![긴 글 연습](https://github.com/user-attachments/assets/31979f86-d3e3-4885-bb0a-3e0e2e2a9645)

- 사용자가 키를 입력하면 실시간으로 UI와 TypingSpeed, Typing Accuracy에 반영됩니다.
- 1초마다 Typing Speed가 감소합니다.
- Pause 버튼을 눌러 일시정지 후 다시 시작할 수 있습니다.

### 단어 연습

![단어 연습](https://github.com/user-attachments/assets/35f23080-af24-43ba-b6d3-fa5c05901581)

- 로직은 긴 글 연습과 동일하지만 보기가 단어로만 이루어져 있습니다..

### 소나기 게임

https://github.com/user-attachments/assets/645d2978-6b90-4919-928b-662b622d3e42

- 단어가 바닥 경계에 닿기 전에 입력해야 하는 미니게임입니다.
- 레벨이 증가함에 따라 단어의 개수와 내려오는 속도가 증가합니다.

## 통계

![{052A7140-AD4D-404B-A82A-7D45CDBF16E5}](https://github.com/user-attachments/assets/81147e92-4f2a-45e2-bb89-2bc844c68afe)
