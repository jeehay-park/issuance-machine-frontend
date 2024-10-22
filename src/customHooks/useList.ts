import { useState } from "react";
import { FetchListParams } from "../utils/types";

type SortOption = {
  key: string;
  order: string;
};

export const useList = (
  itemsPerPage: number,
  params: FetchListParams,
  setParams: (
    value: FetchListParams | ((prevState: FetchListParams) => FetchListParams)
  ) => void,
  fetchList: Function
) => {
  const [sortOption, setSortOption] = useState<SortOption>({
    key: params.sortKeyName,
    order: params.order,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [keyName, setKeyname] = useState<string | null>(null);

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

  const handleSort = (headerKey: string) => {
    let newOrder = "ASC";

    console.log("handleSort : ", headerKey);

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
      sortKeyName: headerKey,
      order: newOrder,
      startNum: 0,
    };

    fetchList({
      ...newParams,
    });

    setParams((prevParams) => ({
      ...prevParams,
      sortKeyName: headerKey,
      order: newOrder,
      startNum: 0,
    }));
    setCurrentPage(1);
  };

  const handleSearch = (searchText: string, selectedOption: string) => {
    console.log("handleSearch clicked!");
    const newParams = {
      ...params,
      filter: searchText,
      startNum: 0,
    };

    fetchList({
      ...newParams,
    });

    setParams((prevParams) => ({
      ...prevParams,
      filter: searchText,
      startNum: 0,
    }));

    setKeyname(searchText);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    const newParams = {
      ...params,
      isHeaderInfo: true,
      rowCnt: 5,
      startNum: 0,
      sortKeyName: "updated_at", // 업데이트 시간
      order: "DESC",
      configType: "PROFILE",
      filter: null,
    };

    setParams((prevParams) => ({
      ...prevParams,
      isHeaderInfo: true,
      rowCnt: 5,
      startNum: 0,
      sortKeyName: "updated_at", // 업데이트 시간
      order: "DESC",
      configType: "PROFILE",
      filter: null,
    }));

    fetchList(newParams);
    setCurrentPage(1);
    setSortOption({
      key: "updated_at",
      order: "DESC",
    });
    console.log("refresh the page!");
  };

  return {
    sortOption,
    handleSort,
    currentPage,
    handlePageChange,
    handleRefresh,
    handleSearch,
  };
};
