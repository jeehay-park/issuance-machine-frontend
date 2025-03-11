import { atom } from "recoil";
import customAxios from "../../utils/customAxios";
import { customApiRequest } from "../../utils/customApiRequest";
import { customCreateAtom } from "../../utils/customCreateAtom";
import { hashSHA512 } from "../../utils/hashUtils";

interface AuthData {
  salt: string;
  // Add other properties if needed
}

// 사용자 로그인
export const authAtom = atom<AuthData | null>({
  key: "authAtom",
  default: null,
});

export const login = async (body: { [key: string]: any }) => {
  try {
    const url = "/user/login/challenge";
    const dataForChallenge = {
      header: {
        trId: process.env.REACT_APP_TRID_USER_LOGIN_CHALLENGE!,
      },
      body: {userId : body.userId},
    };
    const { data: response } = await customAxios.post(url, dataForChallenge);

    if (response?.header?.rtnCode !== "000000") {
      throw { customError: true, payload: response };
    } else {
      const { salt, uuid } = response.body;
      const passwordHash = hashSHA512(
        uuid + hashSHA512(body.password + salt)
      ).toString();
      try {
        const url = "/user/login/request";
        const dataForRequest = {
          header: {
            trId: process.env.REACT_APP_TRID_USER_LOGIN_REQUEST!,
          },
          body: { userId: body.userId, passwordHash: passwordHash, uuid: uuid },
        };
        const { data: response } = await customAxios.post(url, dataForRequest); // Using POST since you're sending data
        if (response?.header?.rtnCode !== "000000") {
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
              url: "로그인",
              code: err.code ?? "UNKNOWN_ERROR",
              message: err.message ?? "An unknown error occurred",
            },
          };
        }
      }
    }
  } catch (err: any) {
    if (err.customError) {
      return err.payload;
    } else if (err.response?.data) {
      return err.response.data;
    } else {
      return {
        error: {
          url: "로그인",
          code: err.code ?? "UNKNOWN_ERROR",
          message: err.message ?? "An unknown error occurred",
        },
      };
    }
  }
};

// 사용자 등록
export const signUpAtom = customCreateAtom("signup");
export const signUp = async (body: { [key: string]: any }) => {
  const url = "/user/signup";
  const trId = process.env.REACT_APP_TRID_USER_SIGNUP!;
  return customApiRequest(url, trId, body);
};
