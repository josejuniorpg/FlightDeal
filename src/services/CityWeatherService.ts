import {CityWeather} from "../entity/CityWeather";
import {CityWeatherRepository} from "../repositories/CityWeatherRepository";
import {WeatherOverviewResponse, WeatherService} from "./WeatherApiService";

export class CityWeatherService {
    constructor(private cityWeatherRepository: CityWeatherRepository) {}

    public async getAllCityWeatherOverview(): Promise<CityWeather[]> {
        return this.cityWeatherRepository.getAllCityWeatherOverview();
    }

    public async getCityWeatherOverviewById(id: string): Promise<CityWeather | null> {
        const cityWeatherId = parseInt(id, 10);
        return this.cityWeatherRepository.getCityWeatherOverviewById(cityWeatherId);
    }

    public async getCityWeatherByLatLon(lat: number, lon: number): Promise<CityWeather | null> {
        try {
            if (isNaN(lat) || isNaN(lon)) {
                throw new Error('Latitude and Longitude must be valid numbers');
            }
            return await this.cityWeatherRepository.getCityWeatherOverviewByLatLon(lat, lon);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error fetching CityWeather by lat and lon:', error.message);
                throw new Error(`Failed to fetch CityWeather by lat and lon: ${error.message}`);
            } else {
                console.error('An unknown error occurred while fetching CityWeather by lat and lon');
                throw new Error('Failed to fetch CityWeather by lat and lon: An unknown error occurred');
            }
        }
    }

    public async createCityWeatherOverview(data: Partial<CityWeather>): Promise<CityWeather> {
        //todo Add mappers
        if (!data.lat || !data.lon) {
           throw new Error('Latitude and Longitude are required');
       }
        const weatherData = await WeatherService.getWeatherData<WeatherOverviewResponse>('/overview', data.lat, data.lon);
        return this.cityWeatherRepository.createCityWeatherOverview(weatherData);
    }
}
