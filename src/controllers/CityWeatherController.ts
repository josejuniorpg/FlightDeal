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

    public async getCityWeatherOverviewById(req: Request, res: Response): Promise<void> {
        try {
            const cityWeather = await this.cityWeatherService.getCityWeatherOverviewById(req.params.id);
            if (cityWeather) {
                res.json(cityWeather);
            } else {
                res.status(404).json({message: 'City Weather not found'});
            }
        } catch (error) {
            res.status(500).json({message: 'Error retrieving City Weather', error});
        }
    }

    public async getCityWeatherOverviewByLatLon(req: Request, res: Response): Promise<void> {
        const { lat, lon } = req.query;
        try {
            const cityWeatherData = await this.cityWeatherService.getCityWeatherByLatLon(Number(lat), Number(lon));
            res.status(201).json(cityWeatherData);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Error retrieving or saving CityWeather data', error: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred while retrieving or saving CityWeather data' });
            }
        }
    }
    //Todo add by add and by lat and long
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

    public async searchOrCreateCityWeatherOverview(req: Request, res: Response): Promise<void> {
        try {
            const cityWeather = await this.cityWeatherService.searchOrCreateCityWeatherOverview(req.body);
            res.status(200).json(cityWeather);
        } catch (error) {
            res.status(500).json({
                message: 'Error searching or creating city weather',
                error
            });

        }
    }

}
