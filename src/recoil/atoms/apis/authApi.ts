import axios from "axios";

export const login = async (body: { [key: string]: any }) => {
  try {
    const url = "http://localhost:5000/challenge";
    const data = {
      header: {
        trId: "020001",
      },
      body,
    };
    const { data: response } = await axios.get(url);

    if (response?.header?.rtnCode !== "000000") {
      throw { customError: true, payload: response };
    }

    return response;
  } catch (err: any) {
    if (err.customError) {
      return err.payload;
    } else if (err.response && err.response.data) {
      return err.response.data;
    } else {
      return {
        error: {
          url: "로그인",
          code: err.code,
          message: err.message,
        },
      };
    }
  }
};
