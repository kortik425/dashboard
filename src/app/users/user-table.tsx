import React, { useMemo } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { User } from "@/interfaces/Idata";
import { useDataContext } from "@/contexts/data";
import { TableHeader, TableRow } from "@/components/table";

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
  const { users, fetchPosts } = useDataContext();
  const columns = useMemo(() => createColumns(fetchPosts), [fetchPosts]);
  const userTable = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <TableHeader headerGroups={userTable.getHeaderGroups()} />
      <tbody>
        {userTable.getRowModel().rows.map((row) => (
          <TableRow key={row.id} row={row} />
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
