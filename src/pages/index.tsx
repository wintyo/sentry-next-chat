import { api } from '../api';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../store';
import { userSlice } from '../store/user';
import { AuthChecker } from '../components/AuthChecker';
import styles from '../styles/Home.module.css';

const TopPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const onLogoutButtonClick = () => {
    dispatch(userSlice.actions.clearAll());
    router.push('/login');
  };

  const onCheckAuthButtonClick = async () => {
    const result = await api.checkAuth();
    console.log(result);
  };

  return (
    <AuthChecker>
      <div className={styles.container}>
        <h1>トップページ</h1>
        {user.user ? (
          <div>
            ユーザID: {user.user.userId} / 名前: {user.user.name}
          </div>
        ) : null}
        <button onClick={onCheckAuthButtonClick}>認証チェック</button>
        <button onClick={onLogoutButtonClick}>ログアウト</button>
      </div>
    </AuthChecker>
  );
};

export default TopPage;
