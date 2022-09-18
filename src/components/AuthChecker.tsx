import { FC, ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../store';

type Props = {
  children: ReactNode;
};

export const AuthChecker: FC<Props> = (props) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const [isValidating, setIsValidating] = useState<boolean>(true);

  useEffect(() => {
    if (user.user == null) {
      router.push('/login');
      return;
    }
    setIsValidating(false);
  }, []);

  if (isValidating) {
    return <div>認証中...</div>;
  }

  return <>{props.children}</>;
};
