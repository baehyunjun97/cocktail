import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Arial', sans-serif;
`;

const ErrorCode = styled.h1`
  font-size: 6rem;
  margin: 0;
  color: #e74c3c;
`;

const ErrorMessage = styled.p`
  font-size: 1.5rem;
  margin-top: 10px;
  color: #333;
`;

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>Oops! Page not found.</ErrorMessage>
    </ErrorContainer>
  );
};

export default ErrorPage;