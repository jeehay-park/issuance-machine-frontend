import { atom } from "recoil";

export const selectedRowAtom = atom<{ [key: string]: any } | null>({
  key: "selectedRowAtom",
  default: null,
});
