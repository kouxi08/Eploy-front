// pages/signup.tsx
import React from 'react';
import SignUpForm from '../components/SignUpForm';

const SignUp: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
