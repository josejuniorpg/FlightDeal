import { Request, Response } from 'express';
import {WeatherService} from "../services/WeatherApiService";

export class WeatherController {
    static async getWeatherOverview(req: Request, res: Response): Promise<void> {
        const { lat, lon } = req.query;

        if (!lat || !lon) {
            res.status(400).send('Latitude and Longitude are required');
            return;
        }

        try {
            const weatherData = await WeatherService.getWeatherOverview(Number(lat), Number(lon));
            res.json(weatherData);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send('An unknown error occurred');
            }
        }
    }
}
