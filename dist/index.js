"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const config_1 = __importDefault(require("./config"));
console.log(config_1.default);
app.use(express_1.default.json());
app.listen(config_1.default.port, () => {
    console.log(`Listening on port ${config_1.default.port}...`);
});
