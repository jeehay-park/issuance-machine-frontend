import { customCreateAtom } from "../../utils/customCreateAtom";
import { customApiRequest } from "../../utils/customApiRequest";
import useWebSocket from "../../customHooks/useWebSocket";

// 대시보드 - 발급요약 및 발급장비 정보 API
export const dashboardStatusAtom = customCreateAtom("dashboardStatus");
export const fetchDashboardStatus = async (body: { [key: string]: any }) => {
  const url = "/dashboard/status";
  const trId = process.env.REACT_APP_TRID_DASHBOARD_STATUS!;
  return customApiRequest(url, trId, body);
};

// 대시보드 - 발급요약 및 발급장비 정보 API
export const dashboardAtom = customCreateAtom("dashboardStatus");
export const fetchDashboard = async (body: { [key: string]: any }) => {
  const url = "wss://${server_ip}:${server_port}/ws/dashboard/${trId}";
  const request = {
    header: {
      type: "data",
      clientId : "UUID",
    },
    body
  };

  useWebSocket(url, request);
};
