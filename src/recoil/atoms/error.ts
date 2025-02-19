import { customCreateAtom } from "../../utils/customCreateAtom";
import { customApiRequest } from "../../utils/customApiRequest";

// 에러
export const errorAtom = customCreateAtom("error");
// export const fetchMachineList = (body: { [key: string]: any }) => {
//   const trId = process.env.REACT_APP_TRID_MACHINE_LIST!; // No more warning: TypeScript trusts your assertion.
//   const url = "/machine/list";
//   return customApiRequest(url, trId, body);
// };
