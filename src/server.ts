import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import './database';
import uploadConfig from './config/upload';

const server = express();
server.use(express.json());
server.use(routes);
server.use('/files', express.static(uploadConfig.directory));

server.listen(3333, () => {
  console.log('🚀️ Server started!');
});
