# payhere 과제전형

## 1.프로젝트 정보
### 설명
> 고객은 내가 자주 가는 GitHub의 Public Repository의 Issue들을 모아서 보고 싶다.
찾아보니 GitHub에서 Open API를 제공하기 때문에, 이를 활용해서 개발할 수 있다.
자세한 요구사항은 다음과 같다. 

### 요구 사항
1. [x] 검색창에 Repository명을 입력해서 Repository를 검색할 수 있다.
2. 검색된 Public Repository를 등록할 수 있다.
    - [x] 등록 개수는 최대 4개로 제한하며, 최대 개수 초과 등록 시 이를 사용자에게 알려준다.
    - [x] 웹은 LocalStorage 로컬 저장소를 활용한다. (웹)
3. [x] 등록된 Repository를 삭제할 수 있다.
4. [x] 등록된 각각의 Public Repository의 issue를 한 페이지에서 모아서 볼 수 있다.
    - [x] 각 issue 마다 제목, Repository 명은 필수로 표현되어야 한다. 그 이외의 데이터 중 필요하다고 생각되는 부분은 추가한다.
    - [x] 해당 issue를 클릭하면 Github의 상세 페이지로 이동할 수 있다.
    - [x] 페이지네이션을 통해서 계속해서 issue를 모아서 볼 수 있다. 
### 프로젝트 이슈 사항 및 고민했던 점
1. github api 고유 이슈사항
   - queryString에 page 값을 1000 이상을 넣으면 아래와 같이 reponse를 반환해서, 오류가 발생하는데 페이지를 1000페이지까지 조회하게 할까 고민을 하다 제출 기한떄문에 일단 그대로 수행하기로 했습니다.
``` json
documentation_url: "https://docs.github.com/v3/search/"
message: "Only the first 1000 search results are available"
```

2. 코드 재사용성 및 컴포넌트화에 대한 고민
   - *`components/common` 폴더안에 있는 탭과 테이블에 대해 공통 컴포넌트로 만들기 위해 props에 어떤 값을 넣어야 다른사용자들이 편하게 사용할수있을까?* 에 대한 고민을 했습니다.
3. 랜더링 최적화
   - 과제 수행중 rendering이 무한으로 되버려 브라우져가 뻗는 현상이 종종 발생하여 그 동안 `useEffect`에 대해 잘 몰랐는데, 이번에 찾아보면서 조금이나마 알게 되었습니다. 

4. UI/UX고려
   - 이번에 리엑트 개발을 하면서 새로운 UI Framework를 활용해보았는데, 전체적으로 조금 밋밋하다는 생각이 들었습니다. 그리고 *Repo입력 Field나 사용자가 저장한 Repository 목록을 보여주는등의 ux가 사용자가 편하게 쓸 수 있을까?* 에 대해 고민을 많이 해보았습니다.
## 2.프로젝트 설정 및 실행

### 1. 프로젝트 복제
> git clone https://github.com/awdsza/payhere-assignment.git


### 2.npm 패키지 받기
>cd assignment  
>npm install

### 3.과제 실행
터미널에서 `assignment`경로로 들어가 `npm start`을 통해 실행 후 브라우져 주소창에 `localhost:3000`을 입력하여 실행.
