import { api } from '../api';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../store';
import { userSlice } from '../store/user';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const onLogoutButtonClick = () => {
    dispatch(userSlice.actions.clearAll());
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <h1>トップページ</h1>
      {user.user ? (
        <div>
          ユーザID: {user.user.userId} / 名前: {user.user.name}
        </div>
      ) : null}
      <button onClick={onLogoutButtonClick}>ログアウト</button>
    </div>
  );
}
