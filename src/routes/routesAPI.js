import { Router } from 'express';

export const routerAPI = Router();

routerAPI.get('/', (req, res) => {
  res.send('Hello World!');
});
