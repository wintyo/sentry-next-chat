import { api } from '../api/';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

type FormData = {
  userId: string;
  password: string;
};

const SignupPage: NextPage = () => {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const result = await api.signup(data);
    console.log(result);
    toast.success('success');
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="userId">ユーザID: </label>
      <input
        id="userId"
        type="text"
        {...register('userId', { required: true })}
      />
      <br />
      <label htmlFor="password">パスワード:</label>
      <input
        id="password"
        type="password"
        {...register('password', { required: true })}
      />
      <br />
      {formState.errors.userId || formState.errors.password ? (
        <div style={{ color: 'red' }}>入力必須です</div>
      ) : null}
      <button type="submit">送信</button>
    </form>
  );
};

export default SignupPage;
