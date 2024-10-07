import { customCreateAtom } from "../../utils/customCreateAtom";
import { customApiRequest } from "../../utils/customApiRequest";

// 발급설정 - 프로파일 목록 조회를 위한 API
export const profileAtom = customCreateAtom("profile");
export const fetchProfileList = (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_CONFIG_LIST!; // No more warning: TypeScript trusts your assertion.
  const url = "/config/list";
  return customApiRequest(url, trId, body);
};

// 발급설정 - 키발급코드 목록 조회를 위한 API
export const keyIssueAtom = customCreateAtom("keyIssue");
export const fetchKeyIssueList = (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_CONFIG_LIST!; 
  const url = "/config/list";
  return customApiRequest(url, trId, body);
};

// 발급설정 - 스크립트 목록 조회를 위한 API
export const scriptAtom = customCreateAtom("script");
export const fetchScriptList = (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_CONFIG_LIST!; 
  const url = "/config/list";
  return customApiRequest(url, trId, body);
};

// 발급설정 - 프로파일 정보 조회를 위한 API
export const profileInfoAtom = customCreateAtom("profileInfo");
export const fetchProfileInfoList = async (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_CONFIG_INFO!;
  const url = "/config/info";
  return customApiRequest(url, trId, body);
};

// 발급설정 - 키발급코드 정보 조회를 위한 API
export const keyIssueInfoAtom = customCreateAtom("keyIssueInfo");
export const fetchKeyIssueInfo = async (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_CONFIG_INFO!; 
  const url = "/config/info";
  return customApiRequest(url, trId, body);
};

// 발급설정 - 스크립트 정보 조회를 위한 API
export const scriptInfoAtom = customCreateAtom("scriptInfo");
export const fetchScriptInfo = async (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_CONFIG_INFO!; 
  const url = "/config/info";
  return customApiRequest(url, trId, body);
};
