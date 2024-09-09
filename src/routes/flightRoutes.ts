import { Router } from 'express';
import { FlightController } from '../controllers/FlightController';
import {FlightRepository} from "../repositories/FlightRepository";
import {FlightService} from "../services/FlightService";
import {CityWeatherRepository} from "../repositories/CityWeatherRepository";
import {CityWeatherService} from "../services/CityWeatherService";
import {XlsxService} from "../services/XlxsService";
import multer from "multer";
const upload = multer({ dest: 'uploads/' });

const router = Router();
const xlsxService = new XlsxService();
const cityWeatherRepository = new CityWeatherRepository();
const cityWeatherService = new CityWeatherService(cityWeatherRepository);
const flightRepository = new FlightRepository();
const flightService = new FlightService(flightRepository, cityWeatherService);
const flightController = new FlightController(flightService, xlsxService);

router.get('/', flightController.getAllFlights.bind(flightController));
router.put('/update/:id', flightController.updateFlight.bind(flightController));
router.get('/get-by-id/:id', flightController.getFlightById.bind(flightController));
router.get('/with-weather', flightController.getAllFlightsWithWeather.bind(flightController));
router.get('/unique-cities', flightController.getUniqueCities.bind(flightController))
router.post('/create', flightController.createFlight.bind(flightController));
router.get('/excel/get-flight-weather', flightController.exportFlightsWithWeatherToExcel);
router.post('/excel/upload', upload.single('file'), (req, res) => {
    flightController.uploadAndCreateFlights(req, res);
});
export default router;
