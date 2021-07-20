import express from 'express';
const app: express.Application = express();
const port: number = parseInt(<string>process.env.PORT) || 3000;

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello Typescript!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
