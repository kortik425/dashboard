"use client";
import React, { useMemo } from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Card, TextInput } from "@/components/UI";
import { useDataContext } from "@/contexts/data";
import { User } from "@/interfaces/Idata";
import { TableRow, TableHeader } from "@/components/table";
import searchIcon from "../../assets/search.svg";

interface UsersProps {
  // define your props here
}

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

const Users: React.FC<UsersProps> = ({}) => {
  const { users, posts, fetchPosts } = useDataContext();
  const columns = useMemo(() => createColumns(fetchPosts), [fetchPosts]);

  const userTable = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const showPost = (e: React.MouseEvent) => {
    console.log(e);
  };

  return (
    <main className="overflow-hidden flex flex-col px-4 pt-6">
      <header>
        <TextInput
          label="Search User"
          icon={{ img: searchIcon, alt: "search-icon" }}
          isLabelHidden
        >
          <button
            className="bg-secondaryLight rounded-[6px] px-2 m-1"
            onClick={() => {}}
          >
            Action
          </button>
        </TextInput>
      </header>
      <section className=" flex gap-x-12 items-start overflow-hidden">
        <table>
          <TableHeader headerGroups={userTable.getHeaderGroups()} />
          <tbody>
            {userTable.getRowModel().rows.map((row) => (
              <TableRow key={row.id} row={row} />
            ))}
          </tbody>
        </table>
        <div className="h-[100%] flex flex-col flex-1">
          <h2>Posts</h2>
          <div className="overflow-y-auto">
            {posts.length !== 0 &&
              posts.map((post) => {
                return (
                  <Card
                    key={post.id}
                    title={post.title}
                    className="mb-5"
                    onClick={showPost}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Users;
