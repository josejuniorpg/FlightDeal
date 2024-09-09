import {CityWeather} from "../entity/CityWeather";
import {CityWeatherRepository} from "../repositories/CityWeatherRepository";
import {WeatherOverviewResponse, WeatherService} from "./WeatherApiService";
import {Service} from "typedi";

@Service()
export class CityWeatherService {
    constructor(private readonly cityWeatherRepository: CityWeatherRepository) {}

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
                throw new Error(`Failed to fetch CityWeather by lat and lon: ${error.message}`);
            } else {
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


    public async searchOrCreateCityWeatherOverview(data: Partial<CityWeather>): Promise<CityWeather> {

        let cityWeather = await this.cityWeatherRepository.findByLocation(data.lat, data.lon);

        if (!cityWeather) {
            if (data.lat !== undefined && data.lon !== undefined) {
                const weatherData = await WeatherService.getWeatherData<WeatherOverviewResponse>('/overview', data.lat, data.lon);
                return this.cityWeatherRepository.createCityWeatherOverview({
                    ...weatherData,
                    lat: data.lat,
                    lon: data.lon,
                    city_iata: data.city_iata || undefined,
                });
            } else {
                throw new Error('Latitude and longitude are required');
            }
        }
        return cityWeather;
    }

}
