# Smart Up

<div style="text-align: center;">
  <img src="https://github.com/funizo/project/blob/dev/FE/public/img/logo.png?raw=true" alt="Logo" width="300" height="300">
</div>

## 프로젝트 소개

> 자영업자들을 위한 웹사이트 플랫폼, SmartUp입니다.
> <br>
> 개발기간: 2024.06 ~ 2024.07
> <br>
> 팀원: 프론트엔드2명, 백앤드1명

## 기술 스택
- Node.js v20.13.1
- Npm 10.5.2
- React 18.3.1

### 프론트엔드<br>

![javascript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![react](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![tailwind](https://img.shields.io/badge/tailwind-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![mui](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)

### 백엔드<br>

![nodejs](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![express](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white)
![mongodb](https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white)

### 버전 관리<br>

![git](https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white)
![github](https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white)

<br>
<br>

## 📌 서비스 기능 명세(담당 기능 ✔️ 표시)

### Feature 1. 회원 가입 및 로그인
#### 회원가입
- 닉네임 유효성검사
- 이메일,닉네임 자동 중복 검사

### Feature 2. 게시글
#### 게시글 작성
- 로그인 상태에서만 게시글 작성 가능
- 태그 최대 5개 추가 가능

#### 게시글 열람
- 원하는 Topic에 해당하는 게시글만 모아서 볼 수 있음 ✔️
- 추가된 태그를 게시글 열람 전에 1차적으로 확인 가능 ✔️
- 조회수, 좋아요, 댓글 숫자 열람 전에 1차적으로 확인 가능 ✔️

#### 좋아요/싫어요
- 로그인 상태에서만 타 유저의 게시글에 좋아요/싫어요로 반응 남기기 가능 ✔️
- 중복 방지 기능 존재 ✔️

#### 페이지네이션
- 웹 사이트 홈 화면에서 모든 게시글을 연속해서 볼 수 있는 인피니티 스크롤 기능 존재 ✔️
- 특정 카테고리 화면에서 카테고리에 속하는 게시글들만 모아서 볼 수 있는 일반 페이지네이션 기능 존재 ✔️

### Feature 3. 댓글 및 답글
- 로그인 된 유저에 한해 댓글/답글 작성 가능 ✔️
- 비로그인 상태일 경우 댓글 창에 로그인 요구 문구 출력 ✔️
- 내가 작성한 댓글 및 답글은 다른 유저들과 구분되어 보이도록 UI 표시 ✔️

### Feature 4. 알림
- 타 유저가 내 게시글/댓글에 댓글을 남길 경우 알림 전송 ✔️
- 전송된 알림을 모아서 볼 수 있음 ✔️
- 알림 모아 보기에서 읽음 처리, 삭제 처리 가능 ✔️

## 화면 구성 📺

|                                                  메인페이지                                                   |                                           로그인/회원가입 페이지                                            |
| :-----------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: |
|   <img src="https://github.com/funizo/project/blob/dev/FE/public/img/mainpage.png?raw=true" alt="mainpage">   |  <img src="https://github.com/funizo/project/blob/dev/FE/public/img/authpage.png?raw=true" alt="mainpage">  |
|                                                카테고리 페이지                                                |                                                  글 페이지                                                  |
| <img src="https://github.com/funizo/project/blob/dev/FE/public/img/categorypage.png?raw=true" alt="mainpage"> | <img src="https://github.com/funizo/project/blob/dev/FE/public/img/detailpage.png?raw=true" alt="mainpage"> |

| 메인페이지  
| :-----------------------------------------------------------------------------------------------------------:
| <img src="https://github.com/funizo/project/blob/dev/FE/public/img/createpage.png?raw=true" alt="mainpage"> |
