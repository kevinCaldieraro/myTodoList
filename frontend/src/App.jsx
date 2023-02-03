import { useState } from 'react';
import './index.css';
import CreateTask from './components/CreateTask';
import Tasks from './components/Tasks';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const App = () => {
  const [tasks, setTasks] = useState();

  const loadData = () => {
    fetch('http://localhost:3000/associations')
      .then(response => response.json())
      .then(associations => {
        const builtTasks = associations.map(association => {
          return {
            id: association.task_id,
            tagId: association.tag_id,
            title: association.title,
            status: association.status,
            tag: association.tag_name
          };
        });

        setTasks(builtTasks);
      });
  };

  return (
    <Container>
      <CreateTask loadData={loadData} />
      <Tasks loadData={loadData} tasks={tasks} />
    </Container>
  );
};

export default App;
