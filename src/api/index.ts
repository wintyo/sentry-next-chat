import { toast } from 'react-toastify';

const errorHandler = (err: unknown) => {
  if (err instanceof Response) {
    if (err.status === 404) {
      toast.error('Not Found');
    } else {
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
};
