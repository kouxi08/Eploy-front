// pages/login.tsx
import React from 'react';
import LoginForm from '../../components/LoginForm';

const Login: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <LoginForm />
    </div>
  );
};

export default Login;
