// src/pages/index.tsx
import { GetServerSideProps } from 'next';

interface HomeProps {
  data: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  return {
    redirect: {
      destination: '/users/login',
      permanent: false, // 一時的なリダイレクトの場合はfalse、恒久的な場合はtrue
    },
  };
};

const HomePage = () => {
  return null; // このコンポーネントは表示されませんが、エクスポートする必要があります
};

export default HomePage;
