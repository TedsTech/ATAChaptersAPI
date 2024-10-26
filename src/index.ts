import 'reflect-metadata';
import { DataSource } from 'typeorm';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerConfig from './swaggerConfig';
import { Chapter } from './entity/Chapter';
import dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Chapter],
});

const app = express();
const port = 3000;

const swaggerSpec = swaggerJsdoc(swaggerConfig);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

AppDataSource.initialize().then(() => {
  const chapterRepository = AppDataSource.getRepository(Chapter);

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
  app.get('/ata-chapters', async (req, res) => {
    const chapters = await chapterRepository.find();
    res.json(chapters);
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
  });
}).catch(error => console.log(error));
