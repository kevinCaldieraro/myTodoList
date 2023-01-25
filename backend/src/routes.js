import { Router } from 'express';
import tagsController from './controller/tagsController';
import tasksController from './controller/tasksController';
import tasksTagsController from './controller/tasksTagsController';

const router = Router();

router
  .get('/tasks', tasksController.getAll)
  .post('/tasks', tasksController.createTask)
  .put('/tasks/:id', tasksController.updateTask)
  .delete('/tasks/:id', tasksController.deleteTask);

router
  .get('/tags', tagsController.getAll)
  .post('/tags', tagsController.createTag)
  .put('/tags/:id', tagsController.updateTag)
  .delete('/tags/:id', tagsController.deleteTag);

router
  .get('/associations', tasksTagsController.getAllAssociationTasksTags)
  .post('/associations', tasksTagsController.createAssociationTasksTags)
  .delete('/associations', tasksTagsController.deleteAssociationTasksTags);

export default router;
