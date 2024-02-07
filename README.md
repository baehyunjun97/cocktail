# Project cocktail
<br>
주제 : 칵테일 추천 및 자작 칵테일 등록 사이트<br>
일정 : 2023.12.19 ~ 2024.02.01<br>
<img width="609" alt="image" src="https://github.com/baehyunjun97/cocktail/assets/110373230/3bd290c3-7b62-4b29-8b4d-ac515dc436eb">
<br>
<hr>
OS : window 11, Mac Os<br>
사용 언어 : JAVA, JavaScript, CSS,HTML<br>
FrameWork/ Library : Mybatis, Spring, React.js<br>
DB : ORACLE DB<br>
WAS : TOMCAT 9.0<br>
Collaboration : GIT, SourceTree<br>
<hr>

<h2>DB 모델링</h2>
LINK : https://www.erdcloud.com/d/oeu55XbFC4gDqfCsC
<img width="997" alt="image" src="https://github.com/baehyunjun97/cocktail/assets/110373230/70b11ab5-85c7-4923-b6a8-1605e9bc7fce">

1. 중간 테이블인 “레시피” Entity
- 칵테일과 재료 사이에 다대다 관계가 필요하였으나, 일대다-다대일 관계로 풀어냄

2. 칵테일 테이블
- 등록된 칵테일의 정보 관리
- 삭제여부(Y,N)를 통해 칵테일의 노출 여부를 고려
- 재료수,알코올 도수 컬럼을 통해 필터링을 진행
- 내용 변경이 일어날 수 있는 카테고리를 별도의 테이블로 구분하여 추후 변경에 대응
- 하나의 칵테일에 여러 이미지가 첨부될 수 있기에, 별도의 테이블로 구분하여 관리.

3. 재료 테이블
- 등록된 재료의 정보 관리
- 삭제여부(Y,N)를 통해 재료의 노출 여부를 고려

4. 회원 테이블
- 가입한 회원의 정보 관리
- 마지막 수정일자 컬럼으로 고객 문의 및 비밀번호 변경주기 알림을 고려
- 탈퇴여부(Y, N)컬럼으로 재가입에 대한 상황도 고려하여 구현

<hr>
<h2>기능 설명</h2>

1. 이미지 등록
- 이미지 등록은 최대 3장까지 가능
- 이미지 미리보기 가능
- 이미지 우측 상단의 붉은 ‘x’ 클릭 시, 특정 사진만 삭제 가능

2. 텍스트 등록
- 최대 텍스트 제한 기능
- Input 컴포넌트 우측 하단에 (현재 글자수/최대글자수) 표시 구현
<hr>
<img width="349" alt="image" src="https://github.com/baehyunjun97/cocktail/assets/110373230/8741c429-a190-4df8-80ab-f61db7aed82e"><br>

3. 검색 기능
- fetch API 를 통한 검색어 입력 시 입력값을 통한(like 기능) 검색.
- 이미 선택한 재료는 선택 불가하며, 검색어가 없을 경우 전체 재료를 5개씩 페이지네이션하여 출력.
- 결과값을 선택시 onClick 이벤트를 걸어, 해당 재료의 No와 Name 값을 FormData에 저장.
- 재료 등록 검색 중, 이미 선택된 재료의 경우 color를 red로 변경 및 선택할 수 없도록 처리.

<hr>

4. 재료 추가 기능
- 재료/용량/단위가 모두 값이 입력되지 않으면 재료의 추가는 불가하도록 설정
- 재료를 입력하지 않고 submit 시도 시 Alert 발생

5. 재료 삭제 기능
- 이미 선택한 재료를 삭제하는 기능.
- 첫 번째 재료는 삭제할 수 없도록 설정

6. 칵테일 등록 기능
- 레시피 등록 클릭 시 submit 진행. 그 외 Enter 입력 등으로는 submit이 발생하지 않도록 event.preventdefault() 설정
- 등록 완료 후 submit 진행 시, Back-End 에서 각 재료의 용량과 알코올 도수를 받아, 칵테일의 도수를 계산해 주는 로직 개발.
