import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  userId: string;
  name: string;
};

export type UserState = {
  user: User | null;
};

export type UpdateUserPayload = User;

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<UpdateUserPayload>) {
      state.user = {
        userId: action.payload.userId,
        name: action.payload.name,
      };
    },
    clearUser(state) {
      state.user = null;
    },
  },
});
