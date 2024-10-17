import { useDataContext } from "@/contexts/data";
import React from "react";

interface PostContentProps {
  // define your props here
}

const PostContent: React.FC<PostContentProps> = ({}) => {
  const { post } = useDataContext();
  if (post.loading) return <h1 className="page-heading">...Loading</h1>;
  return (
    <div>
      <h1 className="page-heading">{post.post?.title}</h1>
      <p>{post.post?.body}</p>
    </div>
  );
};

export default PostContent;
