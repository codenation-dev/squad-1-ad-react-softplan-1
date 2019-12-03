import { Routes } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

// import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';

const routes = new Routes();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
