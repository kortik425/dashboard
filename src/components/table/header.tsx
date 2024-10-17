import { flexRender, HeaderGroup } from "@tanstack/react-table";
import React from "react";

interface TableHeaderProps<T extends object> {
  headerGroups: HeaderGroup<T>[];
}
const TableHeader = <T extends object>({
  headerGroups,
}: TableHeaderProps<T>) => {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} className="stilised-h3 text-left">
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
