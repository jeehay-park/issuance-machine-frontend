import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Title, TitleContainer } from "../../styles/styledTableLayout";
import { programInfoAtom, fetchProgramInfo } from "../../recoil/atoms/program";
import { useRecoilState, useSetRecoilState } from "recoil";

// 프로그램 상세 정보
const ProgramDetails: React.FC = () => {
  const { state } = useLocation();
  const [recoilData, setRecoilData] = useRecoilState(programInfoAtom);
  const [key, setKey] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchProgramInfo({
          progId: state.prog_id,
        });

        if (result) {
          setRecoilData(result.body);
          setKey(Object.keys(result.body));
        }
      } catch (error) {
        console.error("Error fetching program info:", error);
      }
    };
    fetchData();
  }, [state]);

  const arrayToString = (item: string[] | string | boolean) => {
    if (Array.isArray(item)) {
      let temp = [...item];

      if (temp.length === 0) {
        return null;
      } else {
        return temp.join(", ");
      }
    } else if (typeof item === "boolean") {
      return item === true ? "TRUE" : "FALSE";
    } else {
      return item;
    }
  };

  return (
    <>
      <Card>
        <TitleContainer>
          <Title>프로그램 상세정보</Title>
        </TitleContainer>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <ul style={{ padding: "50px 10px", listStyle: "none" }}>
              {key?.map((item) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "20px auto",
                    // border : '1px solid pink',
                    margin: "20px auto",
                  }}
                >
                  <li
                    style={{
                      width: "200px",
                      padding: "20px auto",
                      fontWeight: "bold",
                    }}
                  >
                    {item}
                  </li>
                  <li style={{ padding: "20px auto" }}>
                    {recoilData
                      ? arrayToString(recoilData[item])
                      : "Loading..."}
                  </li>
                </div>
              ))}
            </ul>
          </div>
          {/* <div>box 1</div> */}
        </div>
      </Card>
    </>
  );
};

export default ProgramDetails;
