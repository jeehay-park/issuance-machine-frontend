###### <div style="text-align: right;">📅 문서 업데이트: 2025-03-11</div>

<br><br>

## 📌 주요 기능 및 로직

- 로그인 기능을 구현하여, 사용자 인증 및 관리 (다 구현하지는 못했어요...)
- 데이터 목록을 표시하며, 항목 추가, 수정, 삭제 기능을 통해 데이터를 관리
- 새로운 항목 추가 시에는 폼 입력을 활용하여 데이터를 입력
- 대시보드 및 데이터 시각화

<br><br>

### 주요 기능

- 대시보드: 장비의 상태와 작업 진행 상황을 실시간으로 확인

- 작업화면: 작업 목록 조회 및 관리

- 프로그램 정보: 장비의 프로그램 상태와 관련 정보 확인

- 시리얼 넘버 규칙: 시리얼 넘버 규칙 설정 및 관리

- 발급 설정 정보:

  - 프로파일 Config
  - 키발급코드 Config
  - 스크립트 Config

- 발급 기계 정보: 발급 기계의 상태 및 세부 정보 조회

- 코드 정보: 발급된 코드에 대한 세부 정보를 조회하고 관리

- 사용자 정보: 제한된 사용자만 관리자 페이지에 접근하도록 관리

<br><br>

### 기능별 상세 내용

- `C:\Users\박지혜\Desktop\ICTK 발급장비_화면설계서_20250306_v0.1.2_JH.pptx` 참조

<br><br>

#### 로그인 과정: challenge와 request 흐름

- 로그인 챌린지 요청: userId를 사용해 서버에 첫 번째 요청을 보냄
- 패스워드 해싱: 응답에서 salt와 uuid를 받아서 비밀번호를 해시화
- 로그인 요청: 해시화된 비밀번호와 함께 로그인 요청을 보냄
- 오류 처리: 각 요청에서 오류가 발생하면 이를 처리하고, 오류 메시지를 반환

  ```ts
  // 사용자 로그인 함수
  export const login = async (body: { userId: string; password: string }) => {
    try {
      // 로그인 챌린지 요청
      const challengeData = {
        header: { trId: process.env.REACT_APP_TRID_USER_LOGIN_CHALLENGE! },
        body: { userId: body.userId },
      };
      const { data: challengeResponse } = await customAxios.post(
        "/user/login/    challenge",
        challengeData
      );

      if (challengeResponse?.header?.rtnCode !== "000000")
        throw { customError: true, payload: challengeResponse };

      // 패스워드 해싱
      const { salt, uuid } = challengeResponse.body;
      const passwordHash = hashSHA512(
        uuid + hashSHA512(body.password + salt)
      ).toString();

      // 로그인 요청
      const requestData = {
        header: { trId: process.env.REACT_APP_TRID_USER_LOGIN_REQUEST! },
        body: { userId: body.userId, passwordHash, uuid },
      };
      const { data: loginResponse } = await customAxios.post(
        "/user/login/request",
        requestData
      );

      if (loginResponse?.header?.rtnCode !== "000000")
        throw { customError: true, payload: loginResponse };

      return loginResponse;
    } catch (err: any) {
      // 오류 처리
      return err.customError
        ? err.payload
        : err.response?.data || {
            error: { url: "로그인", message: err.message ?? "Unknown error" },
          };
    }
  };
  ```

<br><br>

- 로그인 challenge 요청 응답값 예시

  ```json
  // Request URL: http://localhost:17777/ictk/issue/admin/user/login/challenge

  // 요청
  {"header":{"trId":"500701"},"body":{"userId":"admin"}}

  //응답
  {
      "header": {
          "trId": "500701",
          "rtnCode": "000000",
          "rtnMessage": "성공"
      },
      "body": {
          "salt": "9db1c12c-fadd-47e5-89e3-9ef04ce08550",
          "uuid": "35f519c1-ba6c-4f6d-afc1-448e2469519c"
      }
  }
  ```

<br><br>

- 로그인 request 요청 응답값 예시

  ```json
  // Request URL: http://localhost:17777/ictk/issue/admin/user/login/request

  // 요청
  {"header":{"trId":"500702"},"body":{"userId":"admin","passwordHash":"acfa88e44a06dd29b9516be43e226fac845e9afff5054435f68ac405164f1e8680526fed05ba14139cf7284b1c039a68e7c5eddb8cf327f40eb09ed811e5f2d7","uuid":"35f519c1-ba6c-4f6d-afc1-448e2469519c"}}

  // 응답
  {
      "header": {
          "trId": "500702",
          "rtnCode": "000000",
          "rtnMessage": "성공"
      },
      "body": {
          "sessionId": "7c4ef988-bea0-48fe-b66f-f73d935372ab",
          "token": {
              "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlzcyI6IklDVEsiLCJpYXQiOjE3NDE2ODE4MzAsImV4cCI6MTc0MTY4NTQzMCwic2Vzc2lvbklkIjoiN2M0ZWY5ODgtYmVhMC00OGZlLWI2NmYtZjczZDkzNTM3MmFiIn0.ShBJrtZUKzsF5SGA4_I34CyPNSegqeAzMKvWZjpDRaI",
              "expiry": 3600,
              "expirationTime": 1741681830
          },
          "sessionKey": "40f45f22-3ea3-406e-adfb-67aa48f68297",
          "userInfo": {
              "userId": "admin",
              "name": "admin",
              "email": "jhpark@ictk.com"
          }
      }
  }
  ```

<br><br>

#### 2. `App.tsx` - 전체적인 라우팅 구조

- `App.tsx`에서는 `React Router`를 사용하여 페이지 네비게이션을 관리합니다.
- `Layout` 컴포넌트는 애플리케이션의 공통 레이아웃을 구성하며, 사이드바와 메인 콘텐츠 영역을 포함합니다. 이 레이아웃은 애플리케이션의 다양한 페이지에서 공통적으로 사용되며, 사용자의 대시보드나 다른 페이지로 쉽게 탐색할 수 있도록 도와줍니다.

  ```tsx
  <Route element={<Layout />}>
    <Route path={sidebarContents.dashboard.path} element={<Dashboard />} />
    <Route path={sidebarContents.work.path} element={<Work />} />
    <Route path={sidebarContents.codeinfo.path} element={<CodeInfo />} />
  </Route>
  ```

<br><br>

#### 3. `Layout.tsx` - 공통 레이아웃을 구성

- 주요 구성 요소:

- 사이드바 (Sidebar):

  - isSidebarExpanded 상태를 기반으로 사이드바의 확장 여부를 관리합니다.
  - 사이드바에는 ictk-logo.png 로고와 함께 사이드바 확장/축소 버튼이 있습니다.
  - toggleSidebar 함수를 호출하여 사이드바를 확장하거나 축소할 수 있습니다.

- 메인 콘텐츠 영역 (MainContent):

  - 이 영역은 헤더와 콘텐츠를 포함합니다.
  - 헤더 (Header)는 우측에 사용자의 프로필 이미지를 표시하고, 클릭 시 드롭다운 메뉴가 열립니다.
  - 드롭다운 (Dropdown) 메뉴는 사용자 계정 정보와 로그아웃 옵션을 제공합니다.
  - toggleDropdown 함수를 사용하여 드롭다운 메뉴의 표시 여부를 제어합니다.

- `Outlet`:

  - `Outlet`은 `react-router-dom`의 기능을 사용하여 라우팅된 컴포넌트를 이 위치에 렌더링합니다.
  - 예를 들어, 대시보드, 작업 관리, 코드 정보 등의 페이지가 이곳에 렌더링됩니다.

  ```tsx
  return (
    <Container isExpanded={isSidebarExpanded}>
      <Sidebar isExpanded={isSidebarExpanded}>
        <div
          style={{ display: "flex", justifyContent: "center", padding: "1rem" }}
        >
          <img
            src="ictk-logo.png"
            alt="Logo"
            width="80px"
            style={{ borderRadius: "10px", cursor: "pointer" }}
            onClick={goToDashboard}
          />
        </div>

        <div style={{ display: "flex", padding: "1rem" }}>
          <img
            src={isSidebarExpanded ? chevronLeft : chevronRight}
            alt="Chevron"
            width="25px"
            style={{ borderRadius: "5px" }}
            onClick={toggleSidebar}
          />
        </div>

        {text}
      </Sidebar>

      <MainContent>
        <Header>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <img
              src={id}
              alt="Profile"
              width="35px"
              style={{ borderRadius: "10px", cursor: "pointer" }}
              onClick={toggleDropdown}
            />
          </div>
          <Dropdown isVisible={isDropdownVisible}>
            <DropdownItem>계정 정보</DropdownItem>
            <DropdownItem>로그 아웃</DropdownItem>
          </Dropdown>
        </Header>

        <Outlet />
      </MainContent>
    </Container>
  );
  ```

<br><br>

![기본 레이아웃 ](layout.png)

<br><br>

#### Modal - API 요청 결과 처리

- API 요청 성공/실패 여부에 따라 모달을 띄워 사용자에게 피드백을 제공합니다.

- 모달마다 콘텐츠 크기가 다르기 때문에, 모달이 열릴 때 콘텐츠 크기에 맞춰 너비와 높이가 결정됩니다.

- 이후 응답 결과에 따라 메시지만 동적으로 교체되도록 구성하였습니다.

- 💡 기존 프로젝트(KMS 또는 IDaaS)에서는 모달이 닫히고 응답 결과(성공 또는 오류)를 표시하는 새로운 모달이 열렸으나, 이번에는 불필요한 동작을 줄이기 위해 동일한 모달 안에서 콘텐츠만 동적으로 변경되도록 구현했습니다.

<br><br>

#### Modal 구조 및 작동 방식

- 모달 트리거: `<div onClick={openModal}>{children}</div>`로, `children`을 통해 버튼이나 다른 요소에서 모달을 열 수 있습니다.

- 모달 열기/닫기: openModal과 closeModal 함수를 통해 모달의 열고 닫을 수 있습니다.

- API 요청 결과 처리: responseMessage 상태를 이용해 API의 성공/실패 메시지를 보여줍니다.

- 폼 내용: 폼 입력은 input 태그를 통해 간단히 처리합니다.

- 모달 푸터: "취소"와 "확인" 버튼을 사용하여 모달을 닫거나 데이터를 제출할 수 있습니다.

```tsx
const AddCodeInfo: React.FC<{
  children: ReactNode;
  handleRefresh: () => void;
}> = ({ children, handleRefresh }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const openModal = () => {
    setModalOpen(true);
    setResponseMessage(null); // 초기화
  };

  const closeModal = () => {
    setModalOpen(false);
    setResponseMessage(null); // 초기화
  };

  return (
    <>
      {/* 모달 열기 트리거 */}
      <div onClick={openModal}>{children}</div>

      {/* 모달 배경 및 내용 */}
      <ModalBackground isVisible={isModalOpen}>
        <ModalContainer width="600px">
          <ModalHeader>
            <h3>코드 정보 추가</h3>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
          </ModalHeader>

          <ModalContent>
            {responseMessage ? (
              <p>{responseMessage}</p> // API 응답 결과 표시
            ) : (
              <form>
                <input type="text" placeholder="코드 이름" />
                <input type="text" placeholder="코드 그룹" />
                <input type="text" placeholder="상세 설명" />
              </form>
            )}
          </ModalContent>

          {/* 모달 푸터 */}
          <ModalFooter>
            <button onClick={closeModal}>취소</button>
            <button onClick={() => setResponseMessage("성공 메시지")}>
              확인
            </button>
          </ModalFooter>
        </ModalContainer>
      </ModalBackground>
    </>
  );
};
```

<br>

- `CodeInfo.tsx` 사용 예시

```tsx
<AddCodeInfo handleRefresh={handleRefresh}>
  <Button>추가</Button>
</AddCodeInfo>
```

####

<br><br><br>

#### Dynamic Table 구조 및 작동 방식

- 동적 헤더와 데이터 렌더링: headers와 keyName 배열을 기반으로 동적으로 테이블의 컬럼과 데이터를 렌더링합니다.

- 상태 관리: 행 선택 상태를 Recoil 상태로 관리하고, 각 행 클릭 시 선택된 행을 토글하여 글로벌 상태를 업데이트합니다.

- 정렬 기능: 특정 열에 대해 정렬 아이콘을 제공하고, 해당 열을 클릭하여 데이터를 오름차순/내림차순으로 정렬합니다.

- 링크와 동적 콘텐츠: 특정 값(work_no 등)에 클릭 이벤트를 설정하여 별도의 작업을 수행하거나 페이지를 이동하도록 구현됩니다.

    ```tsx
    const DynamicTable: React.FC<TableProps> = ({
        headers,
        data,
        keyName,
        checkbox,
        height,
        handleAddTab,
        sortOption,
        handleSort,
    }) => {
    const [checkedRow, setCheckedRow] = useState<dynamicObject | null>(null);
    const setSelectedRowState = useSetRecoilState(selectedRowAtom);
    const selectedRow = useRecoilValue(selectedRowAtom);

    const handleRowClick = (row: rowType) => {
        if (selectedRow === row) {
            setCheckedRow(null);
            setSelectedRowState(null);
        } else {
            setCheckedRow(row);
            setSelectedRowState(row);
        }
    };

    return (
        <div style={{ height: height || "400px", overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
            <tr>
                {checkbox && <th>선택</th>}
                {headers.map((header, index) => (
                <th key={index}>
                    <div>{header.name}</div>
                    {header.sort && (
                    <span onClick={() => handleSort(header.keyName)}>
                        {sortOption?.key === header.keyName && sortOption?.order === "ASC" ? "▲" : "▼"}
                    </span>
                    )}
                </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                {checkbox && (
                    <td onClick={() => handleRowClick(row)}>
                    <input type="checkbox" checked={selectedRow === row} />
                    </td>
                )}
                {keyName.map((keyNameItem, colIndex) => (
                    <td key={colIndex}>
                    {keyNameItem === "work_no" && handleAddTab ? (
                        <span onClick={() => handleAddTab(row)}>{row[keyNameItem]}</span>
                    ) : (
                        <span>{row[keyNameItem]}</span>
                    )}
                    </td>
                ))}
                </tr>
            ))}
            {!data?.length && (
                <tr>
                <td colSpan={headers.length}>No data available</td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
    };
    ```


<br><br>


#### 💡 기존 문제점 및 해결을 위한 `useList` 커스텀 훅 도입

- 기존에는 검색, 정렬, 페이지 변경 등 목록 조회를 위해 여러 가지 로직을 컴포넌트 내에서 처리해야 했습니다. 이로 인해 다음과 같은 불편한 점들이 발생했습니다:
    - 상태 관리 중복: 검색어, 정렬 옵션, 페이지 번호 등을 각각 관리해야 했습니다. 이로 인해 코드의 중복이 발생하고, 같은 방식을 여러 곳에서 처리해야 했습니다.

    - 의존성 배열 관리의 어려움: `useEffect`나 `useCallback`을 사용할 때, 여러 파라미터를 상태에 따라 동적으로 변경하면서 의존성 배열을 적절히 관리하는 데 어려움이 있었습니다.


- `useList` 커스텀 훅(Hook) 도입

- 이러한 문제를 해결하기 위해 `useList`라는 커스텀 훅(Hook)을 만들었습니다. 이 훅(Hook)은 검색, 정렬, 페이지 변경 등의 로직을 한 곳에 집중시켜 관리할 수 있도록 도와줍니다. 

- 상태 관리 통합: `useList` 훅(Hook) 내에서 페이지, 정렬, 검색어, 필터 등을 관리할 수 있어, 각 컴포넌트에서 따로 관리할 필요가 없습니다.

- 반복되는 로직 최소화: 데이터를 가져오는 로직(fetchList 호출)을 중앙화하여, 검색, 정렬, 페이지 변경 시 중복 코드를 줄였습니다.

- 의존성 배열 관리 최적화: `useEffect` 및 `useCallback`에서 의존성 배열을 효율적으로 관리할 수 있어 의도치 않은 리렌더링이나 동작을 방지할 수 있습니다.

- 파라미터 변경 및 데이터 갱신: 파라미터(startNum, sortKeyName, order, filter 등)가 변경될 때마다 관련된 상태를 업데이트하고 데이터를 새로 가져오는 로직을 간결하게 처리할 수 있습니다.

