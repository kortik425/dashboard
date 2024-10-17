import { TextInput } from "@/components/UI";
import React from "react";

interface AddPostContentProps {
  // define your props here
}

const AddPostContent: React.FC<AddPostContentProps> = ({}) => {
  return (
    <div>
      <TextInput label={"Title"} />

      <div aria-hidden="true">
        <label htmlFor={"contentPost"} className="stilised-p-500 pl-2">
          Content
        </label>
        <div
          className="flex min-h-10 pl-2 rounded-lg bg-white max-w-[100%] border border-black transition duration-150 ease-in-out focus-within:ring-2 focus-within:ring-blue-500 items-center"
          aria-hidden="true"
        >
          <textarea
            id="contentPost"
            placeholder="Content"
            className="flex-grow border-none outline-none m-2"
          />
        </div>
      </div>
    </div>
  );
};

export default AddPostContent;
