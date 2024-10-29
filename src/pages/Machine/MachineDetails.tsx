import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Title, TitleContainer } from "../../styles/styledTableLayout";
import { fetchMachineInfo, machineInfoAtom } from "../../recoil/atoms/machine";
import { useRecoilState, useRecoilValue } from "recoil";
import { dynamicObject } from "../../utils/types";
import SimpleTable from "../../components/Table/SimpleTable";
import { selectedRowAtom } from "../../recoil/atoms/selected";
import { Button } from "../../styles/styledTableLayout";
import AddDevice from "./AddDevice";

// 발급 기계 상세정보
const MachineDetails: React.FC = () => {
  const { state } = useLocation();
  const selectedRow = useRecoilValue(selectedRowAtom);
  const [recoilData, setRecoilData] = useRecoilState(machineInfoAtom);
  const [machineHeader, setMachineHeader] = useState<string[] | null>(null);
  const [deviceHeader, setDeviceHeader] = useState<string[] | null>(null);
  const [DeviceData, setDeviceData] = useState<dynamicObject[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchMachineInfo({
          mcnId: state.mcn_id,
        });

        if (result) {
          setRecoilData(result.body);
          setMachineHeader(
            Object.keys(result.body).filter((str) => str !== "deviceList")
          );
          setDeviceData(result.body.deviceList);

          if (result.body.deviceList?.length > 0) {
            setDeviceHeader(Object.keys(result.body.deviceList[0]));
          }
        }
      } catch (error) {
        console.error("Error fetching serial number info:", error);
      }
    };
    fetchData();
  }, [state]);

  const handleRefresh = async () => {
    await fetchMachineInfo({
      mcnId: state.mcn_id,
    });
  };

  return (
    <>
      <Card>
        <TitleContainer>
          <Title>발급 기계 상세정보</Title>
        </TitleContainer>
        <SimpleTable headers={machineHeader} obj={recoilData} />

        <br></br>
        <br></br>
        <br></br>

        <TitleContainer>
          <Title>디바이스 목록</Title>
        </TitleContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "2px",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {DeviceData && (
              <AddDevice
                lastDeviceNumber={DeviceData?.length}
                mcnId={state.mcn_id}
                handleRefresh={handleRefresh}
              >
                <Button>추가</Button>
              </AddDevice>
            )}

            <Button disabled={selectedRow === null}>변경</Button>

            <Button disabled={selectedRow === null}>삭제</Button>
          </div>
        </div>

        <SimpleTable headers={deviceHeader} arr={DeviceData} checkbox={true} />
      </Card>
    </>
  );
};

export default MachineDetails;
