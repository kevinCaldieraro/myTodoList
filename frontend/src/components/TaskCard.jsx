import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #f5f9fa;
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 8px;
  border-left: 5px solid ${props => props.borderColor};
  box-shadow: 3px 6px 5px rgba(0, 0, 0, 0.1);
`;

const TitleNtag = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  h3 {
    font-size: 1.4rem;
    font-weight: 500;
  }

  span {
    font-size: 0.9rem;
    font-weight: 400;
    opacity: 0.7;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const Status = styled.select`
  cursor: pointer;
  padding: 5px;
  text-transform: capitalize;
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 5px;
  padding: 3px;

  &:enabled {
    transition: 0.5s;
    cursor: pointer;
  }

  &:enabled:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const InputToEditTitle = styled.input`
  font-size: 1.4rem;
  font-weight: 500;
  padding: 5px;
  margin-bottom: 3px;
`;

const TaskCard = ({ task, handlers }) => {
  const [editFormVisibility, setEditFormVisibility] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const borderColor = () => {
    if (task.status === 'pendente') {
      return '#e75959';
    } else if (task.status === 'em andamento') {
      return '#e9dc22';
    } else {
      return '#5fbb35';
    }
  };

  return (
    <Container borderColor={borderColor}>
      <TitleNtag>
        {editFormVisibility ? (
          <InputToEditTitle
            id={task.id}
            type="text"
            value={newTitle}
            autoFocus
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handlers.handleEdit(e);
                setEditFormVisibility(!editFormVisibility);
              }
            }}
          />
        ) : (
          <h3>{task.title}</h3>
        )}
        <span>{task.tag}</span>
      </TitleNtag>
      <Actions>
        <Status
          id={task.id}
          name="status"
          value={task.status}
          onChange={handlers.handleStatus}
        >
          <option value="pendente">pendente</option>
          <option value="em andamento">em andamento</option>
          <option value="concluído">concluído</option>
        </Status>
        <div>
          <ActionButton
            disabled={editFormVisibility}
            onClick={() => setEditFormVisibility(!editFormVisibility)}
          >
            <FaEdit size={30} color={editFormVisibility ? '#aaa' : '#4b7ec0'} />
          </ActionButton>
          <ActionButton>
            <FaTrashAlt size={30} color="#e64c4c" />
          </ActionButton>
        </div>
      </Actions>
    </Container>
  );
};

export default TaskCard;
