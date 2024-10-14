import { useState } from "react";
import { FetchListParams } from "../utils/types";

type SortOption = {
  key: number;
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
    key: params.sortIdx,
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

  const handleSearch = (searchText: string, selectedOption: string) => {
    console.log("handleSearch clicked!");
    const newParams = {
      ...params,
      filter: searchText,
    };

    console.log(newParams);

    fetchList({
      ...newParams,
    });

    setParams((prevParams) => ({
      ...prevParams,
      filter: searchText,
    }));

    setKeyname(searchText);
  };

  const handleRefresh = () => {
    fetchList(params);
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
