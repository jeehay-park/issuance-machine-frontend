import { customCreateAtom } from "../../utils/customCreateAtom";
import { customApiRequest } from "../../utils/customApiRequest";

// 사용자 목록
export const userListAtom = customCreateAtom("userList");
export const fetchUserList = async (body: { [key: string]: any }) => {
  const url = "/user/list";
  const trId = process.env.REACT_APP_TRID_USER_LIST!;
  return customApiRequest(url, trId, body);
};

// 사용자 변경
export const editUser = async (body: { [key: string]: any }) => {
  const url = "/user/edit";
  const trId = process.env.REACT_APP_TRID_USER_EDIT!;
  return customApiRequest(url, trId, body);
};

// 사용자 삭제
export const deleteUser = async (body: { [key: string]: any }) => {
  const url = "/user/delete";
  const trId = process.env.REACT_APP_TRID_USER_DELETE!;
  return customApiRequest(url, trId, body);
};
