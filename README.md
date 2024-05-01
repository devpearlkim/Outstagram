# 인스타그램 클론 sns

### 배포링크:

https://www.pearlstagram.com

### 블로그 포스팅으로 과정 기록:

https://beginner2junior.tistory.com

### 참고한 강의:

https://www.youtube.com/watch?v=RMScMwY2B6Q

### 클론코딩 이유:

chakra css배우는 시간 단축, 프로젝트 개발 흐름 익히기 위해  
클론코딩의 단점 보완 위해 기능 변경, 추가, 라이브러리 사용안하고 직접 구현

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

DAY4:

- 회원가입 구현(with useSignupEmail.js using firebase)
- 로그인, 로그아웃 구현전 Sidebar, Homepage css
- zustand 셋업
- amplify 배포

DAY5:

- 로그인, 로그아웃 구현
- 사이드바, 네브바, 프로텍티드 라우팅

DAY6:

- 구글로그인 구현(auth부분 비밀번호찾기 제외 마무리)
- 프로필페이지 헤더, 탭 css

DAY7:

- 프로필페이지 posts, post modal css
- firebase collection사용 부분 document로 변경

DAY8:

- 프로필 업데이트 기능 구현
- chakra-ui의 formController이용, fileReader로 파일 읽어서 setImage, username 중복체크, 유저이미지는 storage에 저장 후 URL을 받아와 firestore에 저장

DAY9:

- 팔로잉 구현
