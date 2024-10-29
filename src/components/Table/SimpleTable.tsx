import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { selectedRowAtom } from "../../recoil/atoms/selected";
import { dynamicObject, rowType } from "../../utils/types";

type SimpleTableProps = {
  headers: string[] | null;
  obj?: { [key: string]: any } | null;
  arr?: { [key: string]: any }[] | null;
  checkbox?: Boolean;
};

const SimpleTable: React.FC<SimpleTableProps> = ({
  headers,
  obj,
  arr,
  checkbox,
}) => {
  const [checkedRow, setCheckedRow] = useState<dynamicObject | null>(null);
  const [selectedRow, setSelectedRow] = useRecoilState(selectedRowAtom);

  const handleRowClick = (row: rowType) => {
    console.log("row : ", row);
    if (selectedRow === row) {
      setCheckedRow(null);
      setSelectedRow(null);
    } else {
      setCheckedRow(row);
      setSelectedRow(row);
    }
  };

  return (
    <>
      <div>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr>
              {arr && arr?.length > 0 && checkbox ? (
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
              {headers?.map((item, index) => (
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
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody
            style={{
              whiteSpace: "normal",
              overflow: "visible",
              wordWrap: "break-word",
            }}
          >
            {obj && (
              <tr>
                {headers?.map((item, rowIndex) => (
                  <td
                    key={rowIndex}
                    style={{
                      borderBottom: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "left",
                      color: "#777",
                      // border: "1px solid pink",
                    }}
                  >
                    {obj ? obj[item] : "Loading..."}
                  </td>
                ))}
              </tr>
            )}
            {arr && arr.length > 0 ? (
              arr?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {checkbox && (
                    <td
                      style={{
                        borderBottom: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "left",
                        color: "#777",
                      }}
                      onClick={() => handleRowClick(row)}
                    >
                      <input type="checkbox" checked={selectedRow === row} />
                    </td>
                  )}
                  {headers?.map((keyName, index) => (
                    <td
                      style={{
                        borderBottom: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "left",
                        color: "#777",
                      }}
                    >
                      {row[keyName]}
                    </td>
                  ))}
                </tr>
              ))
            ) : arr && arr?.length === 0 ? (
              <tr>
                <td
                  colSpan={headers?.length}
                  style={{
                    padding: "8px",
                    textAlign: "center",
                    borderTop: "1px solid #ddd",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  No data available
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SimpleTable;
