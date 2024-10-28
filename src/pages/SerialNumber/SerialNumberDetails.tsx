import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Title, TitleContainer } from "../../styles/styledTableLayout";
import { fetchSnruleInfo, snruleInfoAtom } from "../../recoil/atoms/snrule";
import { useRecoilState, useSetRecoilState } from "recoil";

// 시리얼 넘버 상세정보
const SerialNumberDetails: React.FC = () => {
  const { state } = useLocation();
  const [recoilData, setRecoilData] = useRecoilState(snruleInfoAtom);
  const [key, setKey] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchSnruleInfo({
          snrId: state.snr_id,
        });

        if (result) {
          setRecoilData(result.body);
          setKey(Object.keys(result.body));
        }
      } catch (error) {
        console.error("Error fetching serial number info:", error);
      }
    };
    fetchData();
  }, [state]);

  console.log("recoidlData : ", recoilData);

  return (
    <>
      <Card>
        <TitleContainer>
          <Title>시리얼 넘버 상세정보</Title>
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
                    {recoilData ? recoilData[item] : "Loading..."}
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

export default SerialNumberDetails;
