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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const errHandler_1 = require("./app/middleware/errHandler");
const routes_1 = __importDefault(require("./app/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const axios_1 = __importDefault(require("axios"));
const cron_1 = require("cron");
const app = (0, express_1.default)();
// Create an axios instance with a longer timeout
const axiosInstance = axios_1.default.create({
    timeout: 30000, // 30 seconds timeout
});
// Set up a cron job to ping the server every 10 minutes
const job = new cron_1.CronJob('*/10 * * * *', () => {
    axiosInstance
        .get('https://utshofolio-server.onrender.com/api/v1')
        .then((response) => {
        console.log('😀🎉 Self-ping successful:', response.status);
    })
        .catch((error) => {
        console.error('😡 Self-ping failed:', error.message);
    });
});
// Start the cron job
job.start();
app.get('/api/v1', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('utshofolio home route!');
}));
// parser
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        return callback(null, origin);
    },
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// Router
app.use('/api/v1', routes_1.default);
// app.use('/api/v1/students', studentRouter)
// app.use('/api/v1/users', userRoute)
// error handler
app.use(errHandler_1.notFoundErrHandler);
app.use(errHandler_1.globalErrHandler);
exports.default = app;
