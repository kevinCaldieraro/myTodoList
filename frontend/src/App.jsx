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

  return (
    <Container>
      <CreateTask loadData={loadData} />
      <Tasks loadData={loadData} tasks={tasks} />
    </Container>
  );
};

export default App;
