import customAxios from "./customAxios";

// Utility to handle API calls
export const customApiRequest = async (
  url: string,
  trId: string,
  body: { [key: string]: any }
) => {
  try {
    const req = {
      header: {
        trId,
      },
      body,
    };

    const { data: response } = await customAxios.post(url, req);

    if (response?.header.rtnCode !== process.env.REACT_APP_SUCCESS_RTNCODE) {
      throw { customError: true, payload: response };
    }

    return response;
  } catch (err: any) {
    console.log("axios error", err);

    if (err.customError) {
      return err.payload;
    } else {
      return {
        error: {
          code: err?.code ?? "UNKNOWN_ERROR",
          message: err?.message ?? "An unknown error occurred",
          details: "An unexpected error occurred. Please try again later.",
        },
      };
    }
  }
};
