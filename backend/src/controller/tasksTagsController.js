import tasksTagsModel from '../models/tasksTagsModel';

const getAllAssociationTasksTags = async (_req, res) => {
  const associations = await tasksTagsModel.getAllAssociationTasksTags();
  return res.status.json(associations);
};

const createAssociationTasksTags = async (req, res) => {
  const { taskId, tagId } = req.body;
  await tasksTagsModel.createAssociationTasksTags(taskId, tagId);
  return res.status(201).send();
};

const deleteAssociationTasksTags = async (req, res) => {
  const { taskId } = req.body;
  await tasksTagsModel.deleteAssociationTasksTags(taskId);
  return res.status(204).send();
};

export default {
  getAllAssociationTasksTags,
  createAssociationTasksTags,
  deleteAssociationTasksTags
};
