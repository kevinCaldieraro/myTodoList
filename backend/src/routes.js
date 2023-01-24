import { Router } from 'express';
import tasksController from './controller/tasksController';

const router = Router();

router
  .get('/tasks', tasksController.getAll)
  .post('/tasks', tasksController.createTask)
  .put('/tasks/:id', tasksController.updateTask)
  .delete('/tasks/:id', tasksController.deleteTask);

export default router;
