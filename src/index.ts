import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerConfig from './swaggerConfig';

const app = express();
const port = 3000;

const swaggerSpec = swaggerJsdoc(swaggerConfig);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
