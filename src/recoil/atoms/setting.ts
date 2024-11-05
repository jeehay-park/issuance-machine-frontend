import { customCreateAtom } from "../../utils/customCreateAtom";
import { customApiRequest } from "../../utils/customApiRequest";

// 발급설정 - 프로파일 목록 조회를 위한 API
export const profileAtom = customCreateAtom("profile");
export const fetchProfileList = async(body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_CONFIG_LIST!; // No more warning: TypeScript trusts your assertion.
  const url = "/config/list";
  return await customApiRequest(url, trId, body);
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

// 발급설정 - 프로파일 생성을 위한 API
export const createProfileAtom = customCreateAtom("createProfile");
export const createProfile = async (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_CONFIG_CREATE!;
  const url = "/config/save";
  return customApiRequest(url, trId, body);
};

// 발급설정 - 키발급코드 생성을 위한 API
export const createKeyIssueAtom = customCreateAtom("createKeyIssue");
export const createKeyIssue = async (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_CONFIG_CREATE!;
  const url = "/config/save";
  return customApiRequest(url, trId, body);
};

// 발급설정 - 스크립트 생성을 위한 API
export const createScriptAtom = customCreateAtom("createScript");
export const createScript = async (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_CONFIG_CREATE!;
  const url = "/config/save";
  return customApiRequest(url, trId, body);
};

// 발급설정 - 프로파일 변경을 위한 API
export const updateProfileAtom = customCreateAtom("updateProfile");
export const updateProfile = async (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_CONFIG_UPDATE!;
  const url = "/config/save";
  return customApiRequest(url, trId, body);
};

// 발급설정 - 키발급코드 변경을 위한 API
export const updateKeyIssueAtom = customCreateAtom("updateKeyIssue");
export const updateKeyIssue = async (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_CONFIG_UPDATE!;
  const url = "/config/save";
  return customApiRequest(url, trId, body);
};

// 발급설정 - 스크립트 변경을 위한 API
export const updateScriptAtom = customCreateAtom("updateScript");
export const updateScript = async (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_CONFIG_UPDATE!;
  const url = "/config/save";
  return customApiRequest(url, trId, body);
};

// 발급설정 - 프로파일 삭제를 위한 API
export const deleteProfileAtom = customCreateAtom("deleteProfile");
export const deleteProfile = async (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_CONFIG_DELETE!;
  const url = "/config/delete";
  return customApiRequest(url, trId, body);
};

// 발급설정 - 키발급코드 삭제를 위한 API
export const deleteKeyIssueAtom = customCreateAtom("deleteKeyIssue");
export const deleteKeyIssue = async (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_CONFIG_DELETE!;
  const url = "/config/delete";
  return customApiRequest(url, trId, body);
};

// 발급설정 - 스크립트 삭제를 위한 API
export const deleteScriptAtom = customCreateAtom("deleteScript");
export const deleteScript = async (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_CONFIG_DELETE!;
  const url = "/config/delete";
  return customApiRequest(url, trId, body);
};
