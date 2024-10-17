"use client";
import React, { useEffect, useState } from "react";

import { TextInput } from "@/components/UI";
import { useDataContext } from "@/contexts/data";

import { SearchIcon } from "@/components/UI/icons";
import UserTable from "./components/user-table";
import Modal from "@/components/modal/modal";
import { useModal } from "@/contexts/modals";
import PostList from "./components/post-list";

interface UsersProps {}

const Users: React.FC<UsersProps> = ({}) => {
  const [filters, setFilters] = useState("");
  const { isOpen, closeModal } = useModal();
  const { user } = useDataContext();

  useEffect(() => {
    return () => {
      if (isOpen) closeModal();
    };
  }, [closeModal]);

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
          <PostList />
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
