import {weatherApi} from "./apiClient";

export interface WeatherOverviewResponse {
    id: number
    lat: number;
    lon: number;
    tz: string;
    date: string;
    units: string;
    weather_overview: string;
}

export class WeatherService {

    //Generalized method for obtaining weather data from a specific endpoint
    static async getWeatherData<T>(endpoint: string, lat: number, lon: number): Promise<T> {
        try {
            const response = await weatherApi.get<T>(endpoint, {
                params: {
                    lat,
                    lon,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching weather data from ${endpoint}:`, error);
            throw new Error('Failed to fetch weather data');
        }
    }

    static async getWeatherOverview(lat: number, lon: number): Promise<WeatherOverviewResponse> {
        return this.getWeatherData<WeatherOverviewResponse>('/overview', lat, lon);
    }

}
