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
};
