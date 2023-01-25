import tagsModel from '../models/tagsModel';

const getAll = async (_req, res) => {
  const tags = await tagsModel.getAll();
  return res.status(200).json(tags);
};

const createTag = async (req, res) => {
  const { tagName } = req.body;
  const createdTag = await tagsModel.createTag(tagName);
  return res.status(201).json(createdTag);
};

const updateTag = async (req, res) => {
  const { id } = req.params;
  const { tagName } = req.body;
  await tagsModel.updateTag(id, tagName);
  return res.status(204).send();
};

const deleteTag = async (req, res) => {
  const { id } = req.params;
  await tagsModel.deleteTag(id);
  return res.status(204).send();
};

export default {
  getAll,
  createTag,
  updateTag,
  deleteTag
};
