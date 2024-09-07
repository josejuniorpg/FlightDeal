import { Router } from 'express';
import { FlightController } from '../controllers/FlightController';

const router = Router();
const flightController = new FlightController();

router.get('/', flightController.getAllFlights.bind(flightController));
router.post('/create', flightController.createFlight.bind(flightController));

export default router;
