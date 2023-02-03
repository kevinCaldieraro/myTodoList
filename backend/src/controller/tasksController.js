import tasksModel from '../models/tasksModel';
import tasksTagsModel from '../models/tasksTagsModel';

const getAll = async (_req, res) => {
  const tasks = await tasksModel.getAll();
  return res.status(200).json(tasks);
};

const createTask = async (req, res) => {
  const { title, tagId } = req.body;
  const createdTask = await tasksModel.createTask(title);
  await tasksTagsModel.createAssociationTasksTags(createdTask.insertId, tagId);

  return res.status(201).json(createdTask);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = req.body;
  await tasksModel.updateTask(id, task);

  return res.status(204).send();
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  await tasksModel.deleteTask(id);
  await tasksTagsModel.deleteAssociationTasksTags(id);

  return res.status(204).send();
};

export default {
  getAll,
  createTask,
  updateTask,
  deleteTask
};
