"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerConfig_1 = __importDefault(require("./swaggerConfig"));
const app = (0, express_1.default)();
const port = 3000;
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerConfig_1.default);
/**
 * @swagger
 * /ata-chapters:
 *   get:
 *     summary: Retrieve a list of ATA chapters
 *     responses:
 *       200:
 *         description: A list of ATA chapters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   chapter:
 *                     type: string
 *                     description: The chapter number
 *                   title:
 *                     type: string
 *                     description: The chapter title
 */
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.get('/ata-chapters', (req, res) => {
    const chapters = [
        { chapter: "21", title: "Air Conditioning" },
        { chapter: "22", title: "Auto Flight" },
        // Add more chapters
    ];
    res.json(chapters);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});
