import { api } from '../api';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import styles from '../styles/Home.module.css';

export default function Home() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className={styles.container}>
      <h1>トップページ</h1>
      {user.user ? (
        <div>
          ユーザID: {user.user.userId} / 名前: {user.user.name}
        </div>
      ) : null}
      <Link href="/login">ログイン</Link>
    </div>
  );
}
