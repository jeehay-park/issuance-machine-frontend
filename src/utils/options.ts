export const chipOtpions = ["NONE", "IL005_V2", "G5", "G3"];
export const sessionHandlerOptions = [
  "G1-GEN",
  "G1-HAIER",
  "G3-GEN",
  "G3-LG",
  "G3-LG-SAMCHECK",
  "GEN-SIMUL",
  "HAIER-SIMUL",
  "IMB300-GEN",
  "LG-SIMUL",
  "LG-VERIFY",
  "VERIFY_SN_PUF",
];

export const statusOptions = ["ACTIVE", "NOTUSE", "DELETED"];
export const companyCodeOptions = ["LGU", "HAIER", "LG_INNOTEK", "GLOBAL"];
export const countryCodeOptions = ["GLOBAL"];
export const interfaceTypeOptions = ["I2C", "SPI", "ONE_WIRE", "e7816"];
export const packageTypeOptions = ["SOIC", "uDFN", "SOT_23", "e7816"];
export const etcOptions = [];
export const testCodeoptions = [];
export const reportOptions = [
  { value: "", displayName: "-- 선택 --" },
  { value: "success", displayName: "성공결과" },
  { value: "successJson", displayName: "성공결과json" },
  { value: "failure", displayName: "실패 결과" },
  { value: "failureJson", displayName: "실패 결과(JSON)" },
  { value: "sample", displayName: "샘플" },
  { value: "successSample10", displayName: "성공 샘플 10개" },
  { value: "regularOutput", displayName: "일반 산출물" },
];

export const workCommand: { [key: string]: string } = {
  START: "시작",
  STOP: "중지",
  RESTORE: "복구",
  FINISH: "종료",
};

