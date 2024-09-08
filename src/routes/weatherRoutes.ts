import { Router } from 'express';
import {WeatherController} from "../controllers/WeatherApiController";

//todo maybe delete this endpoint
const router = Router();

router.get('/', WeatherController.getWeatherOverview);

export default router;
