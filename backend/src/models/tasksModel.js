import connection from './connection';

const getAll = async () => {
  const query = 'SELECT * FROM tasks';
  const [tasks] = await connection.execute(query);

  return tasks;
};

const createTask = async title => {
  const dateUTC = new Date(Date.now()).toUTCString();
  const query =
    'INSERT INTO tasks (title, status, created_at) VALUES (?, ?, ?)';

  const [createdTask] = await connection.execute(query, [
    title,
    'pendente',
    dateUTC
  ]);

  return createdTask;
};

const updateTask = async (id, { title, status }) => {
  const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';
  await connection.execute(query, [title, status, id]);
};

const deleteTask = async id => {
  const query = 'DELETE FROM tasks WHERE id = ?';
  await connection.execute(query, [id]);
};

export default {
  getAll,
  createTask,
  updateTask,
  deleteTask
};
