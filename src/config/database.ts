import { DataSource } from 'typeorm';
import {Flight} from "../entity/Flight";

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    logging: false,
    entities: [Flight],
    migrations: ['src/migrations/*.ts'],
});
