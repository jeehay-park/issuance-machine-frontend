###### <div style="text-align: right;">📅 문서 업데이트: 2025-03-12</div>

<br><br>

# 📌 API 통신 및 데이터 관리
- 프론트엔드와 백엔드 간의 API 통신 방법
- 특히, API 호출 방식을 다루며, 로그인 후 토큰을 사용하여 데이터를 요청하는 방식, 그리고 `axios`를 설정하는 방법

<br><br>

### `axios` 인스턴스 및 `customAxios` 설정
- `/src/utils/customAxios.ts`
- `axios.create()`를 사용해 기본 설정을 가진 `customAxios` 인스턴스를 생성합니다. 이를 통해 API 호출 시 반복적인 설정을 피할 수 있습니다.

### 기본 baseURL 설정:
- `baseURL`은 모든 요청에 공통으로 적용될 API 엔드포인트의 기본 URL을 설정합니다. 이 URL은 환경 변수 `REACT_APP_API_URL`에서 가져옵니다.

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

#### API 호출을 위한 특정 함수 (`fetchCodeList`)
- `fetchCodeList`: 특정 API 요청을 정의하는 함수
- 기능: `customApiRequest`를 사용하여 코드 목록을 가져오는 요청을 처리

```ts
export const fetchCodeList = async (body: { [key: string]: any }) => {
  const url = "/codeinfo/list";  // API 엔드포인트
  const trId = process.env.REACT_APP_TRID_CODE_LIST!;  // 거래 ID
  return customApiRequest(url, trId, body);  // customApiRequest를 호출
};
```

#### Atom 생성 및 상태 관리 (`customCreateAtom`)
- codeListAtom: 상태를 관리하는 atom을 생성합니다.
- 기능: 코드 목록 데이터를 관리하는 atom을 생성하여 React 컴포넌트에서 사용 가능

```ts
export const codeListAtom = customCreateAtom("codeList");
```
