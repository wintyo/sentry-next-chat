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
      const { userId, name } = action.payload;
      state.user = {
        userId,
        name,
      };
      configureScope((scope) => {
        scope.setUser({ id: userId, username: name });
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
