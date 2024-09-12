import React from "react";

type TableProps = {
  headers: string[]; // Array of header titles
  keyName: string[];
  data: Array<{ [key: string]: any }>; // Array of objects for the rows
  checkbox: Boolean;
  handleAddTab: (item: string) => void;
};

const DynamicTable: React.FC<TableProps> = ({
  headers,
  data,
  keyName,
  checkbox,
  handleAddTab,
}) => {
  return (
    <div style={{ height: "400px", overflowY: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
                  fontFamily:"Noto Sans KR",
                  color: "#777",
                  fontSize : "15px",
                  
                  
                }}
              >
                선택
              </th>
            ) : undefined}
            {headers.map((header, index) => (
              <th
                key={index}
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f1f1f1",
                  borderBottom: "2px solid #ddd",
                  padding: "8px",
                   color: "#777",
                  fontSize : "15px"
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
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
                    onClick={() => console.log(row)}
                  >
                    <input type="checkbox" />
                  </td>
                )}
                {keyName?.map((keyNameItem, colIndex) => (
                  <>
                    {keyNameItem === "name" ? (
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
                    ) : (
                      <td
                        key={colIndex}
                        style={{
                          borderBottom: "1px solid #ddd",
                          padding: "8px",
                          color: "#777",
                        }}
                      >
                        {row[keyNameItem] || "TRUE"}
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
                colSpan={headers.length}
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
