import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div>ログイン</div>
      <Link href="/signup">新規作成</Link>
    </div>
  );
}
