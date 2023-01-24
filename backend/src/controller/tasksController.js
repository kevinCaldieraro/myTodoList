import tasksModel from '../models/tasksModel';

const getAll = async (_req, res) => {
  const tasks = await tasksModel.getAll();
  res.status(200).json(tasks);
};

const createTask = async (req, res) => {
  const task = req.body;
  const createdTask = await tasksModel.createTask(task);
  res.status(201).json(createdTask);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = req.body;
  await tasksModel.updateTask(id, task);
  res.status(204).send();
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const taskDeleted = await tasksModel.deleteTask(id);
  res.status(204).send(taskDeleted);
};

export default {
  getAll,
  createTask,
  updateTask,
  deleteTask
};
