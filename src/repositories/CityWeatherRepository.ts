import {AppDataSource} from "../config/database";
import {Repository} from "typeorm";
import {CityWeather} from "../entity/CityWeather";


export class CityWeatherRepository {
    private repository: Repository<CityWeather> = AppDataSource.getRepository(CityWeather);

    public async getAllCityWeatherOverview(): Promise<CityWeather[]> {
        try {
            return await this.repository.find();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch all CityWeather records: ${error.message}`);
            } else {
                throw new Error('Failed to fetch all CityWeather records: An unknown error occurred');
            }
        }
    }

    public async getCityWeatherOverviewByLatLon(lat: number, lon: number): Promise<CityWeather | null> {
        try {
            return await this.repository.findOne({
                where: {
                    lat: lat,
                    lon: lon
                }
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error querying CityWeather by lat and lon:', error.message);
                throw new Error(`Failed to query CityWeather by lat and lon: ${error.message}`);
            } else {
                console.error('An unknown error occurred while querying CityWeather by lat and lon');
                throw new Error('Failed to query CityWeather by lat and lon: An unknown error occurred');
            }
        }
    }

    public async getCityWeatherOverviewById(id: number): Promise<CityWeather | null> {
        try {
            return await this.repository.findOneBy({ id });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch CityWeather record with ID ${id}: ${error.message}`);
            } else {
                throw new Error(`Failed to fetch CityWeather record with ID ${id}: An unknown error occurred`);
            }
        }
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
