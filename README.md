# Smart Up

<div style="text-align: center;">
  <img src="https://github.com/funizo/project/blob/dev/FE/public/img/logo.png?raw=true" alt="Logo" width="300" height="300">
</div>

## 자영업자들을 위한 웹사이트

> 개발기간: 2024.06 ~ 2024.07
> <br>
> 팀원: 프론트엔드2명, 백앤드1명

## 프로젝트 소개

SmartUp 프로젝트는 프론트엔드와 백앤드 간 소통방식과 React의 기본적인 스킬을 향상 시키기위해
<br>
시작된 토이 프로젝트입니다. 주제는 자영업을 준비하거나 이미 하고있는 분들의 지식공유를 위해 만든
<br>
웹 커뮤니티 사이트입니다.

## 시작 가이드

- Node.js v20.13.1
- Npm 10.5.2
- React 18.3.1

## 설치 및 실행

```
Backend
cd be
npm i
npm start
```

```
Frontend
cd FE
npm i
npm start
```

## 사용언어,라이브러리

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

### 화면 구성 📺

|                                                  메인페이지                                                   |                                           로그인/회원가입 페이지                                            |
| :-----------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: |
|   <img src="https://github.com/funizo/project/blob/dev/FE/public/img/mainpage.png?raw=true" alt="mainpage">   |  <img src="https://github.com/funizo/project/blob/dev/FE/public/img/authpage.png?raw=true" alt="mainpage">  |
|                                                카테고리 페이지                                                |                                                  글 페이지                                                  |
| <img src="https://github.com/funizo/project/blob/dev/FE/public/img/categorypage.png?raw=true" alt="mainpage"> | <img src="https://github.com/funizo/project/blob/dev/FE/public/img/detailpage.png?raw=true" alt="mainpage"> |

| 메인페이지  
| :-----------------------------------------------------------------------------------------------------------:
| <img src="https://github.com/funizo/project/blob/dev/FE/public/img/createpage.png?raw=true" alt="mainpage"> |

# 주요기능

- 회원가입시 이미 등록된 이메일과 닉네임을 검증하기위해 debounce를 사용하여 사용자가 입력이 끝난후 중복유무를 확인
- React-hook-form을 사용하여 사용자 입력값의 유효성 확인
- 사용자 정보에 테마모드가 저장되어 어떤 플랫폼에서 로그인 하더라도 테마모드가 유지 또한 로컬스토리지에 저장되어 페이지<br>
  를 닫더라도 테마가 유지
- 자영업 관련하여 자유로운 글 작성 가능
- 태그 작성 가능 (최대5개)
