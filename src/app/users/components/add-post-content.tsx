import { TextInput } from "@/components/UI";
import { useDataContext } from "@/contexts/data";
import { useModal } from "@/contexts/modals";
import React, { useState } from "react";

interface AddPostContentProps {
  // define your props here
}

const AddPostContent: React.FC<AddPostContentProps> = ({}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { insertPost } = useDataContext();
  const { closeModal } = useModal();

  const onFormUpdate = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;

    if (name === "title") {
      setTitle(value);
    } else if (name === "body") {
      setBody(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    insertPost({ title, body });
    closeModal();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="new-post">
        <TextInput label={"Title"} name="title" onInput={onFormUpdate} />
        <label htmlFor={"contentPost"} className="stilised-p-500 pl-2">
          Content
        </label>
        <div className="flex min-h-10 pl-2 rounded-lg bg-white max-w-[100%] border border-black transition duration-150 ease-in-out focus-within:ring-2 focus-within:ring-blue-500 items-center">
          <textarea
            id="contentPost"
            placeholder="Content"
            className="flex-grow border-none outline-none m-2"
            name="body"
            onInput={onFormUpdate}
          />
        </div>
      </form>
    </div>
  );
};

export default AddPostContent;
