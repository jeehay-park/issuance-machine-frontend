import React, { ReactNode } from "react";

const Card: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          height: "80%",
          boxShadow:
            "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // border: "1px solid pink",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Card;
