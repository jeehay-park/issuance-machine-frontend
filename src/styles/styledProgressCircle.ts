import styled from "styled-components";

const getBorderColor = (percent: number) => {
  if (percent < 50) {
    return "#4caf50"; // Green for less than 50%
  } else if (percent < 75) {
    return "#ff9800"; // Orange for 50%-74%
  } else {
    return "#f44336"; // Red for 75% and above
  }
};

export const ProgressWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

export const ProgressCircle = styled.div<{ percent: number }>`
  position: relative;
  width: 100px;
  height: 100px;
  background: conic-gradient(
    ${(props) => getBorderColor(props.percent)} ${(props) => props.percent}%,
    #e0e0e0 ${(props) => props.percent}%
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  color: #333;

  /* Inside white circle */
  &::before {
    content: "";
    position: absolute;
    top: 10px;
    left: 10px;
    width: 80px;
    height: 80px;
    background: #fff;
    border-radius: 50%;
  }

  /* Center percentage number */
  &::after {
    content: "${(props) => props.percent}%";
    position: absolute;
  }
`;
