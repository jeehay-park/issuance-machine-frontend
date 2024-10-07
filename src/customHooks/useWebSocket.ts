// src/hooks/useWebSocket.ts
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { WebSocketRequest, WebSocketResponse } from "../utils/types"; // Adjust path as necessary
import { dashboardAtom } from "../../src/recoil/atoms/dashboard"; // Assume you have an atom for WebSocket state
import { workAtom } from "../recoil/atoms/work";

const useWebSocket = (url: string, request: WebSocketRequest) => {
  const setWebSocketState = useSetRecoilState(
    url.includes("dashboard") ? dashboardAtom : workAtom
  );

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.addEventListener("open", () => {
      setWebSocketState((prev) => ({ ...prev, socket, isConnected: true }));

      // Send the request
      socket.send(JSON.stringify(request));
    });

    socket.addEventListener("message", (event) => {
      const response: WebSocketResponse = JSON.parse(event.data);

      // Process the response
      if (response.header.rtnCode === "SUCCESS") {
        setWebSocketState((prev) => ({
          ...prev,
          messages: response.body,
        }));
      } else {
        console.error("Error in response:", response.header.rtnMessage);
      }
    });

    socket.addEventListener("error", (event) => {
      console.error("WebSocket error observed:", event);
    });

    socket.addEventListener("close", () => {
      setWebSocketState((prev) => ({ ...prev, isConnected: false }));
    });

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, [url, request, setWebSocketState]);
};

export default useWebSocket;
