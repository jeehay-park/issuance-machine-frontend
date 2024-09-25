import { atom } from "recoil";
import axios from "axios";

export const CodeInfoAtom = atom<{ [key: string]: any } | null>({
  key: "codeInfoAtom",
  default: null,
});

export const fetchCodeInfoList = async (body: { [key: string]: any }) => {
  try {
    const url = "https://kms.ictk.com/kms/admin/public/login/challenge";
    const req = {
      header: {
        trId: "12345",
      },
      body,
    };

    const { data: response } = await axios.post(url, req);

    // if (response?.header.rtnCode !== "000000") {
    //   throw { customError: true, payload: response };
    // }

    return response;
  } catch (err: any) {
    if (err.customError) {
      return err.payload;
    } else if (err.response?.data) {
      return err.response.data;
    } else {
      return {
        error: {
          url: "코드 정보",
          code: err.code ?? "UNKNOWN_ERROR",
          message: err.message ?? "An unknown error occurred",
        },
      };
    }
  }
};


export const addCodeInfo = async (body: { [key: string]: any }) => {
  try {
    const url = "https://kms.ictk.com/kms/admin/public/login/challenge";
    const req = {
      header: {
        trId: "12345",
      },
      body,
    };

    const { data: response } = await axios.post(url, req);

    // if (response?.header.rtnCode !== "000000") {
    //   throw { customError: true, payload: response };
    // }

    return response;
  } catch (err: any) {
    if (err.customError) {
      return err.payload;
    } else if (err.response?.data) {
      return err.response.data;
    } else {
      return {
        error: {
          url: "코드 정보",
          code: err.code ?? "UNKNOWN_ERROR",
          message: err.message ?? "An unknown error occurred",
        },
      };
    }
  }
};


export const editCodeInfo = async (body: { [key: string]: any }) => {
  try {
    const url = "https://kms.ictk.com/kms/admin/public/login/challenge";
    const req = {
      header: {
        trId: "12345",
      },
      body,
    };

    const { data: response } = await axios.post(url, req);

    // if (response?.header.rtnCode !== "000000") {
    //   throw { customError: true, payload: response };
    // }

    return response;
  } catch (err: any) {
    if (err.customError) {
      return err.payload;
    } else if (err.response?.data) {
      return err.response.data;
    } else {
      return {
        error: {
          url: "코드 정보",
          code: err.code ?? "UNKNOWN_ERROR",
          message: err.message ?? "An unknown error occurred",
        },
      };
    }
  }
};


export const deleteCodeInfo = async (body: { [key: string]: any }) => {
  try {
    const url = "https://kms.ictk.com/kms/admin/public/login/challenge";
    const req = {
      header: {
        trId: "12345",
      },
      body,
    };

    const { data: response } = await axios.post(url, req);

    // if (response?.header.rtnCode !== "000000") {
    //   throw { customError: true, payload: response };
    // }

    return response;
  } catch (err: any) {
    if (err.customError) {
      return err.payload;
    } else if (err.response?.data) {
      return err.response.data;
    } else {
      return {
        error: {
          url: "코드 정보",
          code: err.code ?? "UNKNOWN_ERROR",
          message: err.message ?? "An unknown error occurred",
        },
      };
    }
  }
};
