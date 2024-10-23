import { customCreateAtom } from "../../utils/customCreateAtom";
import { customApiRequest } from "../../utils/customApiRequest";

// 시리얼넘버 규칙 - SN 규칙 목록 조회를 위한 API
export const snruleListAtom = customCreateAtom("snruleList");
export const fetchSnruleList = (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_SNRULE_LIST!; // No more warning: TypeScript trusts your assertion.
  const url = "/snrule/list";
  return customApiRequest(url, trId, body);
};

// 시리얼넘버 규칙 - SN 규칙 (단일) 정보 조회를 위한 API
export const snruleInfoAtom = customCreateAtom("snruleInfo");
export const fetchSnruleInfo = (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_WORK_INFO!; // No more warning: TypeScript trusts your assertion.
  const url = "/snrule/info";
  return customApiRequest(url, trId, body);
};

// 시리얼넘버 규칙 - SN 규칙 생성/변경을 위한 API (생성)
export const createSnruleAtom = customCreateAtom("createSnrule");
export const createSnrule = (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_SNRULE_CREATE!; // No more warning: TypeScript trusts your assertion.
  const url = "/snrule/save";
  return customApiRequest(url, trId, body);
};

// 시리얼넘버 규칙 - SN 규칙 생성/변경을 위한 API (변경)
export const updateSnruleAtom = customCreateAtom("updateSnrule");
export const updateSnrule = (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_SNRULE_UPDATE!; // No more warning: TypeScript trusts your assertion.
  const url = "/snrule/update";
  return customApiRequest(url, trId, body);
};

// 시리얼넘버 규칙 - SN 규칙 삭제를 위한 API
export const deleteSnruleAtom = customCreateAtom("deleteSnrule");
export const deleteSnrule = (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_SNRULE_DELETE!; // No more warning: TypeScript trusts your assertion.
  const url = "/snrule/delete";
  return customApiRequest(url, trId, body);
};
