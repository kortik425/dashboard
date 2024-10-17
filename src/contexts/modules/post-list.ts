import { Post } from "@/interfaces/Idata";

export enum PostListAction {
  POST_LIST_FETCHING = "POST_LIST_FETCHING",
  POST_LIST_INSERT = "POST_LIST_INSERT",
  POST_LIST_READY = "POST_LIST_READY",
  POST_LIST_ERROR = "POST_LIST_ERROR",
}

export type PostListActionType =
  | { type: PostListAction.POST_LIST_FETCHING }
  | { type: PostListAction.POST_LIST_INSERT; payload: Post }
  | { type: PostListAction.POST_LIST_READY; payload: Post[] }
  | { type: PostListAction.POST_LIST_ERROR; payload: string };

export interface PostListStateInterface {
  loading: boolean;
  posts: Post[];
  error?: string | null;
}
export const postListInitialState = {
  loading: false,
  posts: [],
  error: null,
};

export const postListReducer = (
  state: PostListStateInterface,
  action: PostListActionType
) => {
  switch (action.type) {
    case PostListAction.POST_LIST_FETCHING:
      return { ...state, loading: true, error: null };
    case PostListAction.POST_LIST_INSERT:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.payload],
        error: null,
      };
    case PostListAction.POST_LIST_READY:
      return { ...state, loading: false, posts: action.payload, error: null };
    case PostListAction.POST_LIST_ERROR:
      return { ...state, loading: false, posts: [], error: action.payload };
    default:
      return { ...state };
  }
};
