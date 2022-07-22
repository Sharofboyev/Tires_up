import express, {Express} from "express";
const app: Express = express();
import config from "./config";

console.log(config)

app.use(express.json());

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}...`)
})