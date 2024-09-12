import { atom } from "recoil";

interface AuthData {
    salt: string;
    // add other properties if needed
  }

export const authAtom = atom<AuthData | null>({
  key: "authAtom",
  default: null,
});
