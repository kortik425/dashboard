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
import { UserActions, UserReducer, UserInitialState } from "./modules/user";

type postParameter = Omit<Post, "id" | "userId">;
interface DataContextType {
  usersList: User[];
  fetchPostsList: (userId: number) => Promise<void>;
  fetchUser: (userId: number) => Promise<void>;
  fetchPost: (postId: number) => Promise<void>;
  insertPost: (post: postParameter) => Promise<void>;
  user: User | null;
  post: Post | null;
  postList: Post[];
  postStatus: { error: string | null; loading: boolean };
  postListStatus: { error: string | null; loading: boolean };
  userStatus: { error: string | null; loading: boolean };
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

  const [postListState, postListDispatcher] = useReducer(
    postListReducer,
    postListInitialState
  );
  const [userState, userDispatcher] = useReducer(UserReducer, UserInitialState);
  const [postState, postDispatcher] = useReducer(postReducer, postInitialState);

  const fetchPostsList = useCallback(async (userId: number) => {
    postListDispatcher({ type: PostListAction.POST_LIST_FETCHING });
    userDispatcher({ type: UserActions.USER_GET_ID, payload: userId });
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/posts`
      );
      const data: Post[] = await response.json();

      postListDispatcher({
        type: PostListAction.POST_LIST_READY,
        payload: data,
      });
    } catch (error) {
      if (error instanceof Error) {
        postListDispatcher({
          type: PostListAction.POST_LIST_ERROR,
          payload: error.message,
        });
      } else {
        postListDispatcher({
          type: PostListAction.POST_LIST_ERROR,
          payload: String(error),
        });
      }
    }
  }, []);

  const fetchUser = useCallback(async (userId: number) => {
    userDispatcher({ type: UserActions.USER_FETCHING });
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      const data: User = await response.json();
      userDispatcher({ type: UserActions.USER_READY, payload: data });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);

  const fetchPost = useCallback(
    async (postId: number) => {
      const fetchedPost = postListState.posts.find(
        (elem: Post) => elem.id === postId
      );

      if (!!fetchedPost) {
        postDispatcher({ type: PostActions.POST_READY, payload: fetchedPost });
        return;
      }

      postDispatcher({ type: PostActions.POST_FETCHING });
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        if (!response.ok) {
          throw new Error(`Error: Failed to fetch post with ID ${postId}`);
        }
        const data: Post = await response.json();
        postDispatcher({ type: PostActions.POST_READY, payload: data });
      } catch (error) {
        if (error instanceof Error) {
          postDispatcher({
            type: PostActions.POST_ERROR,
            payload: error.message,
          });
        } else {
          postDispatcher({
            type: PostActions.POST_ERROR,
            payload: String(error),
          });
        }
      }
    },
    [postListState]
  );

  const insertPost = useCallback(
    async (newPost: postParameter) => {
      const uid = userState.user?.id;
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...newPost,
              userId: uid,
            }),
          }
        );
        if (!response.ok) {
          throw new Error(`Error: Failed to POST new post`);
        }
        const data: Post = await response.json();

        postListDispatcher({
          type: PostListAction.POST_LIST_INSERT,
          payload: data,
        });
      } catch (error) {
        if (error instanceof Error) {
          postListDispatcher({
            type: PostListAction.POST_LIST_ERROR,
            payload: error.message,
          });
        } else {
          postListDispatcher({
            type: PostListAction.POST_LIST_ERROR,
            payload: String(error),
          });
        }
      }
    },
    [userState.user?.id]
  );

  return (
    <DataContext.Provider
      value={{
        usersList,
        postList: postListState.posts,
        post: postState.post,
        user: userState.user,
        fetchPostsList,
        fetchUser,
        fetchPost,
        insertPost,
        postStatus: {
          error: postState.error || null,
          loading: postState.loading,
        },
        postListStatus: {
          error: postListState.error || null,
          loading: postListState.loading,
        },
        userStatus: {
          error: userState.error || null,
          loading: userState.loading,
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
