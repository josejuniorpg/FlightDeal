import {Request, Response} from 'express';
import {FlightService} from "../services/FlightService";


export class FlightController {
    constructor(private flightService: FlightService) {
    }

    public async getAllFlights(_: Request, res: Response): Promise<void> {
        try {
            const flights = await this.flightService.getAllFlights();
            res.json(flights);
        } catch (error) {
            res.status(500).json({message: 'Error retrieving flights', error});
        }
    }

    public async getFlightById(req: Request, res: Response): Promise<void> {
        try {
            const flight = await this.flightService.getFlightById(req.params.id);
            if (flight) {
                res.json(flight);
            } else {
                res.status(404).json({message: 'Flight not found'});
            }
        } catch (error) {
            res.status(500).json({message: 'Error retrieving flight', error});
        }
    }

    public async getAllFlightsWithWeather(_: Request, res: Response): Promise<void> {
        try {
            const flights = await this.flightService.getAllFlightsWithWeather();
            res.json(flights);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving flights', error });
        }
    }

    public async updateFlight(req: Request, res: Response): Promise<void> {
        try {
            const updatedFlight = await this.flightService.updateFlight(parseInt(req.params.id, 10), req.body);
            if (updatedFlight) {
                res.json(updatedFlight);
            } else {
                res.status(404).json({ message: 'Flight not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating flight', error });
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
