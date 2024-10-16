"use client";
import React from "react";

import { Card, TextInput } from "@/components/UI";
import { useDataContext } from "@/contexts/data";

import searchIcon from "../../assets/search.svg";
import UserTable from "./user-table";

interface UsersProps {}

const Users: React.FC<UsersProps> = ({}) => {
  const { posts } = useDataContext();

  const showPost = (e: React.MouseEvent) => {
    console.log(e);
  };

  return (
    <main className="overflow-hidden flex flex-col px-4 pt-6 ">
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
      <section className="flex flex-1 gap-x-12 items-start overflow-hidden">
        <UserTable />
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
