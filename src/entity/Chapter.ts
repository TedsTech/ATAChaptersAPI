import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  chapter!: string;

  @Column()
  title!: string;
}
