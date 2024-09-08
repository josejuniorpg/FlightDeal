import { DataSource } from 'typeorm';
import {Flight} from "../entity/Flight";
import {CityWeather} from "../entity/CityWeather";

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: '../database.sqlite',
    synchronize: true,
    logging: false,
    entities: [Flight, CityWeather],
    migrations: ['src/migrations/*.ts'],
});
