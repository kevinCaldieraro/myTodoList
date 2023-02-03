import connection from './connection';

const getAllAssociationTasksTags = async () => {
  const query = `
    SELECT tt.task_id, tt.tag_id, tk.title, tk.status, tg.tag_name
    FROM tasks_tags as tt
    INNER JOIN tasks as tk
    ON tt.task_id = tk.id
    INNER JOIN tags as tg
    ON tt.tag_id = tg.id;
  `;
  const [associations] = await connection.execute(query);

  return associations;
};

const createAssociationTasksTags = async (taskId, tagId) => {
  const query = 'INSERT INTO tasks_tags (task_id, tag_id) VALUES (?, ?)';
  await connection.execute(query, [taskId, tagId]);
};

const deleteAssociationTasksTags = async taskId => {
  const query = 'DELETE FROM tasks_tags WHERE task_id = ?';
  await connection.execute(query, [taskId]);
};

export default {
  getAllAssociationTasksTags,
  createAssociationTasksTags,
  deleteAssociationTasksTags
};
