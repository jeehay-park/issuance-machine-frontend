###### <div style="text-align: right;">📅 문서 업데이트: 2025-03-12</div>

<br><br>

# 📌 API 통신 및 데이터 관리
- 프론트엔드와 백엔드 간의 API 통신 방법
- 특히, API 호출 방식을 다루며, 로그인 후 토큰을 사용하여 데이터를 요청하는 방식, 그리고 `axios`를 설정하는 방법

<br><br>

### `axios` 인스턴스 및 `customAxios` 설정
- `/src/utils/customAxios.ts`
- `axios.create()`를 사용해 기본 설정을 가진 `customAxios` 인스턴스를 생성합니다. 이를 통해 API 호출 시 반복적인 설정을 피할 수 있습니다.

<br><br>

### 기본 baseURL 설정:
- `baseURL`은 모든 요청에 공통으로 적용될 API 엔드포인트의 기본 URL을 설정합니다. 이 URL은 환경 변수 `REACT_APP_API_URL`에서 가져옵니다.

<br><br>

### 요청 헤더 설정:
- `Content-Type`을 `application/json`으로 설정하여 요청 본문이 JSON 형식임을 서버에 알립니다. 이를 통해 서버는 요청을 적절하게 처리할 수 있습니다.


    ```ts
    import axios from "axios";

    const customAxios = axios.create({
        baseURL : process.env.REACT_APP_API_URL,
        headers : {
            'Content-Type' : 'application/json'
        }
    })

    export default customAxios;
    ```
<br><br>


### API 요청 핵심 구조

#### API 요청 함수 (`customApiRequest.ts`)

- `url`: 요청할 API의 URL
- `trId`: 거래 ID, 고유값
- `body`: 요청 본문 (선택 사항)
- 기능: API 요청을 보낸 후 성공/실패 여부를 확인하고, 실패 시 적절한 에러 처리

    ```ts
    export const customApiRequest = async (
    url: string,
    trId: string,
    body?: { [key: string]: any }
    ) => {
    try {
        const req = { header: { trId }, body };
        const { data: response } = await customAxios.post(url, req);

        if (response?.header.rtnCode !== process.env.REACT_APP_SUCCESS_RTNCODE) {
        throw { customError: true, payload: response };
        }

        return response;
    } catch (err: any) {
        console.log("axios error", err);

        if (err.customError) {
        return err.payload;
        } else {
        return {
            error: {
            code: err?.code ?? "UNKNOWN_ERROR",
            message: err?.message ?? "An unknown error occurred",
            details: "An unexpected error occurred. Please try again later.",
            },
        };
        }
    }
    };

    ```

<br><br>

#### API 호출을 위한 특정 함수 (`fetchCodeList`)
- `fetchCodeList`: 특정 API 요청을 정의하는 함수
- 기능: `customApiRequest`를 사용하여 코드 목록을 가져오는 요청을 처리

    ```ts
    export const fetchCodeList = async (body: { [key: string]: any }) => {
    const url = "/codeinfo/list";  // API 엔드포인트
    const trId = process.env.REACT_APP_TRID_CODE_LIST!;
    return customApiRequest(url, trId, body);  // customApiRequest를 호출
    };
    ```

<br><br>

#### Atom 생성 및 상태 관리 (`customCreateAtom`)
- `codeListAtom` (예시): 상태를 관리하는 atom을 생성합니다.
- 기능: 코드 목록 데이터를 관리하는 atom을 생성하여 React 컴포넌트에서 사용 가능

    ```ts
    export const codeListAtom = customCreateAtom("codeList");
    ```

<br><br>

### Atom 상태 구독 및 업데이트
- `useRecoilState` 사용 예시 (상태 읽기 및 업데이트)

    - `useRecoilState`는 atom의 상태를 읽고, 그 상태를 변경할 수 있는 함수를 반환합니다. 예시에서는 `recoilData`라는 상태를 구독하고, `setRecoilData`로 상태를 업데이트하고 있습니다.

    <br>

    ```tsx
        // 코드 목록 데이터를 구독하고 업데이트하는 예시
        const [recoilData, setRecoilData] = useRecoilState(codeListAtom);

        // 예시로, `fetchListData`에서 `setRecoilData`를 사용해 상태를 업데이트합니다.
        const fetchListData = async (params: FetchListParams) => {
        const result = await fetchCodeList(params);

        if (result?.body) {
            // `recoilData`를 업데이트
            setRecoilData(result); 
        } else {
            // 오류 처리
            setError(result?.error);
        }
        };
    ```
<br><br>

- `useRecoilValue` 사용 예시 (상태 읽기만)

    - `useRecoilValue`는 상태를 읽기만 할 때 사용됩니다. `useRecoilState`는 상태를 읽고 업데이트할 수 있는 함수도 반환하지만, `useRecoilValue`는 상태를 읽기 전용으로 사용할 때 더 적합합니다.

    <br>

    ```tsx
        // 선택된 행 데이터를 구독하는 예시
        const selectedRow = useRecoilValue(selectedRowAtom);
    ```

<br><br>

### Recoil 도입 이유

- 💡 Recoil에서는 상태를 읽기만 할 것인지, 읽고 업데이트할 것인지 선택할 수 있다는 점에서 리덕스보다 더 직관적이고, 간단한 상태 관리를 제공합니다. 

- 리덕스는 상태와 액션을 별도로 정의하고 관리해야 하지만, Recoil은 atom을 기반으로 상태를 간결하게 관리할 수 있어서 초기 설정과 관리가 더 쉬운 경우가 많습니다.

- 따라서, Recoil은 작은 프로젝트나 빠른 프로토타이핑에서 더 적합할 수 있고, 리덕스는 복잡하고 규모가 큰 애플리케이션에서 더 유리한 점이 있을 수 있습니다.

- KMS 또는 IDaaS 프로젝트보다는 덜 복잡한 애플리케이션이므로, 타당성을 검토해 보기 위해 한번 시도해봤습니다. 😊


<br>

- 간단한 비교

    | 구분                | Recoil                                           | Redux                                        |
    |---------------------|--------------------------------------------------|----------------------------------------------|
    | **상태 읽기**        | `useRecoilValue`를 사용하여 읽기만 가능         | `useSelector`로 상태 읽기                   |
    | **상태 읽고 업데이트**| `useRecoilState`로 상태 읽고 업데이트 가능      | `dispatch`와 `useSelector`를 조합하여 상태 변경 |
    | **상태 관리 단위**   | `atom` (상태를 작은 단위로 나누어 관리)          | `reducer` (상태를 한 번에 관리)             |
    | **상태와 액션의 분리**| 상태 읽기와 업데이트가 하나의 훅으로 처리       | 액션과 리듀서로 상태 업데이트를 관리       |


<br><br>

- 💡 개인적인 견해: 이 애플리케이션이 완성되지 않아 섣부른 판단이 될 수 있지만, 개인적으로는 리덕스(Redux)는 보일러플레이트 작성 등의 설정이 많이 필요하고, Recoil은 초기 설정이 간단한 편이지만 결국 큰 차이를 못 느꼈습니다. 쉽게 말해, 처음에 힘드냐 나중에 힘드냐의 차이인 것 같아요. 성능 차이에 대한 검토는 더 필요할 수 있지만, 개인적으로는 각자의 스타일에 맞는 전역 상태 관리 라이브러리를 사용해도 관리자 페이지 구현에는 큰 무리가 없을 것 같습니다. 😊


