import { Router } from 'express';
import { FlightController } from '../controllers/FlightController';
import {FlightRepository} from "../repositories/FlightRepository";
import {FlightService} from "../services/FlightService";
import {CityWeatherRepository} from "../repositories/CityWeatherRepository";
import {CityWeatherService} from "../services/CityWeatherService";

const router = Router();

const cityWeatherRepository = new CityWeatherRepository();
const cityWeatherService = new CityWeatherService(cityWeatherRepository);
const flightRepository = new FlightRepository();
const flightService = new FlightService(flightRepository, cityWeatherService);
const flightController = new FlightController(flightService);

router.get('/', flightController.getAllFlights.bind(flightController));
router.put('/update/:id', flightController.updateFlight.bind(flightController));
router.get('/get-by-id/:id', flightController.getFlightById.bind(flightController));
router.get('/with-weather', flightController.getAllFlightsWithWeather.bind(flightController));
router.post('/create', flightController.createFlight.bind(flightController));

export default router;
