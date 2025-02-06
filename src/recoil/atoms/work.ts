import { customCreateAtom } from "../../utils/customCreateAtom";
import { customApiRequest } from "../../utils/customApiRequest";

// 작업화면 - 작업 목록 조회를 위한 API
export const workListAtom = customCreateAtom("workList");
export const fetchWorkList = async (body: { [key: string]: any }) => {
  const url = "/work/list";
  const trId = process.env.REACT_APP_TRID_WORK_LIST!;
  return customApiRequest(url, trId, body);
};

// 작업화면 - (단일) 작업 정보 조회를 위한 API
export const workInfoAtom = customCreateAtom("workInfo");
export const fetchWorkInfo = async (body: { [key: string]: any }) => {
  const url = "/work/info";
  const trId = process.env.REACT_APP_TRID_WORK_INFO!;
  return customApiRequest(url, trId, body);
};

// 작업화면 - 작업 생성을 위한 API(생성)
export const createWorkAtom = customCreateAtom("createWork");
export const createWork = async (body: { [key: string]: any }) => {
  const url = "/work/save";
  const trId = process.env.REACT_APP_TRID_WORK_CREATE!;
  return customApiRequest(url, trId, body);
};

// 작업화면 - 작업 생성을 위한 API(변경)
export const updateWorkAtom = customCreateAtom("updateWork");
export const updateWork = async (body: { [key: string]: any }) => {
  const url = "/work/save";
  const trId = process.env.REACT_APP_TRID_WORK_UPDATE!;
  return customApiRequest(url, trId, body);
};

// 작업 ID 목록 조회를 위한 API
export const fetchWorkIdListAtom = customCreateAtom("fetchWorkIdList");
export const fetchWorkId = async (body?: { [key: string]: any }) => {
  const url = "/work/id-list";
  const trId = process.env.REACT_APP_TRID_WORK_ID_LIST!;
  return customApiRequest(url, trId, body);
};

// 작업화면 - 작업 삭제를 위한 API
export const deleteWorkAtom = customCreateAtom("deleteWork");
export const deleteWork = async (body: { [key: string]: any }) => {
  const url = "/work/delete";
  const trId = process.env.REACT_APP_TRID_WORK_DELETE!;
  return customApiRequest(url, trId, body);
};

// 작업화면 - 탭(tab)메뉴 발급 작업 상세 (기본)정보 조회를 위한 API
export const workDetailAtom = customCreateAtom("workDetail");
export const fetchWorkDetail = async (body: { [key: string]: any }) => {
  const url = "/work/info";
  const trId = process.env.REACT_APP_TRID_WORK_DETAIL!;
  return customApiRequest(url, trId, body);
};

// 작업화면 - 작업 제어 명령을 위한 API
export const controlWorkAtom = customCreateAtom("controlWork");
export const controlWork = async (body: { [key: string]: any }) => {
  const url = "/work/control";
  const trId = process.env.REACT_APP_TRID_WORK_CONTROL!;
  return customApiRequest(url, trId, body);
};

// 작업화면 - 작업 핸들러 목록 조회를 위한 API
export const workHandlerListAtom = customCreateAtom("workHandlerList");
export const fetchWorkHandlerList = async (body: { [key: string]: any }) => {
  const url = "/work/handler/list";
  const trId = process.env.REACT_APP_TRID_WORK_HANDLER_LIST!;
  return customApiRequest(url, trId, body);
};

// 작업화면 - 작업 핸들러 추가(생성)을 위한 API
export const createWorkHandlerAtom = customCreateAtom("createWorkHandler");
export const createWorkHandler = async (body: { [key: string]: any }) => {
  const url = "/work/handler/save";
  const trId = process.env.REACT_APP_TRID_WORK_HANDLER_CREATE!;
  return customApiRequest(url, trId, body);
};

// 작업화면 - 작업 핸들러 삭제를 위한 API
export const deleteWorkHandlerAtom = customCreateAtom("deleteWorkHandler");
export const deleteWorkHandler = async (body: { [key: string]: any }) => {
  const url = "/work/handler/delete";
  const trId = process.env.REACT_APP_TRID_WORK_HANDLER_DELETE!;
  return customApiRequest(url, trId, body);
};

// 작업화면 - 작업 핸들러 삭제를 위한 API
export const downloadWorkAtom = customCreateAtom("downloadWork");
export const downloadWork = async (body: { [key: string]: any }) => {
  const url = "/work/download";
  const trId = process.env.REACT_APP_TRID_WORK_DOWNLOAD!;
  return customApiRequest(url, trId, body);
};

// 작업화면 - 발급작업 탭(tab) 현황 상세 API
export const workAtom = customCreateAtom("work");
