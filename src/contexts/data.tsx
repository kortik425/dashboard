"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { User, Post } from "@/interfaces/Idata";

interface DataContextType {
  usersList: User[];
  posts: Post[];
  fetchPosts: (userId: number) => Promise<void>;
  fetchUser: (userId: number) => Promise<void>;
  user: User | null;
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

  const fetchPosts = useCallback(async (userId: number) => {
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

  return (
    <DataContext.Provider
      value={{ usersList, posts, fetchPosts, fetchUser, user }}
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
