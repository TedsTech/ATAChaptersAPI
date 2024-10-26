import { DataSource } from 'typeorm';
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

AppDataSource.initialize().then(async () => {
  const chapterRepository = AppDataSource.getRepository(Chapter);

  const chapters = [
    { chapter: "21", title: "Air Conditioning" },
    { chapter: "22", title: "Auto Flight" },
    // Add more chapters as needed
  ];

  for (const chapter of chapters) {
    const newChapter = chapterRepository.create(chapter);
    await chapterRepository.save(newChapter);
  }

  console.log('Chapters have been saved');
  process.exit();
}).catch(error => console.log(error));
