import { toast } from 'react-toastify';
import { rootStore } from '../store';
import NextRouter from 'next/router';
import { userSlice } from '../store/user';

const errorHandler = (err: unknown) => {
  if (err instanceof Response) {
    switch (err.status) {
      case 401:
        toast.error('認証エラーです');
        rootStore.dispatch(userSlice.actions.clearAll());
        NextRouter.push('/login');
        break;
      case 404:
        toast.error('Not Found');
        break;
      default:
        err.text().then((text) => {
          toast.error(text);
        });
    }
  }
  throw err;
};

export type SignupData = {
  userId: string;
  name: string;
  password: string;
};

export type SigninData = {
  userId: string;
  password: string;
};

export const api = {
  /**
   * サインアップする
   * @param signupData - サインアップデータ
   */
  signup: async (signupData: SignupData) => {
    console.log(signupData);
    return fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        console.log(res);
        return res.text();
      })
      .catch(errorHandler);
  },
  /**
   * ログインする
   * @param signinData - ログインデータ
   */
  signin: async (signinData: SigninData) => {
    return fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signinData),
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json() as Promise<{
          token: string;
          user: {
            userId: string;
            name: string;
          };
        }>;
      })
      .catch(errorHandler);
  },
  /**
   * 認証チェック
   */
  checkAuth: async () => {
    const state = rootStore.getState();
    return fetch('/api/checkAuth', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${state.user.jwt}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .catch(errorHandler);
  },
};
