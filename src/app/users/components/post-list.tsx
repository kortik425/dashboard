import React from "react";
import { Card } from "../../../components/UI";
import { useDataContext } from "@/contexts/data";
import { useModal } from "@/contexts/modals";

interface PostListProps {
  // define your props here
}

const PostList: React.FC<PostListProps> = ({}) => {
  const { fetchPost, postList, user, postListStatus } = useDataContext();

  const { openModal } = useModal();
  const showPost = (e: React.MouseEvent, postId: number) => {
    fetchPost(postId);
    openModal(`post-${postId}`);
  };
  const isEmpty = postList.length === 0;
  const isUnselected = !user?.id;

  return (
    <section className="h-[100%] flex flex-col flex-1 max-w-96">
      <header className="flex justify-between">
        <h2>postList</h2>
        <button
          onClick={() => {
            openModal("add-post");
          }}
          disabled={isUnselected}
          className={isUnselected ? "" : "hover:underline"}
        >
          <h2 className={isUnselected ? "text-gray-500" : ""}>+ Add Post</h2>
        </button>
      </header>
      <div className="overflow-y-auto pt-2">
        {!!postListStatus.error && (
          <h1 className="text-red-700">{postListStatus.error}</h1>
        )}
        {!!postListStatus.loading && <h1>...Loading</h1>}
        {isUnselected && (
          <h1 className="text-secondaryLight">
            Select a user to see the posts here
          </h1>
        )}
        {isEmpty && !isUnselected && (
          <h1 className="text-secondaryLight">No post to show</h1>
        )}
        {postList.length !== 0 &&
          postList.toReversed().map((post) => {
            return (
              <Card
                key={post.id}
                title={post.title}
                className="mb-5"
                onClick={(e) => {
                  showPost(e, post.id);
                }}
              />
            );
          })}
      </div>
    </section>
  );
};

export default PostList;
