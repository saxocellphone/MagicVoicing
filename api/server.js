import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/tunes', routes.tunes);

app.get('/', (req, res) => {
  return res.send('Hello World!');
});

app.listen(process.env.PORT, () =>
  console.log(`Magic Voicing listening on port ${process.env.PORT}!`),
);