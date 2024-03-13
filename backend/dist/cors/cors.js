"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 1000
};
exports.default = corsOptions;
//# sourceMappingURL=cors.js.map