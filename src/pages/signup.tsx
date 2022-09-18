import { api } from '../api/';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

type FormData = {
  userId: string;
  name: string;
  password: string;
};

const SignupPage: NextPage = () => {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const result = await api.signup(data);
    console.log(result);
    toast.success('success');
    router.push('/login');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>新規作成</h1>
      <label htmlFor="userId">ユーザID: </label>
      <input
        id="userId"
        type="text"
        {...register('userId', { required: true })}
      />
      <br />
      <label htmlFor="userName">ユーザ名: </label>
      <input
        id="userName"
        type="text"
        {...register('name', { required: true })}
      />
      <br />
      <label htmlFor="password">パスワード:</label>
      <input
        id="password"
        type="password"
        {...register('password', { required: true })}
      />
      <br />
      {Object.keys(formState.errors).length > 0 ? (
        <div style={{ color: 'red' }}>入力必須です</div>
      ) : null}
      <button type="submit">送信</button>
    </form>
  );
};

export default SignupPage;
