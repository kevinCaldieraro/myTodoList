import connection from './connection';

const getAll = async () => {
  const query = 'SELECT * FROM tags';
  const [tags] = await connection.execute(query);

  return tags;
};

const createTag = async tagName => {
  const query = 'INSERT INTO tags (tag_name) VALUES (?)';
  const [createdTag] = await connection.execute(query, [tagName]);

  return createdTag;
};

const updateTag = async (id, tagName) => {
  const query = 'UPDATE tags SET tag_name = ? WHERE id = ?';
  await connection.execute(query, [tagName, id]);
};

const deleteTag = async id => {
  const query = 'DELETE FROM tags WHERE id = ?';
  await connection.execute(query, [id]);
};

export default {
  getAll,
  createTag,
  updateTag,
  deleteTag
};
