import { Router } from 'express';
import {CityWeatherRepository} from "../repositories/CityWeatherRepository";
import {CityWeatherService} from "../services/CityWeatherService";
import {CityWeatherController} from "../controllers/CityWeatherController";

const router = Router();

const cityWeatherRepository = new CityWeatherRepository();
const cityWeatherService = new CityWeatherService(cityWeatherRepository);
const cityWeatherController = new CityWeatherController(cityWeatherService);

router.get('/', cityWeatherController.getAllCityWeatherOverview.bind(cityWeatherController));
router.get('/:id', cityWeatherController.getCityWeatherOverviewById.bind(cityWeatherController));
router.post('/create', cityWeatherController.createCityWeatherOverview.bind(cityWeatherController));

export default router;
