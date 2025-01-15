import { customCreateAtom } from "../../utils/customCreateAtom";
import { customApiRequest } from "../../utils/customApiRequest";

// 발급기계 - 발급기계 목록 조회를 위한 API
export const machineListAtom = customCreateAtom("machineList");
export const fetchMachineList = (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_MACHINE_LIST!; // No more warning: TypeScript trusts your assertion.
  const url = "/machine/list";
  return customApiRequest(url, trId, body);
};

// 발급기계 - 발급기계(단일) 정보 조회를 위한 API
export const machineInfoAtom = customCreateAtom("machineInfo");
export const fetchMachineInfo = (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_MACHINE_INFO!; // No more warning: TypeScript trusts your assertion.
  const url = "/machine/info";
  return customApiRequest(url, trId, body);
};

// 발급기계 - 발급기계 생성을 위한 API
export const createMachineAtom = customCreateAtom("createMachine");
export const createMachine = (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_MACHINE_CREATE!; // No more warning: TypeScript trusts your assertion.
  const url = "/machine/save";
  return customApiRequest(url, trId, body);
};

// 발급기계 - 발급기계 변경을 위한 API
export const updateMachineAtom = customCreateAtom("updateMachine");
export const updateMachine = (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_MACHINE_UPDATE!; // No more warning: TypeScript trusts your assertion.
  const url = "/machine/save";
  return customApiRequest(url, trId, body);
};

// 발급기계 - 발급기계 삭제를 위한 API
export const deleteMachineAtom = customCreateAtom("deleteMachine");
export const deleteMachine = (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_MACHINE_DELETE!; // No more warning: TypeScript trusts your assertion.
  const url = "/machine/delete";
  return customApiRequest(url, trId, body);
};

// 발급기계 - 발급기계 목록 Id를 위한 API
export const machineIdAtom = customCreateAtom("machineIdList");
export const fetchMachineIdList = (body?: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_MACHINE_ID_LIST!; // No more warning: TypeScript trusts your assertion.
  const url = "/machine/id-list";
  return customApiRequest(url, trId, body);
};
