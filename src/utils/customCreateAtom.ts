import { atom } from "recoil";
import persistAtom from "./recoilPersistEffect";

// Utility to create atoms
export const customCreateAtom = (key: string, defaultValue: any = null) => {
  return atom<{ [key: string]: any } | null>({
    key,
    default: defaultValue,
    effects_UNSTABLE: [persistAtom],
  });
};
