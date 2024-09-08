import {CityWeather} from "../entity/CityWeather";
import {CityWeatherRepository} from "../repositories/CityWeatherRepository";
import {WeatherOverviewResponse, WeatherService} from "./WeatherApiService";

export class CityWeatherService {
    constructor(private cityWeatherRepository: CityWeatherRepository) {}

    public async getAllCityWeatherOverview(): Promise<CityWeather[]> {
        return this.cityWeatherRepository.getAllCityWeatherOverview();
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
