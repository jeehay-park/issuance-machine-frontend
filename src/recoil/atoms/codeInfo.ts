import { customCreateAtom } from "../../utils/customCreateAtom";
import { customApiRequest } from "../../utils/customApiRequest";

// 코드정보 - 코드(단일) 정보 조회를 위한 API
export const codeInfoAtom = customCreateAtom("codeInfo");
export const fetchCodeInfoList = async (body: { [key: string]: any }) => {
  const url = "/code/info";
  const trId = process.env.REACT_APP_TRID_CONFIG_INFO!;
  return customApiRequest(url, trId, body);
};

// 코드정보 - 코드 생성을 위한 API
export const createCodeAtom = customCreateAtom("createCode");
export const createCode = async (body: { [key: string]: any }) => {
  const url = "/code/create";
  const trId = process.env.REACT_APP_TRID_CONFIG_CREATE!;
  return customApiRequest(url, trId, body);
};

// 코드정보 - 코드 변경을 위한 API
export const updateCodeAtom = customCreateAtom("updateCode");
export const updateCode = async (body: { [key: string]: any }) => {
  const url = "/code/update";
  const trId = process.env.REACT_APP_TRID_CODE_UPDATE!;
  return customApiRequest(url, trId, body);
};

// 코드정보 - 코드 삭제를 위한 API
export const deleteCodeAtom = customCreateAtom("deleteCode");
export const deleteCode = async (body: { [key: string]: any }) => {
  const url = "/code/delete";
  const trId = process.env.REACT_APP_TRID_CODE_DELETE!;
  return customApiRequest(url, trId, body);
};
