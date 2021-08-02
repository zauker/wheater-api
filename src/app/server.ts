import express, { Application, Request, Response } from "express";
import routes from "./routes/index";

export default function createServer():Application {
  const app: Application = express();
  app.disable('x-powered-by');

  app.get("/", (req: Request, res: Response) => {
    res.status(200).send('<!-- silence is golden -->');
  });

  app.use(routes);

  return app;
}