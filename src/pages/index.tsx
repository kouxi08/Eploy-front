// src/pages/index.tsx
import { GetServerSideProps } from 'next';
import React from 'react';

interface HomeProps {
  data: string;
}

const HomePage: React.FC<HomeProps> = ({ data }) => {
  return <div>{data}</div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  // ここでデータをフェッチ
  const data = 'Hello, World!';

  return {
    props: {
      data,
    },
  };
};

export default HomePage;
