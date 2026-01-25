module.exports = {
  ci: {
    collect: {
      // 빌드된 파일을 서버로 띄우고 측정을 시작합니다.
      startServerCommand: 'npm run preview',
      // serve 패키지가 서버를 띄웠을 때 출력하는 문구를 기다립니다.
      startServerReadyPattern: 'Accepting connections at|Local:',
      url: ['http://localhost:3001'],
      numberOfRuns: 3,
      settings: {
        // 시크릿 모드(--incognito) 설정을 통해 깨끗한 환경에서 측정합니다. [web:109]
        chromeFlags: '--no-sandbox --incognito --disable-dev-shm-usage',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
