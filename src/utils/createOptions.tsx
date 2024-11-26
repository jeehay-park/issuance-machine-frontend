import React from "react";

export const createOptions = (arr: string[]) => {
  return arr.map((str, index) => (
    <option key={index} value={str}>
      {str}
    </option>
  ));
};
