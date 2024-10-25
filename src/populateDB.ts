import { DataSource } from 'typeorm';
import { Chapter } from './entity/Chapter';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your_username',
  password: 'your_password',
  database: 'ata_chapters',
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
