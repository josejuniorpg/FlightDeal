import { Request, Response } from 'express';
import {CityWeatherService} from "../services/CityWeatherService";

export class CityWeatherController {
    constructor(private cityWeatherService: CityWeatherService) {
    }

    public async getAllCityWeatherOverview(_: Request, res: Response): Promise<void> {
        try {
            const cityWeather = await this.cityWeatherService.getAllCityWeatherOverview();
            res.status(200).json(cityWeather);
        } catch (error) {
            res.status(500).json({
                message: 'Error getting city weather',
                error
            });
        }
    }
    public async createCityWeatherOverview(req: Request, res: Response): Promise<void> {
        try {
            const newCityWeather = await this.cityWeatherService.createCityWeatherOverview(req.body);
            res.status(201).json(newCityWeather);
        } catch (error) {
            res.status(500).json({
                message: 'Error creating city weather',
                error
            });

        }
    }
}
