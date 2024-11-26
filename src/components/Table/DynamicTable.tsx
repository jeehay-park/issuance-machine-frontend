import React, { useState } from "react";
import { selectedRowAtom } from "../../recoil/atoms/selected";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { dynamicObject, rowType } from "../../utils/types";
import { Link } from "react-router-dom";
import { Button } from "../../styles/styledTableLayout";
import CodeEnumModal from "../../pages/CodeInfo/CodeEnumModal";

type SortOption = {
  key: string; // Assuming 'key' is the index of the header
  order: string; // Restricting order to only "ASC" or "DESC"
};

type TableProps = {
  headers: string[] | null; // Array of header titles
  keyName: string[] | null;
  data: Array<{ [key: string]: any }> | null; // Array of objects for the rows
  checkbox: Boolean;
  handleAddTab?: (item: string) => void;
  height?: string;
  headerInfos?: Array<{ [key: string]: any }> | null;
  sortOption?: SortOption; // Optional sorting information
  handleSort?: (headerKey: string) => void;
};

const DynamicTable: React.FC<TableProps> = ({
  headers,
  data,
  keyName,
  checkbox,
  height,
  handleAddTab,
  headerInfos,
  sortOption,
  handleSort,
}) => {
  const [checkedRow, setCheckedRow] = useState<dynamicObject | null>(null);
  const setSelectedRowState = useSetRecoilState(selectedRowAtom);
  const selectedRow = useRecoilValue(selectedRowAtom);
  const handleRowClick = (row: rowType) => {
    console.log("row : ", row);
    if (selectedRow === row) {
      setCheckedRow(null);
      setSelectedRowState(null);
    } else {
      setCheckedRow(row);
      setSelectedRowState(row);
    }
  };

  const showText = (str: String | null | boolean) => {
    if (typeof str === "boolean") {
      return str === true ? "true" : "false";
    } else {
      return str;
    }
  };

  return (
    <div style={{ height: height || "400px", overflowY: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr>
            {checkbox ? (
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f1f1f1",
                  borderBottom: "2px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                  fontFamily: "Noto Sans KR",
                  color: "#777",
                  fontSize: "15px",
                  width: "60px",
                }}
              >
                선택
              </th>
            ) : undefined}

            {headerInfos?.map((header, index) =>
              header.isDisplay || header.display ? (
                <th
                  key={index}
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#f1f1f1",
                    borderBottom: "2px solid #ddd",
                    padding: "8px",
                    fontSize: "15px",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        textDecoration: header.isFilter
                          ? "underline"
                          : undefined,
                      }}
                    >
                      {header.name}
                    </div>
                    <div>
                      {header.sort && (
                        <span
                          onClick={() => {
                            if (handleSort) handleSort(header.keyName);
                          }} // Sort based on the column clicked
                        >
                          {header.keyName === sortOption?.key &&
                          sortOption?.order === "ASC" ? (
                            <span style={{ color: "red" }}>&#9650;</span> // ▲ Up Arrow for ASC
                          ) : (
                            <span style={{ color: "blue" }}>&#9660;</span> // ▼ Down Arrow for DESC or initial state
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </th>
              ) : undefined
            )}
          </tr>
        </thead>

        <tbody
          style={{
            whiteSpace: "normal",
            overflow: "visible",
            wordWrap: "break-word",
          }}
        >
          {data && data?.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {checkbox && (
                  <td
                    style={{
                      borderBottom: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                      color: "#777",
                    }}
                    onClick={() => handleRowClick(row)}
                  >
                    <input type="checkbox" checked={selectedRow === row} />
                  </td>
                )}
                {keyName?.map((keyNameItem, colIndex) => (
                  <>
                    {keyNameItem === "name" && handleAddTab ? (
                      <td
                        key={colIndex}
                        style={{
                          borderBottom: "1px solid #ddd",
                          padding: "8px",
                          textDecoration: "underline",
                          color: "#777",
                        }}
                        onClick={() => handleAddTab(row["workNo"])}
                      >
                        {row[keyNameItem]}
                      </td>
                    ) : keyNameItem === "snr_id" ? (
                      <td
                        style={{
                          textDecoration: "underline",
                          borderBottom: "1px solid #ddd",
                          padding: "8px",
                          color: "#777",
                        }}
                      >
                        <Link
                          to={{ pathname: "/serialnumber/details" }}
                          state={{ snr_id: row[keyNameItem] }}
                        >
                          {row[keyNameItem]}
                        </Link>
                      </td>
                    ) : keyNameItem === "prof_id" ? (
                      <td
                        style={{
                          textDecoration: "underline",
                          borderBottom: "1px solid #ddd",
                          padding: "8px",
                          color: "#777",
                        }}
                      >
                        <Link
                          to={{ pathname: "/profile/details" }}
                          state={{ prof_id: row[keyNameItem] }}
                        >
                          {row[keyNameItem]}
                        </Link>
                      </td>
                    ) : keyNameItem === "mcn_id" ? (
                      <td
                        style={{
                          textDecoration: "underline",
                          borderBottom: "1px solid #ddd",
                          padding: "8px",
                          color: "#777",
                        }}
                      >
                        <Link
                          to={{ pathname: "/machine/details" }}
                          state={{ mcn_id: row[keyNameItem] }}
                        >
                          {row[keyNameItem]}
                        </Link>
                      </td>
                    ) : keyNameItem === "keyis_id" ? (
                      <td
                        style={{
                          textDecoration: "underline",
                          borderBottom: "1px solid #ddd",
                          padding: "8px",
                          color: "#777",
                        }}
                      >
                        <Link
                          to={{ pathname: "/keyissue/details" }}
                          state={{ keyis_id: row[keyNameItem] }}
                        >
                          {row[keyNameItem]}
                        </Link>
                      </td>
                    ) : keyNameItem === "scrt_id" ? (
                      <td
                        style={{
                          textDecoration: "underline",
                          borderBottom: "1px solid #ddd",
                          padding: "8px",
                          color: "#777",
                        }}
                      >
                        <Link
                          to={{ pathname: "/script/details" }}
                          state={{ scrt_id: row[keyNameItem] }}
                        >
                          {row[keyNameItem]}
                        </Link>
                      </td>
                    ) : keyNameItem === "prog_id" ? (
                      <td
                        style={{
                          textDecoration: "underline",
                          borderBottom: "1px solid #ddd",
                          padding: "8px",
                          color: "#777",
                        }}
                      >
                        <Link
                          to={{ pathname: "/program/details" }}
                          state={{ prog_id: row[keyNameItem] }}
                        >
                          {row[keyNameItem]}
                        </Link>
                      </td>
                    ) : keyNameItem === "code_enum" ? (
                      <td
                        style={{
                          textDecoration: "underline",
                          borderBottom: "1px solid #ddd",
                          padding: "8px",
                          color: "#777",
                          textAlign: "center",
                        }}
                      >
                        <CodeEnumModal row={row}>
                          <Button>ENUM</Button>
                        </CodeEnumModal>
                      </td>
                    ) : (
                      <td
                        key={colIndex}
                        style={{
                          borderBottom: "1px solid #ddd",
                          padding: "8px",
                          color: "#777",
                        }}
                      >
                        {showText(row[keyNameItem])}
                        {/* Render data or fallback to '-' */}
                      </td>
                    )}
                  </>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers?.length}
                style={{ padding: "8px", textAlign: "center" }}
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
