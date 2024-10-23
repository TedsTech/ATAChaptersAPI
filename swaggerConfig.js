"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ATA Chapters API',
            version: '1.0.0',
            description: 'API for providing accurate ATA Chapters',
        },
    },
    apis: ['./src/**/*.ts'], // Path to the API docs
};
exports.default = options;
