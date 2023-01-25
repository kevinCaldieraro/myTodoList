import React from 'react';
import styles from 'styled-components';

const Container = styles.div`
  background-color: #dbdbdb;
  min-height: 100vh;
`;

const Header = styles.div`
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

const TasksContainer = styles.div`
  padding: 20px 60px;
`;

const Tasks = () => {
  return (
    <Container>
      <Header>
        <h2>Tarefas</h2>
      </Header>
      <TasksContainer>
        <p>task</p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam vero
          nihil sequi! Voluptatibus ullam rem molestias quo deleniti dicta,
          numquam quisquam iure iusto id possimus quas debitis veniam, totam
          necessitatibus? Laudantium facilis quod corporis tempore saepe
          inventore facere eius, maxime sapiente, adipisci rem alias ratione
          veritatis pariatur minus? Voluptates, neque? Lorem, ipsum dolor sit
          amet consectetur adipisicing elit. Enim animi sunt beatae velit.
          Ducimus dicta officia unde animi fuga tempora minus? Maxime atque quas
          tempora quam eius iusto officiis dolorem. Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Voluptate, sunt. Earum officiis
          quibusdam animi mollitia sed maiores, saepe cumque tempora iure.
          Maiores blanditiis nulla iste nisi beatae impedit eligendi culpa.
        </p>
        <p>task</p>
      </TasksContainer>
    </Container>
  );
};

export default Tasks;
