import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #f5f9fa;
  display: flex;
  flex-direction: column;
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

const Form = styled.form`
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 6px;
    font-size: 1.2rem;
  }

  input,
  select {
    background-color: #dbdbdb;
    padding: 10px;
    font-size: 1.25rem;
    border: none;
    border-radius: 5px;
  }

  :nth-child(2) {
    margin-bottom: 80px;
  }
`;

const SubmitButton = styled.button`
  background-color: #0070d7;
  color: #fff;
  padding: 10px;
  border: 2px solid #0070d7;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: 0.5s ease;

  &:hover {
    background-color: #f5f9fa;
    color: #0070d7;
  }
`;

const CreateTask = ({ loadData }) => {
  const [tags, setTags] = useState();
  const [task, setTask] = useState({
    title: '',
    tag: 'tag',
    tagId: ''
  });

  const loadTags = async () => {
    const response = await fetch('http://localhost:3000/tags');
    const tags = await response.json();
    setTags(tags);

    setTask({
      title: '',
      tag: tags[0].tag_name,
      tagId: tags[0].id
    });
  };

  useEffect(() => {
    loadTags();
  }, []);

  const createTask = async e => {
    e.preventDefault();

    await fetch('http://localhost:3000/tasks', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: task.title, tagId: task.tagId })
    });

    loadData();

    setTask({
      title: '',
      tag: tags[0].tag_name,
      tagId: tags[0].id
    });
  };

  const checkTagId = tagName => {
    const tag = tags.find(tag => tag.tag_name === tagName);
    return tag.id;
  };

  return (
    <Container>
      <Header>
        <h1>Lista de tarefas</h1>
      </Header>
      <Form>
        <FormGroup>
          <label htmlFor="task">Tarefa</label>
          <input
            type="text"
            name="task"
            id="task"
            value={task.title}
            onChange={e => setTask({ ...task, title: e.target.value })}
            placeholder="Estudar Typescript"
          />
        </FormGroup>
        <FormGroup>
          <label>Tag</label>
          <select
            name="tag"
            id="tag"
            value={task.tag}
            onChange={e =>
              setTask({
                ...task,
                tag: e.target.value,
                tagId: checkTagId(e.target.value)
              })
            }
          >
            {tags &&
              tags.map(tag => (
                <option value={tag.tag_name} key={tag.id}>
                  {tag.tag_name}
                </option>
              ))}
          </select>
        </FormGroup>
        <SubmitButton type="submit" onClick={createTask}>
          Criar Tarefa
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default CreateTask;
