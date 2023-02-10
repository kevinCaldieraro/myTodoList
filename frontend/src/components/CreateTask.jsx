import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal } from './Modal';

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
`;

const FormGroupRemoveTagModal = styled.div`
  input,
  label {
    cursor: pointer;
  }

  input {
    margin-right: 7px;
    width: 20px;
    height: 20px;
  }

  label {
    font-size: 1.25rem;
  }
`;

const TagButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TagButton = styled.button`
  background-color: transparent;
  color: ${props => props.color};
  font-size: 0.9rem;
  font-weight: 500;
  align-self: flex-start;
  border: none;
  margin-top: 1rem;
  padding: 8px;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: #0070d7;
  color: #fff;
  padding: 10px;
  border: 2px solid #0070d7;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: 0.5s ease;
  margin-top: 80px;

  &:hover {
    background-color: #f5f9fa;
    color: #0070d7;
  }

  &.closeModal {
    background-color: #e64c4c;
    border: 2px solid #e64c4c;
    padding: 0 12px;
    font-size: 1.25rem;
    font-weight: 500;

    &:hover {
      background-color: #f5f9fa;
      color: #e64c4c;
    }
  }

  &.removeTag {
    background-color: #e64c4c;
    border: 2px solid #e64c4c;

    &:hover {
      background-color: #f5f9fa;
      color: #e64c4c;
    }
  }

  &.createTag,
  &.removeTag {
    margin-top: 30px;
    padding: 5px 10px;
    font-size: 1.25rem;
  }
`;

const CreateTask = ({ loadData, tasks }) => {
  const [createdTag, setCreatedTag] = useState(false);
  const [inputTag, setInputTag] = useState('');
  const [createTagModal, setCreateTagModal] = useState(false);
  const [removedTags, setRemovedTags] = useState(false);
  const [tagsToRemove, setTagsToRemove] = useState();
  const [removeTagModal, setRemoveTagModal] = useState(false);
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

    const tagsToRemoveInitial = tags.reduce((tagsToRemove, tag) => {
      return [
        ...tagsToRemove,
        {
          id: tag.id,
          isToRemove: false
        }
      ];
    }, []);

    setTagsToRemove(tagsToRemoveInitial);
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

  const createTag = async () => {
    console.log('tag criada');

    await fetch('http://localhost:3000/tags', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tagName: inputTag })
    });

    setCreatedTag(true);
    setTimeout(() => {
      setCreateTagModal(false);
      setCreatedTag(false);
      setInputTag('');
    }, 800);
    loadTags();
  };

  const removeTags = async () => {
    const tagsToRmv = tagsToRemove.filter(tag => tag.isToRemove === true);
    console.log(tagsToRmv);
    // console.log(tasks);
  };

  const handleCheckedTagsToRemove = i => {
    const newTagsToRemove = tagsToRemove.map((tag, index) =>
      i === index
        ? { ...tag, isToRemove: !tagsToRemove[index].isToRemove }
        : { ...tag, isToRemove: tagsToRemove[index].isToRemove }
    );

    setTagsToRemove(newTagsToRemove);
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
        <TagButtons>
          <TagButton
            type="button"
            onClick={() => setCreateTagModal(true)}
            color="#0070d7"
          >
            + Adicionar nova tag
          </TagButton>
          <TagButton
            type="button"
            onClick={() => setRemoveTagModal(true)}
            color="#e64c4c"
          >
            - Remover tag
          </TagButton>
        </TagButtons>
        <Button type="submit" onClick={createTask}>
          Criar Tarefa
        </Button>
      </Form>

      <Modal
        type="createTag"
        title="Crie sua tag"
        modal={createTagModal}
        setModal={setCreateTagModal}
        setInputTag={setInputTag}
      >
        <div className="modalBody">
          <FormGroup>
            <label htmlFor="tagName">Nome da tag</label>
            <input
              type="text"
              name=""
              id="tagName"
              placeholder="Estudo, Casa, ..."
              value={inputTag}
              onChange={e => setInputTag(e.target.value)}
            />
          </FormGroup>
          <Button className="createTag" type="button" onClick={createTag}>
            Criar Tag
          </Button>
          {createdTag && <span>Tag criada!</span>}
        </div>
      </Modal>
      <Modal
        type="removeTag"
        title="Remova suas tags"
        modal={removeTagModal}
        setModal={setRemoveTagModal}
        setTagsToRemove={setTagsToRemove}
        tags={tags}
      >
        <div className="modalBody removeTags">
          <div className="removeTags">
            {tags &&
              tags.map((tag, index) => (
                <FormGroupRemoveTagModal key={tag.id}>
                  <input
                    type="checkbox"
                    name={tag.tag_name}
                    id={tag.id}
                    checked={tagsToRemove[index].isToRemove}
                    onChange={() => handleCheckedTagsToRemove(index)}
                  />
                  <label htmlFor={tag.id}>{tag.tag_name}</label>
                </FormGroupRemoveTagModal>
              ))}
          </div>
          <Button className="removeTag" type="button" onClick={removeTags}>
            Remover
          </Button>
        </div>
      </Modal>
    </Container>
  );
};

export default CreateTask;
