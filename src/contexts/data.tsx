"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useReducer,
} from "react";
import { User, Post } from "@/interfaces/Idata";
import { PostActions, postReducer, postInitialState } from "./modules/posts";
import {
  PostListAction,
  postListReducer,
  postListInitialState,
} from "./modules/post-list";

interface DataContextType {
  usersList: User[];
  fetchPostsList: (userId: number) => Promise<void>;
  fetchUser: (userId: number) => Promise<void>;
  fetchPost: (postId: number) => Promise<void>;
  insertPost: (post: Post) => Promise<void>;
  user: User | null;
  post: Post | null;
  postList: Post[];
  status: { error: string | null; loading: boolean };
}

interface DataProviderProps {
  children: ReactNode;
  initialState: User[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<DataProviderProps> = ({
  children,
  initialState,
}) => {
  const [usersList] = useState<User[]>(initialState);
  const [postList, postListdispatch] = useReducer(
    postListReducer,
    postListInitialState
  );
  const [user, setUser] = useState<User | null>(null);

  const [post, dispatch] = useReducer(postReducer, postInitialState);

  const fetchPostsList = useCallback(async (userId: number) => {
    postListdispatch({ type: PostListAction.POST_LIST_FETCHING });
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/posts`
      );
      const data: Post[] = await response.json();
      postListdispatch({ type: PostListAction.POST_LIST_READY, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        postListdispatch({
          type: PostListAction.POST_LIST_ERROR,
          payload: error.message,
        });
      } else {
        postListdispatch({
          type: PostListAction.POST_LIST_ERROR,
          payload: String(error),
        });
      }
    }
  }, []);

  const fetchUser = useCallback(async (userId: number) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      const data: User = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);

  const fetchPost = useCallback(async (postId: number) => {
    dispatch({ type: PostActions.POST_FETCHING });

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      if (!response.ok) {
        throw new Error(`Error: Failed to fetch post with ID ${postId}`);
      }
      const data: Post = await response.json();
      dispatch({ type: PostActions.POST_READY, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: PostActions.POST_ERROR, payload: error.message });
      } else {
        dispatch({ type: PostActions.POST_ERROR, payload: String(error) });
      }
    }
  }, []);

  const insertPost = useCallback(async (newPost: Post) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/`,
        {
          method: "POST",
          body: JSON.stringify(newPost),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: Failed to POST new post`);
      }
      const data: Post = await response.json();
      postListdispatch({
        type: PostListAction.POST_LIST_INSERT,
        payload: data,
      });
    } catch (error) {
      if (error instanceof Error) {
        postListdispatch({
          type: PostListAction.POST_LIST_ERROR,
          payload: error.message,
        });
      } else {
        postListdispatch({
          type: PostListAction.POST_LIST_ERROR,
          payload: String(error),
        });
      }
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        usersList,
        postList: postList.posts,
        post: post.post,
        user,
        fetchPostsList,
        fetchUser,
        fetchPost,
        insertPost,
        status: {
          error: postList.error || post.error || null,
          loading: postList.loading || post.loading,
        },
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("no context provided");
  }
  return context;
};
