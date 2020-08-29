import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import './database';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const server = express();
server.use(express.json());
server.use('/files', express.static(uploadConfig.directory));
server.use(routes);
server.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    }
    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  },
);
server.listen(3333, () => {
  console.log('🚀️ Server started!');
});
