import { customCreateAtom } from "../../utils/customCreateAtom";
import { customApiRequest } from "../../utils/customApiRequest";

// 프로그램 정보 - 프로그램 목록 조회를 위한 API
export const programListAtom = customCreateAtom("programList");
export const fetchProgramList = async (body: { [key: string]: any }) => {
  const url = "/program/list";
  const trId = process.env.REACT_APP_TRID_PROGRAM_LIST!;
  return customApiRequest(url, trId, body);
};

// 프로그램 정보 - 프로그램 (단일) 정보 조회를 위한 API
export const programInfoAtom = customCreateAtom("programInfo");
export const fetchProgramInfo = async (body: { [key: string]: any }) => {
  const url = "/program/info";
  const trId = process.env.REACT_APP_TRID_PROGRAM_INFO!;
  return customApiRequest(url, trId, body);
};

// 프로그램 정보 - 프로그램 생성을 위한 API(생성)
export const createProgramAtom = customCreateAtom("createProgram");
export const createProgram = async (body: { [key: string]: any }) => {
  const url = "/program/save";
  const trId = process.env.REACT_APP_TRID_PROGRAM_CREATE!;
  return customApiRequest(url, trId, body);
};

// 프로그램 정보 - 프로그램 생성을 위한 API(변경)
export const updateProgramAtom = customCreateAtom("updateProgram");
export const updateProgram = async (body: { [key: string]: any }) => {
  const url = "/program/save";
  const trId = process.env.REACT_APP_TRID_PROGRAM_UPDATE!;
  return customApiRequest(url, trId, body);
};

// 프로그램 정보 - 프로그램 삭제를 위한 API
export const deleteProgramAtom = customCreateAtom("deleteProgram");
export const deleteProgram = async (body: { [key: string]: any }) => {
  const url = "/program/delete";
  const trId = process.env.REACT_APP_TRID_PROGRAM_DELETE!;
  return customApiRequest(url, trId, body);
};
