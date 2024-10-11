"use client";
import React, { useMemo } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useDataContext } from "@/contexts/data";
import { User } from "@/interfaces/Idata";

interface UsersProps {
  // define your props here
}

const columnHelper = createColumnHelper<User>();

const createColumns = (fetchPosts: (userId: number) => Promise<void>) => [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("username", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "actions",
    header: () => <p>Actions</p>,
    cell: (props) => {
      console.log(props.row);
      const { id } = props.row.original;
      return <button onClick={() => fetchPosts(id)}>open posts</button>;
    },
  }),
];

const Users: React.FC<UsersProps> = ({}) => {
  const { users, posts, fetchPosts } = useDataContext();
  const columns = useMemo(() => createColumns(fetchPosts), [fetchPosts]);

  const userTable = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <table>
        <thead>
          {userTable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {userTable.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {posts.length !== 0 &&
          posts.map((post) => {
            return <p key={post.id}> {post.title}</p>;
          })}
      </div>
    </>
  );
};

export default Users;
