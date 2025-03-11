###### <div style="text-align: right;">📅 문서 업데이트: 2025-03-11</div>

<br><br>

# 📌 발급장비 관리자 페이지

### 프로젝트 개요

- 이 프로젝트는 **칩 발급 장비를 제어하는 관리자 페이지**를 리뉴얼한 리액트 애플리케이션입니다. 관리자는 이 애플리케이션을 통해 실시간으로 장비 상태를 모니터링하고, 설정을 변경하며, 발급 작업을 제어할 수 있습니다.

- **주요 리뉴얼 내용**:
  - UI/UX 개선
  - 사용자 관리 기능 추가 
  - 직관적인 설정 관리 및 상태 모니터링 기능 추가


<br><br>


### 프로젝트 목표

- 이 애플리케이션의 목표는 관리자가 **칩 발급 장비를 보다 효율적으로 제어**하고 **작업 상태를 실시간으로 모니터링**할 수 있도록 지원하는 것입니다.


<br><br>


### 주요 기능

- **대시보드**: 장비의 상태와 작업 진행 상황을 실시간으로 확인
- **작업화면**: 작업 목록 조회 및 관리
- **프로그램 정보**: 장비의 프로그램 상태와 관련 정보 확인
- **시리얼 넘버 규칙**: 시리얼 넘버 규칙 설정 및 관리
- **발급 설정 정보**:
  - 프로파일 Config
  - 키발급코드 Config
  - 스크립트 Config
- **발급 기계 정보**: 발급 기계의 상태 및 세부 정보 조회
- **코드 정보**: 발급된 코드에 대한 세부 정보를 조회하고 관리
- **사용자 정보**: 제한된 사용자만 관리자 페이지에 접근하도록 관리


<br><br>


### 기술 스택

- **Frontend**: React, TypeScript, Recoil, Styled Components
- **Node.js 버전**: v17.9.1
- **환경 변수**: `.env` 파일 사용
- **패키지 관리**: npm

<br><br>

### 환경 변수 설정(`.env`)

- **설정 항목**:
  - API URL
  - 트랜잭션 ID (trId)
  - 응답 코드 등

  - API 호출 시 환경변수 사용 예제:
  
  ```sh
  REACT_APP_API_URL=http://localhost:17777/ictk/issue/admin
  REACT_APP_TRID_WORK_LIST=500100
  ```

- API 호출 시 환경변수 사용 예제
  ```ts
  import { customApiRequest } from "../../utils/customApiRequest";

    // 작업화면 - 작업 목록 조회를 위한 API
    export const workListAtom = customCreateAtom("workList");
    export const fetchWorkList = async (body: { [key: string]: any }) => {
    const url = "/work/list";
    const trId = process.env.REACT_APP_TRID_WORK_LIST!; // 환경 변수 사용
    return customApiRequest(url, trId, body);
    };
  ```

