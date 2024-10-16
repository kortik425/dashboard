import React, { useMemo, useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { User } from "@/interfaces/Idata";
import { useDataContext } from "@/contexts/data";
import { TableHeader, TableRow } from "@/components/table";
import { TextInput } from "@/components/UI";

const columnHelper = createColumnHelper<User>();

const createColumns = (fetchPosts: (userId: number) => Promise<void>) => [
  columnHelper.accessor("username", {
    header: "Username",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "actions",
    header: () => <p>Actions</p>,
    cell: (props) => {
      const { id } = props.row.original;
      return <button onClick={() => fetchPosts(id)}>open posts</button>;
    },
  }),
];

const UserTable = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 7 });

  const { users, fetchPosts } = useDataContext();
  const columns = useMemo(() => createColumns(fetchPosts), [fetchPosts]);
  const userTable = useReactTable({
    data: users,
    columns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return (
    <div>
      <table>
        <TableHeader headerGroups={userTable.getHeaderGroups()} />
        <tbody>
          {userTable.getRowModel().rows.map((row) => (
            <TableRow key={row.id} row={row} />
          ))}
        </tbody>
      </table>
      <div className="flex justify-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => userTable.firstPage()}
          disabled={!userTable.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => userTable.previousPage()}
          disabled={!userTable.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => userTable.nextPage()}
          disabled={!userTable.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => userTable.lastPage()}
          disabled={!userTable.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {userTable.getState().pagination.pageIndex + 1} of{" "}
            {userTable.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <TextInput
            type="number"
            label="table page"
            placeholder=" "
            min="1"
            max={userTable.getPageCount()}
            defaultValue={userTable.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              userTable.setPageIndex(page);
            }}
            isLabelHidden
          />
        </span>
      </div>
    </div>
  );
};

export default UserTable;
