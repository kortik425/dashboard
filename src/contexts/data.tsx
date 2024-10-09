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
  users: User[];
  fetchPosts: (userId: number) => Promise<void>;
  posts: Post[];
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
  const [users] = useState<User[]>(initialState);
  const [posts, setPosts] = useState<Post[]>([]);

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

  return (
    <DataContext.Provider value={{ users, posts, fetchPosts }}>
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
