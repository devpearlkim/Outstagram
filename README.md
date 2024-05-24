# 인스타그램 클론 sns (2024/04/23 ~ 2024/05/23 )

https://www.notion.so/3bb3d09925794b8ba433e058756f308d?pvs=4

![image](https://github.com/devpearlkim/Outstagram/assets/167426229/cb2230b6-a2cf-49d3-bbd9-0d84d02adf38)


![image](https://github.com/devpearlkim/Outstagram/assets/167426229/e58be29a-b66d-42e8-b7ce-35e5ce779cc2)



![컴포넌트트리](https://github.com/devpearlkim/Outstagram/assets/167426229/ac4fdc01-cf6c-4710-99c7-5dfd8c1d69bb)


### Tech Stack:

- Vitest
- Firebase
- Amplify
- zustand
- ReactQuery
- Chakra UI
- React
- JavaScript

### Deployment Link:

https://www.pearlstagram.com

### Process documented in a blog post:

https://beginner2junior.tistory.com

### Courses referenced (참고한 강의):

https://www.youtube.com/watch?v=RMScMwY2B6Q

### Project Progress:

#### STEP1 (2024/04/23 - 2024/05/03)

#### Complete basic functionalities while watching lectures + Identify areas for improvement and enhance them

#### STEP2 (2024/05/05 - 2024/05/23)

#### Enhancement, additional features

##### Enhancements needed:

- [] Transition to TypeScript
- [v] Studying Design Patterns, Drawing Component Trees
- [v] Learn testing and write test codes
- [v] Cache data with react-query (reduce state management in store, combine hooks)
- [v] Change form validation (image, nickname)
- [v] Implement password recovery
- [v] Update user search to onChange (+ update suggestedUser followers)
- [v] Implement post editing functionality

### Project Progress:

DAY1:

- Initial setup
- Error boundary class
- AuthForm CSS
- Focus on empty fields upon AuthForm submission
- Failed email verification with nodemailer  
  (Failed due to inability to obtain Google App Password. Improvement needed for authentication with OAuth2.)

DAY3:

- Implemented Firebase Google login
- Separated AuthForm component

DAY4:

- Implemented user registration
- Sidebar and Homepage CSS before implementing login and logout
- Setup Zustand
- Deployed with Amplify

DAY5:

- Implemented login and logout functionality
- Styled Sidebar, Navbar, and implemented protected routing

DAY6:

- Completed Google login implementation (excluding password recovery in the auth part)
- Styled header and tabs for the profile page

DAY7:

- Styled profile page posts and post modal
- Changed parts using Firebase collection to document

DAY8:

- Implemented profile update functionality

DAY9:

- Implemented following feature
- Implemented user search, suggested users (with buttons for follow/unfollow)
- Added functionality for adding posts, viewing profiles, and fetching posts on the main page

DAY10:

- Implemented post deletion
- Implemented comment functionality
- Implemented like functionality

Code Modification:

- Modify image check in the writing form.
- Implement password reset feature.
- Update user search functionality to trigger onChange.

Understanding structure(5/7 - 5/8):

- Studying design patterns
- Drawing component trees
- Understanding structure, understanding data flow

testing(Vitest), React Query (5/9 - 5/15):

- Learn testing and write test codes
- Applying React Query, useMutation

TypeScript (5/16 - 5/19):

- Transition to TypeScript

### 프로젝트 진행 계획:

#### STEP1 강의 보며 기본기능 완성 (2024/04/23 - 2024/05/03)

#### STEP2 보완, 추가기능 (2024/05/05 - 2024/05/23)

보완 필요:

- [] TS로 전환
- [v] 테스트코드 작성
- [v] react-query로 데이터 캐싱
- [v] 디자인 패턴 공부, 컴포넌트 트리 그리기
- [v] 폼부분 폼체크 변경 (이미지, 닉네임, 본인)
- [v] 비밀번호 찾기
- [v] 유저검색 onChange로 변경 (+ suggestedUser 팔로워 업데이트)
- [v] 글 수정 기능
- [v] 댓글 추가, 삭제 기능 + 뷰 업데이트
- [v] 좋아요목록 확인
- [v] 팔로잉/팔로워 확인, follow에 useMutation적용

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

코드수정 (5/4):

- 글쓰기폼 이미지체크 수정
- 비밀번호 재설정 기능
- 검색 (유저검색 onChange로 수정)

컴포넌트 구조 파악 (5/7 - 5/8):

- 디자인패턴 공부
- 컴포넌트 트리 그리기
- 구조 파악 데이터 흐름 파악

테스트코드 작성, React-query 적용 (5/9 - 5/15):

- 테스트코드 배워서 테스트코드 작성
- React Query, mutation 적용

TS전환 (5/16 - 5/19):

- 타입스크립트로 전환
