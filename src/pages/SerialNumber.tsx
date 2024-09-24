import React, { useState } from "react";
import DynamicTable from "../components/Table/DynamicTable";
import Search from "../components/Table/Search";
import { Button, Card, TitleContainer, Title} from "../styles/styledTableLayout";
import { codeInfoResponse } from "../mockData/mockData";

const SerialNumber: React.FC = () => {   
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState({
        key: 1, order: "DESC"
    })

    const headers = codeInfoResponse.body.headerInfos.map((item) => item.name);
    const keyName = codeInfoResponse.body.headerInfos.map((item) => item.keyName);
    const headerInfos = codeInfoResponse.body.headerInfos;
    const data = codeInfoResponse.body.items;
  
    const handleSearch = (searchText: string, selectedOption: string) => {
        console.log(`Searching for "${searchText}" in "${selectedOption}"`);
      };
    
      const handleSort = (headerKey: number) => {
        let newOrder;
    
        if (sortOption?.key === headerKey) {
          newOrder = sortOption.order === "ASC" ? "DESC" : "ASC";
        } else {
          newOrder = "ASC"; // Default to ASC when a new column is sorted
        }
    
        setSortOption({
          key: headerKey,
          order: newOrder,
        });
      };
    
      const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };



    return(<>
    
    </>)
}

export default SerialNumber;