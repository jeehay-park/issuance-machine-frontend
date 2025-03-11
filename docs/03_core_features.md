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




  

<br><br>


#### 2. `App.tsx` - 전체적인 라우팅 구조

- `App.tsx`에서는 `React Router`를 사용하여 페이지 네비게이션을 관리합니다.
- **로그인 관련 페이지**: 로그인, 인증, 비밀번호 변경 등
- **보호된 페이지**: 로그인 후 접근 가능한 대시보드, 사용자 관리, 키관리 등의 전반의 서비스
- 인증된 사용자만 접근 가능한 페이지는 `<ProtectedRoute>`로 감싸서 관리합니다.

```tsx
<Route element={<ProtectedRoute />}>
  <Route path="/home" element={<DashBoard />} />
  <Route path="/user/list" element={<User />} />
  <Route path="/user-group/list" element={<UserGroup />} />
  <Route path="/masterkey/list" element={<MasterKeyList />} />
</Route>
```

<br>

#### 3. `ProtectedRoute.tsx` - 보호된 페이지 접근 관리

- `ProtectedRoute`는 로그인 여부를 검사하고, 인증된 사용자만 특정 경로에 접근할 수 있도록 제한하는 역할을 합니다.

- `SideBar`, `Header` 포함: 모든 보호된 페이지에서 일관된 UI 제공
- `Outlet` 사용: `React Router`의 `<Outlet />`을 이용하여 하위 페이지 렌더링

```js
const auth = useSelector((state) => state.auth?.token);
const storedData = localStorage?.getItem("persist:root");
const accessToken = JSON.parse(storedData);
const storageOption = storageConfig.useSessionStorage
  ? "sessionStorage"
  : "localStorage";

if (storageOption === "sessionStorage" && !auth) {
  return <Navigate to="/" replace />;
}

if (storageOption === "localStorage" && !(accessToken && accessToken.auth)) {
  return <Navigate to="/" replace />;
}

return (
  <>
    <SideBar />
    <Header />
    <Outlet />
  </>
);
```

![기본 레이아웃 ](layout.png)

> ✅ `popUpOpen` 값을 설정하고 변경한 이유

- 중첩된 팝업이 열리면 `z-index` 값이 증가해 다른 UI 요소들 위로 올라가게 되는데, 팝업이 닫힌 후에도 `z-index` 값이 변경되지 않으면 사이드바가 클릭되지 않는 문제가 발생할 수 있습니다. 이를 해결하기 위해 `popUpOpen` 값에 따라 `z-index`를 명시적으로 설정하여 사이드바와 다른 요소들이 올바르게 상호작용할 수 있도록 처리했습니다.

```js
export default function SideBar() {
  const popUpOpen = useSelector((state) => state.history?.isPopUpOpen);

  return (
    <>
      <SideBarContainer style={{ zIndex: popUpOpen ? "0" : "1" }}>
        // 내용 생략
      </SideBarContainer>
    </>
  );
}
```

```js
export default function Header() {
  return (
    <>
      <HeaderBox style={{ zIndex: popUpOpen ? "0" : "1" }}>
        // 내용 생략
      </HeaderBox>
    </>
  );
}
```

<br>

#### Custom PopUp - API 요청 결과 처리

- API 요청 성공/실패 여부에 따라 팝업을 띄워 사용자에게 피드백을 제공합니다.
- 로그인 만료, 성공/실패 메시지 등 여러 팝업이 존재합니다.
- 주요 팝업 종류
  - `ErrorPopUp`: 요청 실패 시
  - `SuccessPopUp`: 요청 성공 시
  - `LoadingPopUp` : 데이터 로딩 중
  - `BackToLoginPopUp` : 시스템 키 갱신 후에는 새로 로그인해야 함을 알려줌(릴리즈 버전에서는 시스템키 갱신이 제외되어 사용하지는 않고 있으나 필요할 경우를 대비 남겨 둠)

#### Custom PopUp 구조 및 작동 방식

- 버튼 클릭 시 `handleOpen`을 실행해 팝업을 띄움
- `element`를 전달받아 팝업 내부에 원하는 내용을 삽입 가능
- `handleClose`를 사용해 닫기 기능 제공

  ```js
  export default function CustomPopUp({
    children,
    title,
    open,
    handleOpen,
    handleClose,
    element,
  }) {
    return (
      <>
        {cloneElement(children, { onClick: handleOpen })}
        <PopUp open={open} handleClose={handleClose}>
          <PopUpTitle title={title} handleClose={handleClose} />
          <PopupCard>
            <FlexStartContainer>{element}</FlexStartContainer>
          </PopupCard>
        </PopUp>
      </>
    );
  }
  ```

- `CustomPopUp` 을 사용한 `AccessKeyRemoveUserPopUp.js` 예시
- ⚠️ 주의: 고객사가 요구하는 웹 취약성 검사를 통과하려면 패스워드를 메모리에서 입력 후 즉시 삭제하고, 상태값에 남지 않도록 처리해야 합니다. 이는 보안상의 이유로 중요한 사항입니다.

  ```js
  export default function AccessKeyRemoveUserPopUp({ children, afterAction }) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState("");

    const handleOpen = useCallback((e) => {
      e.stopPropagation();
      setPassword("");
      setOpen(true);
      dispatch(openPopUp()); // zIndex 값 변경
    }, []);

    const handleClose = useCallback((e) => {
      e.stopPropagation();
      setOpen(false);
      dispatch(closePopUp()); // zIndex 값 변경
    }, []);

    const handleSubmit = async () => {
      if (password) {
        await dispatch(accessKeyRemoveUser({ password }));
        setOpen(false);
        dispatch(closePopUp()); // zIndex 값 변경
        afterAction();
      }
    };

    return (
      <CustomPopUp
        title="엑세스키 삭제"
        children={children}
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        element={
          <Card>
            <FlexItem>
              <H2>엑세스키를 삭제하면 KMS 시스템에 접근할 수 없습니다.</H2>
              <OneLineInput
                type="password"
                placeholder="비밀번호 입력"
                onChange={(e) => setPassword(e.target.value)}
              />
              <PopupButton onClick={handleClose}>취소</PopupButton>
              <PopupButtonRed onClick={handleSubmit} disabled={!password}>
                확인
              </PopupButtonRed>
            </FlexItem>
          </Card>
        }
      />
    );
  }
  ```

<br>

- `AccessKeyRemoveUserPopUp.js` 사용 예시

```js
<AccessKeyRemoveUserPopUp afterAction={handleRefresh}>
  <PopupButton disabled={!selectedRow}>키 삭제</PopupButton>
</AccessKeyRemoveUserPopUp>
```

####

<br><br><br>

#### Custom Table 구조 및 작동 방식

- 목록을 나타내는 컴포넌트의 재사용성을 높이고, 응답 결과 포맷에 맞춰 유연하게 동작할 수 있도록 설계되었습니다.
- `/src/component/CustomTable/CustomTable.js`
- `/src/component/CustomTable/GeneralListWithHeaderInfo.js`

<br>

#### `CustomTable.js`

- `GeneralListWithHeaderInfo` 컴포넌트를 포함하며, 리스트 데이터를 테이블 형식으로 출력합니다.
- 정렬(`handleSort`), 필터링(`filter`), 페이징(`pagination`) 기능을 제공합니다.
- `list`가 존재할 경우 `Down` 컴포넌트를 렌더링하여 페이지네이션을 지원합니다.

<br>

#### `GeneralListWithHeaderInfo.js`

- 리스트 데이터를 테이블로 렌더링하며, 컬럼별 정렬 및 필터 기능을 포함합니다.
- Redux의 `useSelector`를 사용하여 상태 값을 가져옵니다.
- `handleRowClick` 함수로 선택한 행을 Redux 상태로 관리합니다.
- 컬럼별 동적 스타일 및 크기를 조정할 수 있습니다.
- API 응답 데이터의 `headerInfos`를 활용하여 컬럼을 동적으로 생성하고, 데이터 구조에 맞게 테이블을 구성합니다.
- `headerInfos`의 `isSort`, `isFilter`, `isDisplay` 값을 기반으로 컬럼별 동작을 동적으로 설정합니다.
- `Array.map`을 활용하여 `headerInfos`와 `items` 데이터를 동적으로 매핑하여 UI를 구성합니다.

<br>

#### 정렬 기능

- `headerInfos` 내 `isSort` 값이 `true`인 경우 정렬 아이콘을 표시합니다.
- 정렬 방식(오름차순/내림차순)에 따라 `faArrowUp` 또는 `faArrowDown` 아이콘을 변경하여 표시합니다.
- `handleSort` 함수를 통해 정렬 키값을 변경하고, 정렬된 데이터를 다시 렌더링합니다.

<br>

#### 다운로드 및 복구 기능

- 특정 컬럼 키(`download`, `backup` 등)에 따라 `DownloadButton` 및 `LogRestorePopUp`을 렌더링합니다.

<br><br><br>

#### Custom Table 활용 예시

```js
const UserListPage = () => {
  // 응답 결과는 Redux store에서 가져옵니다.
  const dispatch = useDispatch();
  const list = useSelector((state) => state.user.userList?.items);
  const totCnt = useSelector((state) => state.user.userList?.totCnt);
  const headerInfos = useSelector((state) => state.user.userList?.headerInfos);
  const refreshable = useSelector((state) => state.history?.refresh);

  // 초기값 설정
  const [header, setHeader] = useState(null);
  const [sortOption, setSortOption] = useState({ key: 6, order: "DESC" }); // key 값은 headerInfos의 idx 값입니다. 즉, 업데이트 일자를 기준으로 내림차순 정렬
  // 사용자 목록 headerInfos 응답값 예시
  // {
  //   "idx": 6,
  //   "keyName": "updateDate",
  //   "name": "업데이트 일자",
  //   "isSort": true,
  //   "isFilter": false,
  //   "isDisplay": true
  // },

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (headerInfos) {
      const displayedHeader = headerInfos
        .filter((el) => el.isDisplay && el.keyName)
        .map((el) => el.keyName);
      // headerInfos를 가공하여 header 추출합니다.

      // const headerInfos = [
      // {
      //     "idx": 0,
      //     "keyName": "userId",
      //     "name": "사용자 계정",
      //     "isSort": true,
      //     "isFilter": true,
      //     "isDisplay": true
      // },
      // {
      //     "idx": 1,
      //     "keyName": "name",
      //     "name": "이름",
      //     "isSort": true,
      //     "isFilter": true,
      //     "isDisplay": true
      // }
      // ];

      // console.log(displayedHeader); // 출력 결과: ["userId", "name"]

      setHeader(displayedHeader);
      dispatch(setSelectedRow(null));
      dispatch(setUserListCurrentPage(1)); // 페이지 초기화
    }

    if (refreshable) {
      dispatch(setRefresh(false));
      handleRefresh();
    }
  }, [headerInfos, refreshable]);

  // 최초 렌더링 시 데이터 가져오기
  useEffect(() => {
    const fetchList = async () => {
      await dispatch(
        userList({
          isHeaderInfo: true,
          rowCnt: itemsPerPage,
          startNum: (currentPage - 1) * itemsPerPage,
          sortIdx: sortOption?.key,
          order: sortOption?.order,
          filter: searchTerm,
        })
      );
    };
    fetchList();
  }, [dispatch, currentPage, itemsPerPage, sortOption, searchTerm]); // 의존성 누락되지 않도록 주의!

  // 페이지 새로고침용 함수
  const handleRefresh = useCallback(async () => {
    await dispatch(
      userList({
        isHeaderInfo: true,
        rowCnt: itemsPerPage,
        startNum: 0, // 1페이지의 시작 데이터 번호
        sortIdx: sortOption?.key,
        order: sortOption?.order,
        filter: "",
      })
    );
    setCurrentPage(1); // 새로고침 후 페이지 1로 설정
  }, [dispatch, sortOption, itemsPerPage]);

  // 페이지 변경 시 필요한 함수
  const handlePageChange = useCallback(
    async (page) => {
      setCurrentPage(page);
      await dispatch(
        userList({
          isHeaderInfo: true,
          rowCnt: itemsPerPage,
          startNum: (page - 1) * itemsPerPage,
          sortIdx: sortOption?.key,
          order: sortOption?.order,
          filter: searchTerm,
        })
      );
    },
    [dispatch, sortOption, searchTerm, itemsPerPage]
  );

  // 목록 정렬에 필요한 함수
  const handleSort = useCallback(
    async (key) => {
      let order = "ASC";
      if (sortOption?.key === key && sortOption?.order === "ASC") {
        order = "DESC";
      }

      setSortOption({ key, order });
      await dispatch(
        userList({
          isHeaderInfo: true,
          rowCnt: itemsPerPage,
          startNum: 0,
          sortIdx: key,
          order: order,
          filter: searchTerm,
        })
      );
    },
    [dispatch, sortOption, searchTerm, itemsPerPage]
  );

  // 검색에 필요한 함수
  const handleSearch = useCallback(
    async (event) => {
      if (event.key === "Enter") {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
        await dispatch(
          userList({
            isHeaderInfo: true,
            rowCnt: itemsPerPage,
            startNum: 0,
            sortIdx: sortOption?.key,
            order: sortOption?.order,
            filter: event.target.value,
          })
        );
      }
    },
    [dispatch, sortOption, itemsPerPage]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        justifyContent: "space-between",
      }}
    >
      {list ? ( // 응답값이 있는 경우에만 테이블 렌더링
        <GeneralListWithHeaderInfo
          header={header} // 응답 결과를 가공하여 전달
          headerInfos={headerInfos} // 응답 결과를 그대로 전달
          list={list} // 응답 결과 그대로 전달
          checkbox={true} // 목록의 체크박스가 필요한 경우 true
          filter={true} // 필터가 필요한 경우 true
          handleSort={handleSort} // 정렬이 필요한 경우 전달
          sortOption={sortOption} // 정렬 기준 전달
          where={"user"} // 테이블의 출처 (조건값이 많아 큰 카테고리를 나누었습니다.)
          bgColor={"var(--darkGrey)"} // 스타일링 임의로 조정할 수 있게 했습니다.
          color={"var(--white)"} // 스타일링 임의로 조정할 수 있게 했습니다.
          currentPage={currentPage} // 현재 페이지 전달
        />
      ) : (
        <ErrorMessageBox /> // 응답값 없으면 에러메세지 출력
      )}

      {list?.length > 0 && ( // 응답값의 목록 아이템이 있는 경우에 한해 페이지 표시
        <Down
          showDropDownBox={false}
          currentPage={currentPage}
          totCnt={totCnt}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default UserListPage;
```

<br>

#### 각 함수 호출 시 파라미터 주의사항

- startNum: 요청할 데이터의 시작 인덱스
- sortIdx: 정렬 기준 인덱스
- order: 정렬 순서(ASC/DESC)
- filter: 검색어 또는 필터 문자열
- 같은 endpoint를 호출하더라도, 검색, 페이지 이동, 정렬 등 기능에 따라 전달해야 하는 파라미터 값이 달라집니다.
- 따라서 `startNum`, `sortIdx`, `order`, `filter` 등의 값을 상황에 맞게 변경해야 합니다.
- 또한, `useCallback` 등의 콜백 함수를 사용할 때는 의존성 배열에 필요한 값이 누락되지 않도록 주의해야 합니다.

| **용도**             | **startNum**                | **sortIdx**                     | **order**           | **filter**                                 |
| -------------------- | --------------------------- | ------------------------------- | ------------------- | ------------------------------------------ |
| **검색**             | `0`                         | `sortOption?.key`               | `sortOption?.order` | `(event.target as HTMLInputElement).value` |
| **페이지**           | `(page - 1) * itemsPerPage` | `sortOption?.key`               | `sortOption?.order` | `searchTerm`                               |
| **정렬**             | `0`                         | <code>key &#124;&#124; 0</code> | `order`             | `searchTerm`                               |
| **인증서 타입 변경** | `0`                         | `sortOption?.key`               | `sortOption?.order` | `searchTerm`                               |
| **검색어 삭제**      | `0`                         | `sortOption?.key`               | `sortOption?.order` | `""`                                       |


<br><br>

#### 💡 목록 조회/정렬/페이지 변경 시 자주 발생했던 버그 & 해결 방법 (제 부주의로)

- 파라미터를 잘못 넣는 경우: 함수마다 기대하는 파라미터 값을 꼭 확인하세요.

- Dependency Array 누락: `useEffect` 또는 `useCallback`에서 의존성 배열에 필요한 파라미터를 빠뜨리면 의도한 대로 동작하지 않을 수 있습니다. 

