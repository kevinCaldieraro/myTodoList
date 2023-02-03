import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TaskCard from './TaskCard';

const Container = styled.div`
  background-color: #dbdbdb;
  min-height: 100vh;
`;

const Header = styled.div`
  background-color: #ac70dc;
  height: 70px;
  border-left: 1px solid #fff;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    color: #fff;
    font-size: 2.5rem;
    font-weight: 500;
  }
`;

const TasksContainer = styled.div`
  margin-top: 25px;
  padding: 10px 20px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Tasks = ({ loadData, tasks }) => {
  useEffect(() => {
    loadData();
  }, []);

  const handleStatus = async e => {
    const { id, value } = e.target;
    const task = tasks.find(task => task.id === Number(id));

    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: task.title, status: value })
    });

    loadData();
  };

  const handleEdit = async e => {
    e.preventDefault();
    const { id, value } = e.target;
    const task = tasks.find(task => task.id === Number(id));

    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: value, status: task.status })
    });

    loadData();
  };

  const handleDelete = async task => {
    await fetch(`http://localhost:3000/tasks/${task.id}`, { method: 'delete' });
    loadData();
  };

  return (
    <Container>
      <Header>
        <h2>Tarefas</h2>
      </Header>
      <TasksContainer>
        {tasks &&
          tasks.map(task => (
            <TaskCard
              task={task}
              handlers={{ handleStatus, handleEdit, handleDelete }}
              key={task.id}
            />
          ))}
      </TasksContainer>
    </Container>
  );
};

export default Tasks;
