import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #f5f9fa;
`;

const Header = styled.div`
  background-color: #ac70dc;
  height: 70px;
  border-right: 1px solid #fff;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    color: #fff;
    font-size: 2.5rem;
    font-weight: 500;
  }
`;

const CreateTask = () => {
  return (
    <Container>
      <Header>
        <h1>Lista de tarefas</h1>
      </Header>
    </Container>
  );
};

export default CreateTask;
