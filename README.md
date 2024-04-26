# 인스타그램 클론 sns

### 참고한 강의:

https://www.youtube.com/watch?v=RMScMwY2B6Q

### 클론코딩 이유:

시간단축, 프로젝트 개발 흐름 익히기 위해  
chakra배움 -> 공통컴포넌트 만드는 시간 단축,
firebase배움 -> 간단하게 데이터 처리 가능,
클론코딩의 단점 보완 위해 기능 변경, 추가, 다른 라이브러리 사용 등 변경예정

### 프로젝트 진행상황:

DAY1:

- 기본셋업
- 에러바운더리 클래스
- AuthForm CSS
- AuthForm 제출시 빈 필드 값에 focus
- 이메일인증 nodemailer 실패  
  (이메일 인증 부분에서 App Password발급받지 못해 실패했다. 테스트어카운트로 전송 확인, req.body에 오는 값까지 확인, 추후 nodemailer에서도 소개한 OAuth2로 인증을 보완해 시도해야한다.)

DAY3:

- 파이어베이스 셋업
- 파이어베이스 구글로그인
- AuthForm 컴포넌트 분리
