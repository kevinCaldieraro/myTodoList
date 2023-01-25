import connection from './connection';

const getAllAssociationTasksTags = async () => {
  const query = 'SELECT * FROM tasks_tags';
  const associations = connection.execute(query);

  return associations;
};

const createAssociationTasksTags = async (taskId, tagId) => {
  const query = 'INSERT INTO tasks_tags (task_id, tag_id) VALUES (?, ?)';
  await connection.execute(query, [taskId, tagId]);
};

const deleteAssociationTasksTags = async taskId => {
  const query = 'DELETE FROM tasks_tags WHERE task_id = taskId';
  await connection.execute(query, [taskId]);
};

export default {
  getAllAssociationTasksTags,
  createAssociationTasksTags,
  deleteAssociationTasksTags
};
