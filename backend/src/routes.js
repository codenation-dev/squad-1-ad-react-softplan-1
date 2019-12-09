import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';
import LogController from './app/controllers/LogController';
import LogDetailController from './app/controllers/LogDetailController';
import LogArchiveController from './app/controllers/LogArchiveController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.get('/logs', LogController.index);
routes.post('/logs', LogController.store);
routes.delete('/logs/:id', LogController.delete);
routes.get('/logs/:id', LogDetailController.index);
routes.put('/logs/:id/archive', LogArchiveController.update);
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
