import './index.css';
import CreateTask from './components/CreateTask';
import Tasks from './components/Tasks';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const App = () => {
  return (
    <Container>
      <CreateTask />
      <Tasks />
    </Container>
  );
};

export default App;
