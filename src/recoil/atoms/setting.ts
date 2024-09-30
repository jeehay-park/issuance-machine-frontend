import { atom } from "recoil";
import axios from "axios";

export const profileAtom = atom<{ [key: string]: any } | null>({
  key: "profile",
  default: null,
});

export const fetchProfileList = async (body: { [key: string]: any }) => {
  try {
    const url = 'http://localhost:3001/ictk/issue/admin/config/list';
    const req = {
      header: {
        trId: "500400",
      },
      body,
    };

    const { data: response } = await axios.post(url, req);

    if (response?.header.rtnCode !== "000000") {
      throw { customError: true, payload: response };
    }

    return response;
  } catch (err: any) {
    if (err.customError) {
      return err.payload;
    } else if (err.response?.data) {
      return err.response.data;
    } else {
      return {
        error: {
          url: "프로파일 정보",
          code: err.code ?? "UNKNOWN_ERROR",
          message: err.message ?? "An unknown error occurred",
        },
      };
    }
  }
};