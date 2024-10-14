export type filterArrProps = {
  filterOp: string;
  keyName: string;
  keyValue: string;
};

export type FetchListParams = {
  isHeaderInfo: boolean;
  rowCnt: number;
  startNum: number;
  sortIdx: number;
  order: string;
  filter?: string | null;
  filterArrAndOr?: string;
  filterArr?: filterArrProps[];
  configType?: string;
};

export type dynamicObject = {
  [key: string]: any;
};

export type rowType = {
  [key: string]: any;
};

export interface WebSocketRequest {
  header: { [key: string]: any };
  body: { [key: string]: any };
}

export interface WebSocketResponse {
  header: { [key: string]: any };
  body: { [key: string]: any };
}
