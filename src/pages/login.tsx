import Head from 'next/head';
import Image from 'next/image';
import { api } from '../api';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { userSlice } from '../store/user';
import styles from '../styles/Home.module.css';

type FormData = {
  userId: string;
  password: string;
};

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const res = await api.signin(data);
    console.log(res);
    dispatch(userSlice.actions.updateUser(res.user));
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="userId">ユーザID:</label>
        <input id="userId" type="text" {...register('userId')} />
        <br />
        <label htmlFor="password">パスワード:</label>
        <input id="password" type="password" {...register('password')} />
        <br />
        <button>送信</button>
      </form>
      <br />
      <Link href="/signup">新規作成</Link>
    </div>
  );
}
