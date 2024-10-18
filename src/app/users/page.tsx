"use client";
import React, { useEffect, useState } from "react";

import { TextInput } from "@/components/UI";
import { useDataContext } from "@/contexts/data";

import { SearchIcon } from "@/components/UI/icons";
import UserTable from "./components/user-table";
import Modal from "@/components/modal/modal";
import { useModal } from "@/contexts/modals";
import UserContent from "./components/user-content";
import Link from "next/link";
import Button from "@/components/UI/button";
import PostList from "./components/post-list";
import PostContent from "./components/post-content";
import AddPostContent from "./components/add-post-content";

interface UsersProps {}

const Users: React.FC<UsersProps> = ({}) => {
  const [filters, setFilters] = useState("");
  const { isOpen, closeModal, modalId } = useModal();
  const { user } = useDataContext();

  useEffect(() => {
    return () => {
      if (isOpen) closeModal();
    };
  }, [closeModal, isOpen]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(e.target.value);
  };
  const isShowPostModal = modalId?.toString().includes("post-");
  const isShowUserModal = modalId?.toString().includes("user-");
  const isAddPostModal = modalId?.toString().includes("add-post");
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
            containerClassName="max-w-[580px]"
          >
            <button
              className="bg-secondaryLight rounded-[6px] px-2 m-1"
              onClick={() => {
                console.log("This could be a generic action");
              }}
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
      {isShowUserModal && (
        <Modal
          title={"User Informations"}
          isModalOpen={isOpen}
          footer={
            <footer className="pt-8 flex flex-row-reverse gap-4">
              {
                <Link
                  href={`/users/${user?.id}`}
                  className="custom-button-style"
                >
                  {" "}
                  Go to User{" "}
                </Link>
              }
              <Button variant="secondary" type="button" onClick={closeModal}>
                {"Close"}
              </Button>
            </footer>
          }
        >
          <UserContent user={user} />
        </Modal>
      )}{" "}
      {isShowPostModal && (
        <Modal title={" "} isModalOpen={isOpen} abortFn={closeModal}>
          <PostContent />
        </Modal>
      )}
      {isAddPostModal && (
        <Modal
          title={"Add new Post"}
          isModalOpen={isOpen}
          footer={
            <footer className="pt-8 flex flex-row-reverse gap-4">
              <Button type="submit" form="new-post" variant={"primary"}>
                {" "}
                Save{" "}
              </Button>
              <Button variant="secondary" type="button" onClick={closeModal}>
                {"Close"}
              </Button>
            </footer>
          }
        >
          <AddPostContent />
        </Modal>
      )}
    </>
  );
};

export default Users;
