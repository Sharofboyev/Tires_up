import express, {Express} from "express";
const app: Express = express();
import config from "./config";
import * as db from "./modules/db"

app.use(express.json());

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}...`)
})