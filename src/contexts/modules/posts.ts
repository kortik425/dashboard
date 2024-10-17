import { Post } from "@/interfaces/Idata";

export enum PostActions {
  POST_FETCHING,
  POST_READY,
  POST_ERROR,
}

export type PostActionType =
  | { type: PostActions.POST_FETCHING }
  | { type: PostActions.POST_READY; payload: Post }
  | { type: PostActions.POST_ERROR; payload: string };

export interface PostStateInterface {
  loading: boolean;
  post: Post | null;
  error?: string | null;
}
export const postInitialState = {
  loading: false,
  post: null,
  error: null,
};

export const postReducer = (
  state: PostStateInterface,
  action: PostActionType
) => {
  switch (action.type) {
    case PostActions.POST_FETCHING:
      return { ...state, loading: true, post: null, error: null };
    case PostActions.POST_READY:
      return { ...state, loading: false, post: action.payload, error: null };
    case PostActions.POST_ERROR:
      return { ...state, loading: false, post: null, error: action.payload };
    default:
      return { ...state };
  }
};
