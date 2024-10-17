import { useDataContext } from "@/contexts/data";
import React from "react";

interface PostContentProps {
  // define your props here
}

const PostContent: React.FC<PostContentProps> = ({}) => {
  const { post, status } = useDataContext();
  if (status.loading) return <h1 className="page-heading">...Loading</h1>;
  if (status.error) return <h1 className="page-heading">{status.error}</h1>;
  return (
    <div>
      <h1 className="page-heading">{post?.title}</h1>
      <p>{post?.body}</p>
    </div>
  );
};

export default PostContent;
