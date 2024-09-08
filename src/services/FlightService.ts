import { FlightRepository } from '../repositories/FlightRepository';
import {Flight} from "../entity/Flight";

export class FlightService {
    constructor(private flightRepository: FlightRepository) {}

    public async getAllFlights(): Promise<Flight[]> {
        return this.flightRepository.getAllFlights();
    }

    public async getFlightById(id: string): Promise<Flight | null> {
        const flightId = parseInt(id, 10);
        return this.flightRepository.getFlightById(flightId);
    }

    public async createFlight(data: Partial<Flight>): Promise<Flight> {
        if (!data.origin || !data.destination) {
            throw new Error('Flight must have an origin and a destination');
        }
        return this.flightRepository.createFlight(data);
    }
}
