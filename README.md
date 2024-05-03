# 인스타그램 클론 sns (2024/04/23 - 진행중)

### 사용기술:

firebase, awa amplify, chakra-ui, react, javascript

### 배포링크:

https://www.pearlstagram.com

### 블로그 포스팅으로 과정 기록:

https://beginner2junior.tistory.com

### 참고한 강의:

https://www.youtube.com/watch?v=RMScMwY2B6Q

### 프로젝트 진행 계획:

#### STEP1 강의 보며 기본기능 완성 + 보완이 필요한 부분들 정리하며 보완 (2024/04/23 - 2024/05/03)

#### STEP2 추가로 보완이 필요한 부분들 보완 (2024/05/05 - ???)

- 원래 계획은 검색기능 페이지로 분리 글검색, 해시태그 검색추가, 글작성 시 해시태그 추가 였으나 그간 해온것과 중복.
  (지금까지 검색->목록 페이지 여러번 만들었고, 해시태그 부분은 직전프로젝트의 메인 기능 중 하나였음)
- 변경 계획: 자잘한 부분들도 보완이 필요한 부분 보완하기 및 훅사용, 상태관리, 컴포넌트관리를 한 방식에 대한 비교 및 정리

### STEP3 타입스크립트로 전환

### 프로젝트 진행상황:

DAY1:

- 기본셋업
- 에러바운더리 클래스
- AuthForm CSS
- AuthForm 제출시 빈 필드 값에 focus
- 이메일인증 nodemailer 실패  
  (구글 App Password발급받지 못해 실패. OAuth2로 인증을 보완 필요.)

DAY3:

- 파이어베이스 구글로그인
- AuthForm 컴포넌트 분리

DAY4:

- 회원가입 구현
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

DAY9:

- 팔로잉 구현
- 유저검색, 추천유저 (+ 옆 버튼으로 follow/unfollow) 구현
- 글추가, 프로필페이, 메인페이지에서 글 불러오기

DAY10 :

- 글삭제구현
- 댓글구현
- 좋아요 구현
