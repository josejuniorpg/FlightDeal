import {Request, Response} from 'express';
import {FlightRepository} from '../repositories/FlightRepository';

const flightRepository = new FlightRepository();

export class FlightController {

    public async getAllFlights(_: Request, res: Response): Promise<void> {
        try {
            const flights = await flightRepository.getAllFlights();
            res.json(flights);
        } catch (error) {
            res.status(500).json({message: 'Error retrieving flights', error});
        }
    }

    public async createFlight(req: Request, res: Response): Promise<void> {
        try {
            const newFlight = await flightRepository.createFlight(req.body);
            res.status(201).json(newFlight);
        } catch (error) {
            res.status(500).json({
                message: 'Error creating flight',
                error
            });

        }
    }
}
