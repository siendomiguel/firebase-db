import express from 'express';
import cors from 'cors';
import { routerAPI } from './src/routes/routesAPI.js';
import morgan from 'morgan';

const server = express();
const PORT = process.env.PORT || 3000;

//Middlewares
server.use(morgan('dev'));
server.use(cors());
server.use(express.json());

//Routes
server.use('/v1', routerAPI);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
