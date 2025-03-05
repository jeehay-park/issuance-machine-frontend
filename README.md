###### <div style="text-align: right;">📅 문서 업데이트: 2025-03-05</div>

<br><br>

# 📌 발급장비 관리자 페이지

### 프로젝트 개요
- Spring Boot를 활용한 백엔드와 React 기반의 프론트엔드를 결합하여, 발급장비 관리자 페이지를 리뉴얼 중입니다.

- MariaDB 데이터베이스와 연동하여 발급 장비 관련 데이터를 효율적으로 처리하고 관리합니다.

- [현재 발급장비 테스트 페이지](http://192.168.1.17:7777/work_info.do)


<br><br><br>


### 기술 스택
- **백엔드**: Spring Boot
- **프론트엔드**: React, TypeScript, Recoil
- **데이터베이스**: MariaDB

<br><br><br>




# 📌 프로젝트를 로컬환경에서 실행하는 절차

### 백엔드 서버 실행 (Spring Boot)
- 백엔드 서버를 실행하려면 먼저 MariaDB가 준비되어 있어야 합니다.
- Spring Boot 서버가 실행되면, 자동으로 필요한 테이블이 데이터베이스에 생성됩니다. (`ddl-auto: update` 설정을 통해 테이블을 자동 생성)
- **로컬 백엔드 소스 위치**: `D:\issuance-machine-server-backend`
- **MariaDB 접속 정보**:
  - **사용자**: root
  - **비밀번호**: oct102024
  - **포트**: 3306
- **Swagger API 테스트**: 서버가 실행된 후, `http://localhost:17777/swagger-ui/index.html#`에서 API를 테스트할 수 있습니다.

<br>

### 프론트엔드 실행 (React)
- 프론트엔드 소스를 실행하기 전에 `node_modules`를 설치해야 합니다.
- `npm install` 명령어로 필요한 패키지를 설치한 후, React 애플리케이션을 실행할 수 있습니다.
- **로컬 프론트엔드 소스 위치**: `C:\tasks\issuance-equipment-frontend`
- **프론트엔드 실행 명령**: `npm run start`

