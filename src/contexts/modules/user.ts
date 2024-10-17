import { User } from "@/interfaces/Idata";

export enum UserActions {
  USER_FETCHING = "USER_FETCHING",
  USER_READY = "USER_READY",
  USER_ERROR = "USER_ERROR",
  USER_GET_ID = "USER_GET_ID",
}

export type UserActionType =
  | { type: UserActions.USER_FETCHING }
  | { type: UserActions.USER_GET_ID; payload: number }
  | { type: UserActions.USER_READY; payload: User }
  | { type: UserActions.USER_ERROR; payload: string };

export interface UserStateInterface {
  loading: boolean;
  user: User | null;
  error?: string | null;
}
export const UserInitialState = {
  loading: false,
  user: null,
  error: null,
};

export const UserReducer = (
  state: UserStateInterface,
  action: UserActionType
) => {
  switch (action.type) {
    case UserActions.USER_FETCHING:
      return { ...state, loading: true, error: null };
    case UserActions.USER_GET_ID:
      return {
        ...state,
        loading: true,
        user: { id: action.payload },
        error: null,
      };
    case UserActions.USER_READY:
      return { ...state, loading: false, user: action.payload, error: null };
    case UserActions.USER_ERROR:
      return { ...state, loading: false, user: null, error: action.payload };
    default:
      return { ...state };
  }
};
