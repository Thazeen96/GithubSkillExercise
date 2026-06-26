"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./config");
const routes_1 = require("./routes");
const database_1 = require("./database");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT || 8000);
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend' });
});
app.get('/api/config', (_req, res) => {
    res.json({ apiBaseUrl: (0, config_1.getApiBaseUrl)() });
});
app.use('/api', (0, routes_1.createApiRouter)());
(0, database_1.connectDatabase)()
    .then(() => {
    console.log(`MongoDB connected to ${database_1.MONGODB_URI}`);
})
    .catch((error) => {
    console.error('MongoDB connection failed:', error);
});
app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
    console.log(`API base URL: ${(0, config_1.getApiBaseUrl)()}`);
});
//# sourceMappingURL=index.js.map