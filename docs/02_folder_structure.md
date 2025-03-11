###### <div style="text-align: right;">📅 문서 업데이트: 2025-03-11</div>

<br><br>

## 📌 Git 브랜치 구조

- `main`: 주 코드 브랜치입니다.

<br><br>

## 📌 폴더 및 코드 구조

<br>

### 프로젝트 디렉토리 구조

```
> build                  # 빌드된 파일들이 위치하는 디렉토리 (배포용 파일)
> docs                   # 프로젝트 문서 폴더
> node_modules           # 프로젝트에서 사용하는 모든 외부 의존성 라이브러리
> public                 # 정적 파일 폴더 (HTML, 이미지 등)
> src                    # 소스 코드 폴더 (주로 React 컴포넌트 및 로직)
package.json             # 프로젝트 메타데이터, 의존성 및 npm 스크립트 정의
package-lock.json        # npm 패키지 잠금 파일 (의존성 버전 고정)
tsconfig.json            # TypeScript 설정 파일
README.md                # 프로젝트 실행 관련 설명
```

📂 node_modules : 로컬 환경에서 `npm install`을 실행하면 자동으로 생성됩니다. 이 디렉토리는 GitHub 소스에는 포함되지 않으며, `.gitignore`에 자동으로 추가되어 버전 관리 대상에서 제외됩니다.

<br><br>

### 주요 디렉토리 설명

#### **1. `build/`**

- 빌드된 파일들이 위치하는 디렉토리입니다. `npm run build` 명령어로 생성된 최적화된 배포용 파일들이 포함됩니다. 이 파일들은 실제 서버나 클라우드 환경에 배포됩니다.
- **주요 파일**

  - **`asset-manifest.json`** : 애플리케이션에서 사용하는 모든 정적 자원 파일들의 맵핑 정보를 포함한 JSON 파일입니다. 캐싱 및 파일 버전 관리를 위해 사용됩니다.

  - **`favicon.ico`** : 웹 애플리케이션의 파비콘 파일입니다.(브라우저 탭에 표시되는 작은 아이콘)

  - **`index.html`** : 애플리케이션의 진입점이 되는 HTML 파일입니다. 이 파일 내에 빌드된 JavaScript 파일들이 로드되어 애플리케이션이 실행됩니다.

  - **`ictk-bg.png`, `ictk-logo.png`** : 애플리케이션에서 사용되는 배경 및 로고 이미지 파일

  - **`manifest.json`** : 웹 애플리케이션의 메타데이터를 포함한 JSON 파일로, Progressive Web App(PWA)으로 작동하기 위한 설정들이 포함됩니다. 아이콘, 앱 이름, 시작 URL 등이 정의되어 있습니다.

  - **`robots.txt`** : 검색 엔진 크롤러에게 어떤 페이지를 크롤링할지 또는 하지 말지를 안내하는 파일입니다. 이를 통해 SEO 관리나 크롤링 제어가 가능합니다.

  - **`static/`** : 정적 자원들이 저장되는 디렉토리입니다. 최적화된 CSS, JavaScript, 이미지 및 기타 미디어 파일들이 포함됩니다.
    - **하위 파일**
    - **`css/`** : 빌드된 CSS 스타일 파일들이 저장되는 폴더입니다.
    - **`js/`** : 빌드된 JavaScript 파일들이 저장되는 폴더입니다.
    - **`media/`** : 애플리케이션에서 사용하는 정적 미디어 파일(이미지, 아이콘, 폰트 등)이 저장되는 폴더입니다.

<br><br>

#### **2. `docs/`**

- 프로젝트 관련 문서를 보관하는 폴더입니다. 이 폴더 내에는 프로젝트 설명, API 문서, 배포 절차 등 프로젝트 진행에 필요한 다양한 문서들이 포함됩니다.

    - **주요 파일**

    - **`01_project_overview.md`** : 프로젝트의 전반적인 개요
    - **`02_folder_structure.md`** : 디렉토리 및 코드 구조
    - **`03_core_features.md`** : 주요 기능 및 로직
    - **`04_api_guide.md`** : API 통신 및 데이터 관리
    - **`05_deployment.md`** : 빌드 및 배포 관련 정보
    - **`06_debugging.md`** : 디버깅

<br><br>

#### **3. `node_modules/`**

- 프로젝트에서 사용하는 모든 외부 의존성 라이브러리가 위치하는 폴더입니다. `npm install`을 실행하면 `package.json`에 정의된 의존성 라이브러리가 자동으로 설치되어 이 폴더에 저장됩니다.
- **주의사항**: 이 디렉토리는 GitHub 소스에 포함되지 않으며, `.gitignore`에 추가되어 버전 관리 대상에서 제외됩니다.

<br><br>

#### **4. `public/`**

- 정적 파일들이 위치하는 폴더입니다. 이 폴더 내의 파일들은 웹 애플리케이션에서 정적 자원으로 사용됩니다. 보통 `index.html`, 이미지, 아이콘, 폰트 파일 등이 포함됩니다.
- **주요 파일**: `index.html`, `favicon.ico`, `manifest.json` 등

<br><br>

#### **5. `src/`**

- 소스 코드 폴더로, 프로젝트의 주요 로직과 컴포넌트들이 위치하는 디렉토리입니다. React 컴포넌트, 스타일 파일, 유틸리티 함수 등 애플리케이션의 핵심 코드가 여기에 포함됩니다.
- **주요 하위 폴더**:

  - `components/`: UI 컴포넌트들이 위치하는 폴더
  - `customHooks/`: 자주 사용되는 로직을 캡슐화한 사용자 정의 훅
  - `mockData/`: API와의 실제 연결 전에 페이지 구성을 위해 가짜 데이터를 제공
  - `pages/`: 각 페이지 컴포넌트와 그 페이지에서 사용하는 하위 컴포넌트
  - `recoil/`: Recoil 상태 관리 라이브러리 관련 파일
  - `styles/`: 컴포넌트별 세부 스타일
  - `utils/`: 재사용 가능한 유틸리티 함수
  - `App.css`: `App.tsx` 컴포넌트에서 사용하는 스타일 시트 파일입니다. 전역적인 스타일을 정의하는데 사용됩니다.
  - `App.test.tsx`: `App.tsx` 컴포넌트에 대한 유닛 테스트를 포함하는 파일입니다. React Testing Library 등을 사용하여 컴포넌트가 예상대로 동작하는지 테스트합니다.
  - `App.tsx`: 애플리케이션의 최상위 컴포넌트입니다. 다른 컴포넌트를 포함하고, 전체 애플리케이션의 뷰를 구성합니다.
  - `index.css`: 애플리케이션 전반에 적용되는 기본 스타일 시트입니다.
  - `index.tsx`: React 애플리케이션의 진입점(entry point)입니다. `ReactDOM.render()`를 호출하여 `App.tsx` 컴포넌트를 HTML로 렌더링합니다.
  - `react-app-env.d.ts`: TypeScript가 React 애플리케이션에서 사용하는 환경 변수와 전역 타입을 정의하는 파일입니다.
  - `setupTests.ts`: 테스트 환경 설정을 위한 파일입니다. Jest 및 React Testing Library와 같은 테스트 라이브러리를 설정하는 데 사용됩니다.
  - `reportWebVitals.ts`: 웹 성능 측정과 관련된 파일

<br><br>

#### **6. `package.json`**

- 프로젝트 메타데이터 파일로, 프로젝트 이름, 버전, 의존성 라이브러리, npm 스크립트 등을 정의합니다. 이 파일을 통해 프로젝트의 의존성 관리와 빌드 스크립트 등을 설정합니다.
  - **주요 항목**: `dependencies`, `devDependencies`, `scripts` 등

<br><br>

#### **7. `package-lock.json`**

- 프로젝트 의존성의 정확한 버전 정보를 기록하는 파일입니다. 이 파일을 통해 팀원들이 동일한 의존성 버전을 사용하도록 보장합니다. `npm install`을 실행할 때 의존성 버전을 고정하는 역할을 합니다.

<br><br>

#### **8. `tsconfig.json`**

- TypeScript 설정 파일로, TypeScript 컴파일러 옵션을 정의합니다. 이 파일을 통해 프로젝트에서 사용하는 TypeScript의 설정, 경로, 모듈 해석 등을 제어할 수 있습니다.

<br><br>

#### **9. `README.md`**

- 프로젝트의 실행 방법

<br><br>

### 코드 구조

#### **1. 개요**

이 프로젝트는 Recoil을 활용한 상태 관리와 비동기 API 호출을 포함하는 React + TypeScript 기반 애플리케이션입니다.
코드는 UI 컴포넌트, 상태 관리, 비동기 로직, 유틸리티 함수 등의 역할에 따라 폴더별로 나누어져 있습니다.

```
/src
  ├── /components             # 재사용 가능한 UI 컴포넌트들 (예: 버튼, 입력 필드 등)
  ├── /customHooks            # 자주 사용되는 로직을 캡슐화한 사용자 정의 훅
  ├── /mockData               # API와의 실제 연결 전에 페이지 구성을 위해 가짜 데이터를 제공
  ├── /pages                  # 각 페이지 컴포넌트와 그 페이지에서 사용하는 하위 컴포넌트
  ├── /recoil                 # Recoil 상태 관리 라이브러리 관련 파일
  ├── /styles                 # 컴포넌트별 세부 스타일
  ├── /utils                  # 재사용 가능한 유틸리티 함수
  ├── App.css                 # `App.tsx` 컴포넌트에서 사용하는 스타일 시트 파일
  ├── App.test.tsx            # `App.tsx` 컴포넌트에 대한 유닛 테스트
  ├── App.tsx                 # 애플리케이션의 최상위 컴포넌트
  ├── index.css               # 애플리케이션 전반에 적용되는 기본 스타일 시트
  ├── index.tsx               # React 애플리케이션의 진입점(entry point)
  ├── react-app-env.d.ts      # TypeScript가 React 애플리케이션에서 사용하는 환경 변수와 전역 타입을 정의
  ├── setupTests.ts           # 테스트 환경 설정을 위한 파일
  └── reportWebVitals.ts      # 웹 성능 측정과 관련된 파일

```

<br><br>

#### **2. 코드 구조 상세 설명**

1. 컴포넌트 (UI) - `/components`

   - 재사용 가능한 UI 컴포넌트들이 위치합니다.
   - 버튼, 입력 필드 등의 프레젠테이션 컴포넌트가 주로 포함됩니다.
   - 모달, 공통 테이블, 페이지네이션, 반복되는 레이아웃 등을 포함합니다.
   - Styled Components를 사용해 스타일링을 매뉴얼로 조정했습니다.

<br><br>

2. 자주 사용되는 로직을 캡슐화한 사용자 정의 훅(Hook) - `/customHooks`

   - 각 훅(Hook)은 특정 기능을 독립적으로 처리할 수 있도록 설계되어, 코드 재사용성을 높이고, 컴포넌트에서 복잡한 로직을 분리하여 더 깔끔하고 유지보수 가능한 코드를 작성할 수 있게 합니다.

    <br>

   - `useList` 훅(Hook)을 만든 이유는 목록 데이터를 처리하는 과정에서 발생할 수 있는 반복적인 API 호출과 파라미터 실수를 줄이기 위해서입니다. 기존에는 파라미터를 수동으로 변경하면서 API를 호출했는데, 이 과정에서 실수가 발생하거나 코드가 중복되는 경우가 많았습니다. `useList` 훅을 사용하면 파라미터 값을 쉽게 관리하고 필요한 기능들을 재사용할 수 있어 효율적이고 안정적으로 목록 데이터를 처리할 수 있습니다.

    <br>

   - 주요 기능

     - 페이징: 페이지 번호를 변경하고, 해당 페이지에 맞는 데이터를 가져옵니다.
     - 정렬: 목록 항목을 클릭하여 정렬 순서를 변경하고, 정렬된 데이터를 불러옵니다.
     - 검색: 입력한 텍스트로 목록을 필터링하여 검색 기능을 구현합니다.
     - 새로고침: 데이터를 새로 고침하여 최신 상태를 가져옵니다.

    <br>

   - `useList` 사용자 훅(Hook) 구현

        ```tsx
        export const useList = (
            itemsPerPage: number, // 한 페이지에 표시할 항목 수
            params: FetchListParams, // 목록 조회에 필요한 파라미터
            setParams: (
            value:
                | FetchListParams
                | ((prevState: FetchListParams) => FetchListParams)
            ) => void, // 파라미터 상태를 업데이트하는 함수
            fetchList: Function // 실제 목록 데이터를 가져오는 API 호출 함수
        ) => {
            const [sortOption, setSortOption] = useState({
            key: params.sortKeyName,
            order: params.order,
            });
            const [currentPage, setCurrentPage] = useState(1);

            // 페이지 변경 처리 함수
            const handlePageChange = (page: number) => {
            setCurrentPage(page);

            // 새 파라미터 객체 생성 후, API 호출 및 상태 업데이트
            const newParams = { ...params, startNum: (page - 1) * itemsPerPage };
            fetchList(newParams);
            setParams(newParams); // 상태 업데이트
            };

            // 정렬 처리 함수
            const handleSort = (headerKey: string) => {
            const newOrder =
                sortOption.key === headerKey
                ? sortOption.order === "ASC"
                    ? "DESC"
                    : "ASC"
                : "ASC";
            const newParams = {
                ...params,
                sortKeyName: headerKey,
                order: newOrder,
                startNum: 0,
            };

            setSortOption({ key: headerKey, order: newOrder });
            fetchList(newParams);
            setParams(newParams); // 상태 업데이트
            };

            // 검색 처리 함수
            const handleSearch = (searchText: string) => {
            const newParams = { ...params, filter: searchText, startNum: 0 };
            fetchList(newParams);
            setParams(newParams); // 상태 업데이트
            };

            // 새로 고침 처리 함수
            const handleRefresh = () => {
            const newParams = {
                ...params,
                filter: null,
                startNum: 0,
                sortKeyName: "created_at",
                order: "DESC",
            };
            fetchList(newParams);
            setParams(newParams); // 상태 업데이트
            };

            return {
            sortOption,
            currentPage,
            handlePageChange,
            handleSort,
            handleSearch,
            handleRefresh,
            };
        };
        ```

    <br>

   - `useList` 활용 예시:

        ```tsx
        import { useList } from "../hooks/useList"; // useList 훅 import
        import { FetchListParams } from "../utils/types";
        import { fetchUserList } from "../api"; // API 호출 함수
        import { setRecoilData, setError } from "../state"; // 상태 관리

        const User = () => {
            const itemsPerPage = 10; // 페이지당 항목 수 설정

            // 목록 조회에 필요한 초기 파라미터
            const [params, setParams] = useState<FetchListParams>({
            isHeaderInfo: true,
            rowCnt: itemsPerPage,
            startNum: 0,
            sortKeyName: "created_at",
            order: "DESC",
            });

            // API 호출 함수 정의
            const fetchListData = async ({
            isHeaderInfo,
            rowCnt,
            startNum,
            sortKeyName,
            order,
            filter,
            filterArrAndOr,
            filterArr,
            }: FetchListParams) => {
            const result = await fetchUserList({
                isHeaderInfo,
                rowCnt,
                startNum,
                sortKeyName,
                order,
                filter,
                filterArrAndOr,
                filterArr,
            });

            if (result?.body) {
                setRecoilData(result); // 성공적인 응답 처리
            } else {
                setError(result?.error); // 오류 처리
            }
            };

            // useList 훅을 활용하여 페이지 변경, 정렬, 검색, 새로 고침 기능을 처리
            const {
            sortOption,
            handleSort,
            currentPage,
            handlePageChange,
            handleRefresh,
            handleSearch,
            } = useList(itemsPerPage, params, setParams, fetchListData);

            // 컴포넌트 마운트 시 최초 API 호출
            useEffect(() => {
                fetchListData(params);
            }, []); // params가 변경되지 않으면 최초 호출만 실행

            return (
                <Card>
                    <DynamicTable
                        headers={headers}
                        data={data}
                        keyName={keyName}
                        checkbox={true}
                        headerInfos={headerInfos}
                        sortOption={sortOption}
                        handleSort={handleSort}
                        height="400px"
                    />

                    {totCnt !== null && totCnt > 0 && (
                    <div style={{ padding: "10px 10px" }}>
                        <Pagination
                            currentPage={currentPage}
                            totCnt={totCnt}
                            itemsPerPage={itemsPerPage}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                    )}
                </Card>
            );
        };
        ```

   - `useWebSocket.ts`: 웹소켓 연결 및 메시지 처리 로직을 다루는 훅입니다. 실시간 데이터를 처리하는 데 사용됩니다.

<br><br>

3. API 호출 및 상태 관리 유틸리티 함수들 - `/recoil/atoms/`

   - 반복적인 부분을 utility로 분리하고, Recoil을 이용한 전역 상태 관리와 비동기 API 호출을 연결하여 코드의 효율성과 유지 보수성을 높이고자 했습니다.

   - `customApiRequest`: 비동기 API 호출 처리 함수

   - `customCreateAtom`: 동적 Recoil 상태 관리 함수 (**key**와 defaultValue 값을 매개변수로 받아, 사용자가 원하는 상태 이름과 초기값을 동적으로 설정)

   - `customCreateAtom`와 `customApiRequest` 사용 예시: 

        ```tsx
            import { customCreateAtom } from "../../utils/customCreateAtom";
            import { customApiRequest } from "../../utils/customApiRequest";

            export const workListAtom = customCreateAtom("workList");

            export const fetchWorkList = async (body: { [key: string]: any }) => {
                const url = "/work/list";
                const trId = process.env.REACT_APP_TRID_WORK_LIST!;
                return customApiRequest(url, trId, body);
            };
        ```

    <br>

   - `fetchWorkList` 예시 코드 (React Component 예시):

        ```tsx
            import { workListAtom, fetchWorkList } from "../../recoil/atoms/work";
            import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";

            const Work: React.FC = () => { 
            // Recoil state setter와 getter
            const setWorkList = useSetRecoilState(workListAtom);
            const workListRecoilData = useRecoilValue(workListAtom);
            const selectedRow = useRecoilValue(selectedRowAtom);
            const [tabState, setTabState] = useRecoilState(tabStateAtom);

            // API 호출을 위한 함수
            const fetchListData = async ({
                isHeaderInfo,
                rowCnt,
                startNum,
                sortKeyName,
                order,
                filter,
                filterArrAndOr,
                filterArr,
            }: FetchListParams) => {
                const result = await fetchWorkList({
                    isHeaderInfo,
                    rowCnt,
                    startNum,
                    sortKeyName,
                    order,
                    filter,
                    filterArrAndOr,
                    filterArr,
                });

                // 결과에 따라 Recoil 상태 업데이트
                if (result?.body) {
                    setWorkList(result);
                } else {
                    setError(result?.error);
                }
            };

            // 컴포넌트에서 fetch 호출 예시 (예: 데이터 로딩 시 호출)
            useEffect(() => {
                const params = {
                    isHeaderInfo: true,
                    rowCnt: 10,
                    startNum: 0,
                    sortKeyName: "created_at",
                    order: "DESC",
                    filter: null,
                    filterArrAndOr: "AND",
                    filterArr: [],
                };
                fetchListData(params);
            }, []);
            }
        ```

    <br>

   - 💡`fetchListData`를 `async`로 호출하는 이유: 
    - **fetchListData**에서 `fetchWorkList`를 호출하고, `fetchWorkList`는 다시 `customApiRequest`를 호출하는데 이 함수들이 비동기적으로 처리되므로, await을 사용하여 데이터가 준비될 때까지 기다려야 합니다.

    - **await**는 비동기 작업의 결과를 기다리기 위해 사용합니다. 만약 await을 사용하지 않으면, `fetchWorkList`에서 반환된 Promise가 즉시 반환되어 후속 코드가 동기적으로 실행되므로, 비동기 데이터 처리가 완료되기 전에 setWorkList와 같은 상태 업데이트 함수가 실행될 수 있습니다.


