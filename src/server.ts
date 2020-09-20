import express from 'express';
import cors from 'cors';
import routes from './routes';

import './database';

const app = express();

app.use(cors());

// permite ender arquivos json vindo no body da aplicaçao
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Serever started on port 3333!');
});
