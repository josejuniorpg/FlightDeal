import {Request, Response} from 'express';
import {FlightService} from "../services/FlightService";


export class FlightController {
    constructor(private flightService: FlightService) {}

    public async getAllFlights(_: Request, res: Response): Promise<void> {
        try {
            const flights = await this.flightService.getAllFlights();
            res.json(flights);
        } catch (error) {
            res.status(500).json({message: 'Error retrieving flights', error});
        }
    }

    public async createFlight(req: Request, res: Response): Promise<void> {
        try {
            const newFlight = await this.flightService.createFlight(req.body);
            res.status(201).json(newFlight);
        } catch (error) {
            res.status(500).json({
                message: 'Error creating flight',
                error
            });

        }
    }
}
