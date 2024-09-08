import {AppDataSource} from "../config/database";
import {Repository} from "typeorm";
import {CityWeather} from "../entity/CityWeather";


export class CityWeatherRepository {
    private repository: Repository<CityWeather> = AppDataSource.getRepository(CityWeather);

    public async getAllCityWeatherOverview(): Promise<CityWeather[]> {
        return this.repository.find();
    }

    public async createCityWeatherOverview(data: Partial<CityWeather>): Promise<CityWeather> {
        try {
            const cityWeather = this.repository.create(data);
            return await this.repository.save(cityWeather);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Failed to save CityWeather: ${error.message}`);
            } else {
                throw new Error('Failed to save CityWeather: An unknown error occurred');
            }
        }
    }
}
