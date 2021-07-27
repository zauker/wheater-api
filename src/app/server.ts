import express, { Application, Request, Response, NextFunction } from "express";
import routes from "app/routes/index";

export default function createServer() {
  const app: Application = express();
  app.disable('x-powered-by');

  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello Typescript!');
  });

  app.use(routes);

  return app;
}