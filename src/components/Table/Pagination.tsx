import React, { useEffect, useState } from "react";
import { PaginationBox } from "../../styles/styledPagination";

type PaginationProps = {
  currentPage: number;
  totCnt: number;
  itemsPerPage: number;
  handlePageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totCnt,
  itemsPerPage,
  handlePageChange,
}) => {
  const [pages, setPages] = useState<number[]>([]);
  const [startPage, setStartPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    const totalPages = Math.ceil(totCnt / itemsPerPage);
    let tempArr = Array(totalPages)
      .fill(0)
      .map((item, index) => index + 1);

    setLastPage(tempArr[tempArr.length - 1]);

    if (tempArr.length <= 10) {
      setPages(tempArr);
      setStartPage(tempArr[0]);
    } else {
      if (currentPage % 10 !== 0) {
        const newStart = Math.floor(currentPage / 10);
        tempArr = tempArr.slice(newStart * 10, newStart * 10 + 10);
        setPages(tempArr);
        setStartPage(tempArr[0]);
      } else {
        const newEnd = Math.floor(currentPage / 10);
        tempArr = tempArr.slice((newEnd - 1) * 10, newEnd * 10);
        setPages(tempArr);
        setStartPage(tempArr[0]);
      }
    }
  }, [currentPage]);

  if (totCnt > 0) {
    return (
      <>
        <div>
          <PaginationBox>
            <ul>
              <li
                onClick={() => {
                  if (currentPage !== 1) handlePageChange(currentPage - 1);
                }}
              >
                «
              </li>

              {pages.map((page) => (
                <li
                  onClick={() => handlePageChange(page)}
                  style={{
                    background: page === currentPage ? "#768398" : undefined,
                    color: page === currentPage ? "white" : undefined,
                  }}
                >
                  {page}
                </li>
              ))}

              <li
                onClick={() => {
                  if (currentPage !== lastPage)
                    handlePageChange(currentPage + 1);
                }}
              >
                »
              </li>
            </ul>
          </PaginationBox>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default Pagination;