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

const Tasks = () => {
  const [tasks, setTasks] = useState();

  const loadData = () => {
    fetch('http://localhost:3000/tasks')
      .then(response => response.json())
      .then(allTasks => {
        fetch('http://localhost:3000/tags')
          .then(response => response.json())
          .then(allTags => {
            fetch('http://localhost:3000/associations')
              .then(response => response.json())
              .then(allAssociations => {
                const builtTasks = allAssociations.map(
                  ({ task_id, tag_id }) => {
                    const task = allTasks.find(task => {
                      if (task.id === task_id) return task;
                    });

                    const tag = allTags.find(tag => {
                      if (tag.id === tag_id) return tag;
                    });

                    return {
                      id: task.id,
                      title: task.title,
                      status: task.status,
                      tag: tag.tag_name
                    };
                  }
                );

                setTasks(builtTasks);
              });
          });
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatus = async e => {
    const { id, value } = e.target;
    const task = tasks.find(task => task.id === Number(id));

    await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: task.title, status: value })
    });

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
            <TaskCard task={task} handleStatus={handleStatus} key={task.id} />
          ))}
      </TasksContainer>
    </Container>
  );
};

export default Tasks;
