import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './user';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  Storage,
} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

// HACK: `redux-persist failed to create sync storage. falling back to noop storage.`の対応
// https://github.com/vercel/next.js/discussions/15687#discussioncomment-45319
const createNoopStorage = (): Storage => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const userPersistConfig = {
  key: userSlice.name,
  storage,
};

const rootReducer = combineReducers({
  [userSlice.name]: persistReducer(userPersistConfig, userSlice.reducer),
});

export type RootState = ReturnType<typeof rootReducer>;

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: [userSlice.name],
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const rootStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
