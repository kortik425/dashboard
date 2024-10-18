import React from "react";
import { flexRender, Row } from "@tanstack/react-table";

interface TableRowProps<T extends object> {
  row: Row<T>;
  isSelected?: boolean;
}

const TableRow = <T extends object>({
  row,
  isSelected = false,
}: TableRowProps<T>) => (
  <tr className={`${isSelected ? "selected-row" : ""}`}>
    {row.getVisibleCells().map((cell) => (
      <td key={cell.id}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </td>
    ))}
  </tr>
);

export default TableRow;
