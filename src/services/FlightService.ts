import { FlightRepository } from '../repositories/FlightRepository';
import {Flight} from "../entity/Flight";

export class FlightService {
    constructor(private flightRepository: FlightRepository) {}

    public async getAllFlights(): Promise<Flight[]> {
        return this.flightRepository.getAllFlights();
    }

    public async createFlight(data: Partial<Flight>): Promise<Flight> {
        if (!data.origin || !data.destination) {
            throw new Error('Flight must have an origin and a destination');
        }
        return this.flightRepository.createFlight(data);
    }
}
