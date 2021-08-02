import "dotenv/config";
import createServer from "./app/server";

const startServer = () => {
  const app = createServer();
  const port: number = parseInt(<string>process.env.PORT, 10) || 3000;
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};

startServer();