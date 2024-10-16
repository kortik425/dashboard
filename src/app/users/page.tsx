"use client";
import React, { useState } from "react";

import { Card, TextInput } from "@/components/UI";
import { useDataContext } from "@/contexts/data";

import { SearchIcon } from "@/components/UI/icons";
import UserTable from "./components/user-table";
import Modal from "@/components/modal/modal";
import { useModal } from "@/contexts/modals";

interface UsersProps {}

const Users: React.FC<UsersProps> = ({}) => {
  const [filters, setFilters] = useState("");
  const { isOpen, closeModal } = useModal();
  const { posts, user } = useDataContext();

  const showPost = (e: React.MouseEvent) => {
    console.log(e);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(e.target.value);
  };

  return (
    <>
      <main className="overflow-hidden flex flex-col px-4 pt-6 ">
        <header>
          <TextInput
            label="Search User"
            iconComponent={<SearchIcon />}
            isLabelHidden
            value={filters}
            onChange={handleInput}
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
          <UserTable filters={filters} />
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
      <Modal title="lorem" isModalOpen={isOpen} abortFn={closeModal}>
        <p className="mt-2 text-sm text-gray-500">fsdfdsfsdfd</p>
        <p>{user?.email}</p>
      </Modal>
    </>
  );
};

export default Users;
