import { useState } from "react";
import { FetchListParams } from "./types";

interface SortOption {
  key: number;
  order: string;
}

export const useSort = (
  itemsPerPage: number,
  params: FetchListParams,
  setParams: (
    value: FetchListParams | ((prevState: FetchListParams) => FetchListParams)
  ) => void,
  fetchList: Function
) => {

  const [sortOption, setSortOption] = useState<SortOption>({
    key: params.sortIdx,
    order: params.order,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    const newParams = {
      ...params,
      startNum: (page - 1) * itemsPerPage,
    };

    fetchList({
      ...newParams,
    });

    setParams((prevParams) => ({
      ...prevParams,
      startNum: (page - 1) * itemsPerPage,
    }));
  };

  const handleSort = (headerKey: number) => {
    let newOrder = "ASC";

    if (sortOption.key === headerKey) {
      newOrder = sortOption.order === "ASC" ? "DESC" : "ASC";
    } else {
      newOrder = "ASC"; // Default to ASC when a new column is sorted
    }

    setSortOption({
      key: headerKey,
      order: newOrder,
    });

    const newParams = {
      ...params,
      sortIdx: headerKey,
      order: newOrder,
    };

    fetchList({
      ...newParams,
    });

    setParams((prevParams) => ({
      ...prevParams,
      sortIdx: headerKey,
      order: newOrder,
    }));
  };

  return { sortOption, handleSort, currentPage, handlePageChange };
};
