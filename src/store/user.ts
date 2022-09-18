import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { configureScope } from '@sentry/nextjs';

export type User = {
  userId: string;
  name: string;
};

export type UserState = {
  jwt: string;
  user: User | null;
};

export type UpdateUserPayload = User;

const initialState: UserState = {
  jwt: '',
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
      configureScope((scope) => {
        scope.setUser({ id: state.user.userId, username: state.user.name });
      });
    },
    setJwt(state, action: PayloadAction<string>) {
      state.jwt = action.payload;
    },
    clearAll(state) {
      state.jwt = '';
      state.user = null;
      configureScope((scope) => {
        scope.setUser(null);
      });
    },
  },
});
