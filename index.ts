import express, {Express} from "express";
import config from "./config";
import router from "./routes/index"

const app: Express = express();

app.use(express.json());
app.use("/", router);

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}...`)
})