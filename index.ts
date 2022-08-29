import express, { Express } from "express";
import config from "./config";
import router from "./routes/index";
import cors from "cors";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}...`);
});
