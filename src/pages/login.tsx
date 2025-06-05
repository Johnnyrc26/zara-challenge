
import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/Login/Form/form';

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 10rem);
  width: 100%;
  box-sizing: border-box;
`;

const LoginContent = styled.div`
  width: 100%;
  height: 100%;
  max-width: 400px;
  padding: 1.5rem;
  box-sizing: border-box;
`;

const LoginPage: React.FC = () => {
  return (
    <LoginPageContainer>
      <LoginContent>
        <LoginForm />
      </LoginContent>
    </LoginPageContainer>
  );
};

export default LoginPage;
