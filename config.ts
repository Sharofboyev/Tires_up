import * as dotenv from "dotenv";
dotenv.config({path: __dirname + "/../.env"})

class Config {
    public constructor(public readonly port: number, public readonly db_host: string, 
        public readonly db_port: number, public readonly db_name: string, public readonly db_user: string, public readonly db_password: string){}
}
export default new Config(Number(process.env.APP_PORT), String(process.env.DB_HOST), Number(process.env.DB_PORT), String(process.env.DB_NAME), String(process.env.DB_USER), String(process.env.DB_PASSWORD))