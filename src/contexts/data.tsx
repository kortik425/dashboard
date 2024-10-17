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
import {
  Actions,
  postReducer,
  postInitialState,
  StateInterface as PostStateInterface,
} from "./posts";

interface DataContextType {
  usersList: User[];
  posts: Post[];
  fetchPostsList: (userId: number) => Promise<void>;
  fetchUser: (userId: number) => Promise<void>;
  fetchPost: (postId: number) => Promise<void>;
  user: User | null;
  post: PostStateInterface;
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
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const [post, dispatch] = useReducer(postReducer, postInitialState);

  const fetchPostsList = useCallback(async (userId: number) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/posts`
      );
      const data: Post[] = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
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
    dispatch({ type: Actions.POST_FETCHING });

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      if (!response.ok) {
        throw new Error(`Error: Failed to fetch post with ID ${postId}`);
      }
      const data: Post = await response.json();
      dispatch({ type: Actions.POST_READY, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: Actions.POST_ERROR, payload: error.message });
      } else {
        dispatch({ type: Actions.POST_ERROR, payload: String(error) });
      }
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        usersList,
        posts,
        fetchPostsList,
        fetchUser,
        user,
        fetchPost,
        post,
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
