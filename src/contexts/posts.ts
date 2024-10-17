import { Post } from "@/interfaces/Idata";

export enum Actions {
  POST_FETCHING,
  POST_READY,
  POST_ERROR,
}

export interface StateInterface {
  loading: boolean;
  post: Post | null;
  error?: string | null;
}

export type ActionType =
  | { type: Actions.POST_FETCHING }
  | { type: Actions.POST_READY; payload: Post }
  | { type: Actions.POST_ERROR; payload: string };

export const postInitialState = {
  loading: false,
  post: null,
  error: null,
};

export const postReducer = (state: StateInterface, action: ActionType) => {
  switch (action.type) {
    case Actions.POST_FETCHING:
      return { ...state, loading: true, post: null, error: null };
    case Actions.POST_READY:
      return { ...state, loading: false, post: action.payload, error: null };
    case Actions.POST_ERROR:
      return { ...state, loading: false, post: null, error: action.payload };
    default:
      return { ...state };
  }
};
