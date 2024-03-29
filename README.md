# 트레블 메이커 (Travel Maker)
🏝️여행🏝️에서의 추억들을 🖼️포토카드🖼️로 공유해보세요 😊
<div align="center">
  <img width="300px" src="https://user-images.githubusercontent.com/74370531/210206289-4e4f6ef3-de18-4fd0-ae73-501b0bf62a45.png" />
</div>

## 👥 멤버

- [Front-end](https://github.com/travelmaker-sku/TM-Front): [홍유진](https://github.com/yujinyny)
- [Back-end](https://github.com/travelmaker-sku/TM-Back): [남신욱](https://github.com/tlsdnr1135), [박지완](https://github.com/Parkjiwan2), [배지원](https://github.com/Bae-Ji-Won)

<br />

## 🗓 프로젝트 기간
- 2022.03.02 ~ 2022.06.18

<br>

## 🎞 프로젝트 발표 영상
https://youtu.be/ujqoWcUxWKQ

<br>
  
## ⚙️ 기술 스택
  
### Front-end

<div>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=React&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"/>
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"/>
  <img src="https://img.shields.io/badge/Styled Components-DB7093?style=for-the-badge&logo=Styled Components&logoColor=white"/>
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>
</div>

### Back-end

<div>
  <img alt="Java" src ="https://img.shields.io/badge/Java-007396.svg?&style=for-the-badge&logo=Java&logoColor=white"/>
  <img alt="Spring Boot" src ="https://img.shields.io/badge/Spring Boot-6DB33F.svg?&style=for-the-badge&logo=Spring Boot&logoColor=white"/>
  <img alt="Gradle" src ="https://img.shields.io/badge/Gradle-02303A.svg?&style=for-the-badge&logo=Gradle&logoColor=white"/>
  <img alt="Spring Security" src ="https://img.shields.io/badge/Spring Security-6DB33F.svg?&style=for-the-badge&logo=Spring Security&logoColor=white"/>
</div>
<div>
  <img alt="Amazon RDS" src="https://img.shields.io/badge/Amazon RDS-527FFF?style=for-the-badge&logo=Amazon RDS&logoColor=white"/>
  <img alt="MySQL" src ="https://img.shields.io/badge/MySQL-4479A1.svg?&style=for-the-badge&logo=MySQL&logoColor=white"/>
  <img alt="Hibernate" src ="https://img.shields.io/badge/Hibernate-59666C.svg?&style=for-the-badge&logo=Hibernate&logoColor=white"/>
</div>
<div>
  <img alt="Amazon AWS" src="https://img.shields.io/badge/Amazon AWS-232F3E?style=for-the-badge&logo=Amazon AWS&logoColor=white"/>
  <img alt="Amazon EC2" src="https://img.shields.io/badge/Amazon EC2-FF4F8B?style=for-the-badge&logo=Amazon EC2&logoColor=white"/>
</div>

<br />

## 🖥️ 아키텍처

<img width="500px" alt="아키텍처" src="https://user-images.githubusercontent.com/74370531/213071949-d4dd64a2-95ec-4f2a-8ce8-c58f84b69814.jpg">

<br />

## ☁️ 프로젝트 주요 기능 

### 1️⃣ 로그인
- 웹 자체의 기본 로그인 기능과 그 정보가 저장되는 DB관리
- 수준 높은 정보보안을 위한 2차 이메일 인증 기능
- 자신의 게시물을 관리하며 계정정보를 변경할 수 있는 계정관리 기능
- 암호화 토큰을 사용한 비밀번호 암호화 구현 
- Spring Security 라이브러리를 사용하여 로그인 구현

### 2️⃣ 포토카드 게시물
- 포토카드 게시물 템플릿 구현
- 항목의 따른 다양한 포토카드 형식 제공 (여행지, 숙소, 맛집)
- 다시보고 싶은 다른유저의 포토카드 저장 기능

### 3️⃣ 포토카드 게시물 프린트
- 포토프린트 디바이스를 활용한 포토카드 출력 기능

<br />

## 🎬 기능 시연

![그림3](https://user-images.githubusercontent.com/74370531/212478406-687bb49f-6cdb-4c22-a801-4f887fb6a458.png)

<details>
<summary><b>메인 페이지</b></summary>
<ul>
  <li>
    <div>전체 포토카드 목록 (인기, 최신, 가볼만한곳, 맛집, 숙소)</div>
    <img width="500px" src="https://user-images.githubusercontent.com/74370531/210299460-f4676ebc-cfe2-4050-8924-649b4b1e6ac6.gif" />
    <img width="500px" src="https://user-images.githubusercontent.com/74370531/210299290-e6587aa0-816b-40b1-b96a-8e5bdbf31d3d.gif" />
  </li>
  <li>
    <div>카테고리별 포토카드 목록 정렬 (최신순, 오래된순, 인기순)<div>
    <img width="500px" src="https://user-images.githubusercontent.com/74370531/210213638-09d42f54-3be6-4597-bdf2-2d9619dfc1ec.gif" />
  </li>
  <li>
    <div>카테코리별 포토카드 목록 페이지네이션<div>
    <img width="500px" src="https://user-images.githubusercontent.com/74370531/210213614-c42b4c43-eeb0-4b71-b483-b88aa48d7311.gif" />
  </li>
</ul>
</details>

<details>
<summary><b>회원가입 및 로그인</b></summary>
<ul>
  <li>
    <div>회원가입 (이메일 인증)</div>
    <img width="500px" src="https://user-images.githubusercontent.com/74370531/210214038-fb113979-61e4-4f69-932e-0770eea9f07a.gif" />
  </li>
  <li>
    <div>비밀번호 찾기</div>
    <img width="500px" src="https://user-images.githubusercontent.com/74370531/210214199-a2f2ac7d-a510-4658-ba97-9cc5f0577337.gif" />
  </li>
  <li>
    <div>로그인</div>
    <img width="500px" src="https://user-images.githubusercontent.com/74370531/210214064-06a1237b-aee9-4b0a-8af6-478fe5d0056c.gif" />
  </li>
</ul>
</details>

<details>
<summary><b>포토카드 만들기</b></summary>
<div>
<div><img width="500px" src="https://user-images.githubusercontent.com/74370531/210214426-2d15e6ad-8a4d-4b8c-b30b-86ddfc0a5c57.gif" /></div>
<div><img width="500px" src="https://user-images.githubusercontent.com/74370531/210214417-f43d7f9d-dd2b-4df1-b762-d331f890e256.gif" /></div>
</div>
</details>

<details>
<summary><b>마이페이지 (포토카드 인쇄, 수정, 삭제)</b></summary>
<ul>
  <li>
    <div>포토카드 인쇄</div>
    <img width="500px" src="https://user-images.githubusercontent.com/74370531/210214534-e8f19068-8e77-4be5-9c8d-7f2fafc3adec.gif" />
  </li>
  <li>
    <div>포토카드 수정</div>
    <img width="500px" src="https://user-images.githubusercontent.com/74370531/210214545-10c1e2be-42e2-4e9d-94fd-8bacaa0541a6.gif" />
  </li>
  <li>
    <div>포토카드 삭제</div>
    <img width="500px" src="https://user-images.githubusercontent.com/74370531/210214539-47ea63fb-2dbf-48ee-9385-e1610c9b6f1c.gif" />
  </li>
</ul>
</details>

<details>
<summary><b>좋아요 및 북마크</b></summary>
<div>
<img width="500px" src="https://user-images.githubusercontent.com/74370531/210214697-b3c8a9cf-778c-4bd5-be6f-167593e1edde.gif" />
</div>
</details>

<details>
<summary><b>검색</b></summary>
<div>
  <ul>
    <li>
    <div>실시간 검색</div>
    <img width="500px" src="https://user-images.githubusercontent.com/74370531/210214783-9612f045-eae1-4572-aaeb-7bb325f5978b.gif" />
  </li>
  <li>
    <div>각각 어디에서-제주, 무엇을-해수욕장 검색</div>
    <img width="500px" src="https://user-images.githubusercontent.com/74370531/210214766-01aa571c-3fb8-489b-b9c2-8f72844ea4d1.gif" />
  </li>
  <li>
    <div>어디에서-부산, 무엇을-해수욕장 검색</div>
    <img width="500px" src="https://user-images.githubusercontent.com/74370531/210214788-f0456905-b452-498c-a34a-3316c19a2583.gif" />
  </li>
</ul>
</details>

<details>
<summary><b>회원 탈퇴</b></summary>
<div>
<div><img width="500px" src="https://user-images.githubusercontent.com/74370531/210214945-4c3b4e73-f78d-47f6-ac26-2a8ffbbb600f.gif" /></div>
<div><img width="500px" src="https://user-images.githubusercontent.com/74370531/210214941-167f4be3-ca23-4148-ba11-d2a90855a023.gif" /></div>
</div>
</details>
  
<br/>
  
<div>
  <img width="20%" src="https://user-images.githubusercontent.com/74370531/210216375-e3bd3425-0b03-4fb8-ac08-1436570770d1.jpg" />
  <img width="20%" src="https://user-images.githubusercontent.com/74370531/210216382-fe3c1894-1be0-4aa7-b4e3-63936e3eb425.jpg" />
  <img width="20%" src="https://user-images.githubusercontent.com/74370531/210216386-83ae8100-b95a-4a60-a00e-b2a12536bacc.jpg" />
  <img width="20%" src="https://user-images.githubusercontent.com/74370531/210216389-cc64e8e7-6c3b-4d4e-a98a-3117210767bf.jpg" />
</div>
