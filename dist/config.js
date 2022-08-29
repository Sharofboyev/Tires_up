"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + "/../.env" });
class Config {
    constructor(port, db_host, db_port, db_name, db_user, db_password) {
        this.port = port;
        this.db_host = db_host;
        this.db_port = db_port;
        this.db_name = db_name;
        this.db_user = db_user;
        this.db_password = db_password;
    }
}
exports.default = new Config(Number(process.env.APP_PORT), String(process.env.DB_HOST), Number(process.env.DB_PORT), String(process.env.DB_NAME), String(process.env.DB_USER), String(process.env.DB_PASSWORD));
//# sourceMappingURL=config.js.map