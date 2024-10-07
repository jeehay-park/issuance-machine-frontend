import { atom } from "recoil";

// Utility to create atoms
export const customCreateAtom = (key: string, defaultValue: any = null) => {
  return atom<{ [key: string]: any } | null>({
    key,
    default: defaultValue,
  });
};
