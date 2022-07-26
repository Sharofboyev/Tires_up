"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config"));
const sqlConfig = {
    user: config_1.default.db_user,
    password: config_1.default.db_password,
    database: config_1.default.db_name,
    server: config_1.default.db_host,
    port: config_1.default.db_port,
    options: {
        encrypt: false
    }
};
try {
    // make sure that any items are correctly URL encoded in the connection string
    mssql_1.default.connect(sqlConfig).then(() => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield mssql_1.default.query `select COUNT(*) AS count FROM dbo.profiles`;
        console.dir(result);
    }));
}
catch (err) {
    console.log(err.message);
    // ... error checks
}
