import React from "react";
import warning from "../../src/components/assets/error.gif";

const NotFound: React.FC = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h2>404</h2>
        <h2>요청하신 페이지를 찾을 수 없습니다.</h2>
      </div>
    </>
  );
};

export default NotFound;
