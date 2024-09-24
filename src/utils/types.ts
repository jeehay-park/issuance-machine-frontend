
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
    filter?: string;
    filterArrAndOr?: string;
    filterArr?: filterArrProps[];
  };