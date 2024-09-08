import { Router } from 'express';
import { FlightController } from '../controllers/FlightController';
import {FlightRepository} from "../repositories/FlightRepository";
import {FlightService} from "../services/FlightService";

const router = Router();

const flightRepository = new FlightRepository();
const flightService = new FlightService(flightRepository);
const flightController = new FlightController(flightService);

router.get('/', flightController.getAllFlights.bind(flightController));
router.post('/create', flightController.createFlight.bind(flightController));

export default router;
