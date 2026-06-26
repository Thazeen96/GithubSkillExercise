"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./config");
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT || 8000);
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend' });
});
app.get('/api/config', (_req, res) => {
    res.json({ apiBaseUrl: (0, config_1.getApiBaseUrl)() });
});
app.use('/api', (0, routes_1.createApiRouter)());
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => {
    console.log(`MongoDB connected to ${MONGODB_URI}`);
})
    .catch((error) => {
    console.error('MongoDB connection failed:', error);
});
app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
    console.log(`API base URL: ${(0, config_1.getApiBaseUrl)()}`);
});
//# sourceMappingURL=index.js.map