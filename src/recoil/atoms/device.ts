import { customCreateAtom } from "../../utils/customCreateAtom";
import { customApiRequest } from "../../utils/customApiRequest";

// 발급기계 - 디바이스 생성을 위한 API
export const createDeviceAtom = customCreateAtom("createDevice");
export const createDevice = (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_DEVICE_CREATE!; // No more warning: TypeScript trusts your assertion.
  const url = "/device/create";
  return customApiRequest(url, trId, body);
};

// 발급기계 - 디바이스 변경을 위한 API
export const updateDeviceAtom = customCreateAtom("updateDevice");
export const updateDevice = (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_DEVICE_UPDATE!; // No more warning: TypeScript trusts your assertion.
  const url = "/device/update";
  return customApiRequest(url, trId, body);
};

// 발급기계 - 발급기계 삭제를 위한 API
export const deleteDeviceAtom = customCreateAtom("deleteDevice");
export const deleteDevice = (body: { [key: string]: any }) => {
  const trId = process.env.REACT_APP_TRID_DEVICE_DELETE!; // No more warning: TypeScript trusts your assertion.
  const url = "/device/delete";
  return customApiRequest(url, trId, body);
};
