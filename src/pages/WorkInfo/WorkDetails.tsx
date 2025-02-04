import React, { useEffect, useState } from "react";
import { Button, Card } from "../../styles/styledTableLayout";
import {
  FormContainer,
  FormRow,
  FormLabel,
  FormInput,
} from "../../styles/styledForm";
import {
  ProgressCircle,
  ProgressWrapper,
} from "../../styles/styledProgressCircle";
import { selectedRowAtom } from "../../recoil/atoms/selected";
import { useRecoilValue } from "recoil";
import { HandlerButton } from "../../styles/styledIssuance";
import HandlerModal from "./HandlerModal";

type DataType = {
  workId: string;
  startedAt: string;
  completedExpAt: string;
  remainedTime: string;
  resourceInfo: {
    cpuUsage: string;
    memUsage: string;
    memIncrease: string;
  };
  targetQnty: number;
  completedQnty: number;
  remainedQnty: number;
  failedQnty: number;
  sampleQnty: number;
  workStatus: string;
  deviceHandlers: Array<{ [key: string]: any }> | null;
};

const WorkDetails: React.FC = () => {
  const [data, setData] = useState<DataType | null>(null);
  const selectedRow = useRecoilValue(selectedRowAtom);
  console.log(selectedRow);

  useEffect(() => {
    // Connect to the updated WebSocket endpoint
    const wsUrl = "ws://localhost:17777/ws/work/500111";
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log("WebSocket connection established");
      socket.send(
        JSON.stringify({
          header: {
            type: "reconnect",
            clientId: "sfsfs",
          },
          body: {
            workId: "wk_01",
            duration: "12345",
          },
        })
      );
    };

    // Handle incoming messages
    socket.onmessage = (event) => {
      console.log("Received message:", event.data);

      try {
        const { header, body } = JSON.parse(event.data);
        setData(body);
      } catch (error) {
        console.log("Error occured:", error);
      }
    };

    // Handle connection closure
    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Handle any errors
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "10px",
          }}
        >
          <HandlerModal>
          <Button>핸들러</Button>
          </HandlerModal>
         
          <Button>SN 중복 확인</Button>
          <Button>출력 리포트</Button>
          <Button>작업 복구</Button>
          <Button>작업 종료</Button>
        </div>

        <hr></hr>

        <FormContainer
          style={{ alignItems: "center", maxHeight: "70vh", overflowY: "auto" }}
        >
          <form>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <FormRow>
                <FormLabel htmlFor="progName">작업 모드</FormLabel>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "1rem",
                  }}
                >
                  <Button>발급 모드</Button>
                  <></>
                  <Button>샘플 모드</Button>
                </div>
              </FormRow>

              <FormRow>
                <FormLabel htmlFor="progName">작업 제어</FormLabel>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "1rem",
                  }}
                >
                  <Button>작업 시작</Button>
                  <></>
                  <Button>작업 종료</Button>
                </div>
              </FormRow>
            </div>

            <FormRow>
              <FormLabel htmlFor="progName">작업명</FormLabel>
              <p>{selectedRow?.tag_name}</p>
            </FormRow>

            <FormRow>
              <FormLabel htmlFor="progName">작업정보</FormLabel>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  background: "#f9f9f9",
                  padding: "1rem 2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    justifyContent: "flex-start",
                    width: "45%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "1rem",
                    }}
                  >
                    <FormRow>1. 발급기계</FormRow>
                    <FormInput value={"1호기"} disabled />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "1rem",
                    }}
                  >
                    <FormRow>2. 프로그램</FormRow>
                    <FormInput value={"V3-UUI ( proj_73 )"} disabled />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "1rem",
                    }}
                  >
                    <FormRow style={{ marginRight: "1rem" }}>3. 핸들러</FormRow>
                    <FormInput
                      value={
                        "G3-LG(IMB100LgIssueWithSamServerTestCodeSessionHandler)"
                      }
                      disabled
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    justifyContent: "flex-start",
                    width: "50%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "1rem",
                    }}
                  >
                    <FormRow style={{ width: "8rem" }}>4. 프로파일</FormRow>
                    <FormInput
                      value={"230717_G3_Rev3_CNS_v1.00.json"}
                      disabled
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "1rem",
                    }}
                  >
                    <FormRow style={{ width: "8rem" }}>5. 키발급코드</FormRow>
                    <FormInput
                      value={"g3_lg_sam_lgu_real.json, 키발급 환경값"}
                      disabled
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "1rem",
                    }}
                  >
                    <FormRow style={{ width: "8rem" }}>6. SN 규칙</FormRow>
                    <FormInput
                      value={"G3_LGU_1 , SN 암호화 : TRUE , 테스트락 : TRUE"}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </FormRow>

            <FormRow>
              <FormLabel htmlFor="progName">작업시간</FormLabel>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "1rem",
                }}
              >
                <FormRow>시작 시간</FormRow>
                <FormInput value={data?.startedAt} disabled />

                <FormRow>완료 예상 시간</FormRow>
                <FormInput value={data?.completedExpAt} disabled />

                <FormRow>남은 시간</FormRow>
                <FormInput value={data?.remainedTime} disabled />
              </div>
            </FormRow>

            <FormRow>
              <FormLabel htmlFor="progName">리소스</FormLabel>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {/* CPU */}
                <div
                  style={{
                    textAlign: "center",
                    flex: "0.3",
                    padding: "0.5rem 0.5rem",
                    border: "1px solid #c1c1c1",
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    color: "#333",
                    justifyContent: "space-around",
                    fontWeight: "bold",
                    alignItems: "center",
                    boxShadow:
                      "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    CPU 사용량
                  </p>

                  <ProgressWrapper>
                    <ProgressCircle
                      percent={parseInt(data?.resourceInfo?.cpuUsage as string)}
                    />
                  </ProgressWrapper>

                  <p style={{color : "#eaeaea"}}>104 GB</p>
                </div>

                {/* CPU */}
                <div
                  style={{
                    textAlign: "center",
                    flex: "0.3",
                    padding: "0.5rem 0.5rem",
                    border: "1px solid #c1c1c1",
                    color: "#333",
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    justifyContent: "space-around",
                    alignItems: "center",
                    fontWeight: "bold",
                    boxShadow:
                      "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <p>Memory 사용량</p>
                  <ProgressWrapper>
                    <ProgressCircle
                      percent={parseInt(data?.resourceInfo?.memUsage as string)}
                    />
                  </ProgressWrapper>
                  <p style={{color : "#eaeaea"}}>900 MB</p>
                </div>

                {/* CPU */}
                <div
                  style={{
                    textAlign: "center",
                    flex: "0.3",
                    padding: "0.5rem 0.5rem",
                    border: "1px solid #c1c1c1",
                    color: "#333",
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    justifyContent: "space-around",
                    alignItems: "center",
                    fontWeight: "bold",
                    boxShadow:
                      "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <p>Memory 증가량</p>
                  <ProgressWrapper>
                    <ProgressCircle
                      percent={parseInt(
                        data?.resourceInfo?.memIncrease as string
                      )}
                    />
                  </ProgressWrapper>
                  <p style={{color : "#eaeaea"}}>800 MB</p>
                </div>
              </div>
            </FormRow>

            <FormRow>
              <FormLabel htmlFor="progName">장비상태</FormLabel>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {/* 목표/완성/잔여 */}
                <div
                  style={{
                    textAlign: "center",
                    flex: "0.3",
                    padding: "0.5rem 0.5rem",
                    color: "#28A745",
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    justifyContent: "space-around",
                    fontWeight: "bold",
                    border: "1px solid #28A745",
                    boxShadow:
                      "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <p>목표/완성/잔여 갯수</p>

                  <p>
                    {data?.targetQnty} / {data?.completedQnty} /{" "}
                    {data?.remainedQnty}
                  </p>
                </div>

                {/* 샘플 개수 */}
                <div
                  style={{
                    textAlign: "center",
                    flex: "0.3",
                    padding: "0.5rem 0.5rem",
                    border: "1px solid #0288D1",
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    gap: "1rem",
                    fontWeight: "bold",
                    color: "#0288D1",
                    boxShadow:
                      "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <p>샘플 갯수</p>
                  <p>{data?.sampleQnty}</p>
                </div>

                {/* 실패 갯수 */}
                <div
                  style={{
                    textAlign: "center",
                    flex: "0.3",
                    padding: "0.5rem 0.5rem",
                    border: "1px solid #DC3545",
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    color: "#DC3545",
                    fontWeight: "bold",
                    gap: "1rem",
                    boxShadow:
                      "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <p>실패 갯수</p>
                  <p>{data?.failedQnty}</p>
                </div>
              </div>
            </FormRow>

            {/* 핸들러 상태 */}
            <FormRow>
              <FormLabel htmlFor="progName">핸들러 상태</FormLabel>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    flex: "0.05",
                    textWrap: "wrap",
                    border: "1px solid #c1c1c1",
                    borderRadius: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  1
                </div>
                <div
                  style={{
                    flex: "0.4",
                    border: "1px solid #c1c1c1",
                    borderRadius: "1rem",
                    display: "flex",
                    gap: "0.5rem",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "0.5rem 0.5rem",
                  }}
                >
                  <p
                    style={{
                      textWrap: "wrap",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      background: "#f9f9f9",
                      padding: "0.5rem 0.5rem",
                      borderRadius: "1rem",
                    }}
                  >
                    hdi_8984_dve_1_ip_150_mcn_1_wki_956
                  </p>
                  <p
                    style={{
                      textWrap: "wrap",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      background: "#f9f9f9",
                      padding: "0.5rem 0.5rem",
                      borderRadius: "1rem",
                    }}
                  >
                    session_no_20240829_004452
                  </p>
                </div>
                <div
                  style={{
                    flex: "0.4",
                    border: "1px solid #c1c1c1",
                    borderRadius: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0.5rem 0.5rem",
                  }}
                >
                  <p
                    style={{
                      textWrap: "wrap",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      background: "#f9f9f9",
                      padding: "0.5rem 0.5rem",
                      borderRadius: "1rem",
                    }}
                  >
                    count_loose_connection=0,
                    last_error=FAIL_BURNING(HANDLER_STATUS.BURNING)
                    C,TF,.result=OK, fail rate:1.12 %
                  </p>
                </div>
                <HandlerButton color="#DC3545" flex="0.1">
                  BURNING
                </HandlerButton>
              </div>
            </FormRow>

            {/* 핸들러 상태 2 */}
            <FormRow>
              <FormLabel htmlFor="progName" style={{ visibility: "hidden" }}>
                핸들러 상태
              </FormLabel>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    flex: "0.05",
                    textWrap: "wrap",
                    border: "1px solid #c1c1c1",
                    borderRadius: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  2
                </div>
                <div
                  style={{
                    flex: "0.4",
                    border: "1px solid #c1c1c1",
                    borderRadius: "1rem",
                    display: "flex",
                    gap: "0.5rem",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "0.5rem 0.5rem",
                  }}
                >
                  <p
                    style={{
                      textWrap: "wrap",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      background: "#f9f9f9",
                      padding: "0.5rem 0.5rem",
                      borderRadius: "1rem",
                    }}
                  >
                    hdi_8984_dve_1_ip_150_mcn_1_wki_956
                  </p>
                  <p
                    style={{
                      textWrap: "wrap",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      background: "#f9f9f9",
                      padding: "0.5rem 0.5rem",
                      borderRadius: "1rem",
                    }}
                  >
                    session_no_20240829_004452
                  </p>
                </div>
                <div
                  style={{
                    flex: "0.4",
                    border: "1px solid #c1c1c1",
                    borderRadius: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0.5rem 0.5rem",
                  }}
                >
                  <p
                    style={{
                      textWrap: "wrap",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      background: "#f9f9f9",
                      padding: "0.5rem 0.5rem",
                      borderRadius: "1rem",
                    }}
                  >
                    count_loose_connection=0,
                    last_error=FAIL_BURNING(HANDLER_STATUS.BURNING)
                    C,TF,.result=OK, fail rate:1.12 %
                  </p>
                </div>
                <HandlerButton color="#0288D1" flex="0.1">
                  READY
                </HandlerButton>
              </div>
            </FormRow>

            {/* 핸들러 상태 3 */}
            <FormRow>
              <FormLabel htmlFor="progName" style={{ visibility: "hidden" }}>
                핸들러 상태
              </FormLabel>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    flex: "0.05",
                    textWrap: "wrap",
                    border: "1px solid #c1c1c1",
                    borderRadius: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  3
                </div>
                <div
                  style={{
                    flex: "0.4",
                    border: "1px solid #c1c1c1",
                    borderRadius: "1rem",
                    display: "flex",
                    gap: "0.5rem",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "0.5rem 0.5rem",
                  }}
                >
                  <p
                    style={{
                      textWrap: "wrap",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      background: "#f9f9f9",
                      padding: "0.5rem 0.5rem",
                      borderRadius: "1rem",
                    }}
                  >
                    hdi_8984_dve_1_ip_150_mcn_1_wki_956
                  </p>
                  <p
                    style={{
                      textWrap: "wrap",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      background: "#f9f9f9",
                      padding: "0.5rem 0.5rem",
                      borderRadius: "1rem",
                    }}
                  >
                    session_no_20240829_004452
                  </p>
                </div>
                <div
                  style={{
                    flex: "0.4",
                    border: "1px solid #c1c1c1",
                    borderRadius: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0.5rem 0.5rem",
                  }}
                >
                  <p
                    style={{
                      textWrap: "wrap",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      background: "#f9f9f9",
                      padding: "0.5rem 0.5rem",
                      borderRadius: "1rem",
                    }}
                  >
                    count_loose_connection=0,
                    last_error=FAIL_BURNING(HANDLER_STATUS.BURNING)
                    C,TF,.result=OK, fail rate:1.12 %
                  </p>
                </div>
                <HandlerButton color="#28A745" flex="0.1">
                  CONNECTING
                </HandlerButton>
              </div>
            </FormRow>
          </form>
        </FormContainer>
      </Card>
    </>
  );
};

export default WorkDetails;
