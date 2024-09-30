import React, { useEffect, useState } from "react";
import { dynamicObject } from "../utils/types";

interface errorMessage {
  error?: dynamicObject | null;
}
const Error: React.FC<errorMessage> = ({ error }) => {
  const [show, setShow] = useState<string[] | null>(null);

  useEffect(() => {
    if (error) {
      let temp: string[] = [];
      for (const [key, value] of Object.entries(error)) {
        temp.push(`${key} : ${value}`);
      }

      setShow(temp);
    }
  }, [error]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px",
          background: "inherit",
          height: "calc(100vh - 100px)",
        }}
      >
        <h3 style={{ padding: "10px 10px" }}>
          데이터를 불러오는 중 오류가 발생했습니다.
        </h3>

        {show && (
          <div style={{ padding: "10px 20px" }}>
            {show?.map((item) => (
              <p style={{ padding: "5px" }}>{item}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Error;
