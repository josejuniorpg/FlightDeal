import {AppDataSource} from "../config/database";
import {Flight} from "../entity/Flight";
import {Repository} from "typeorm";


export class FlightRepository {
    private repository: Repository<Flight> = AppDataSource.getRepository(Flight);

    public async getAllFlights(): Promise<Flight[]> {
        return this.repository.find();
    }

    public async getFlightById(id: number): Promise<Flight | null> {
        return this.repository.findOneBy({ id });
    }

    public async createFlight(data: Partial<Flight>): Promise<Flight> {
        const flight = this.repository.create(data);
        return this.repository.save(flight);
    }
}
