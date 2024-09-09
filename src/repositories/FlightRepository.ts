import {AppDataSource} from "../config/database";
import {Flight} from "../entity/Flight";
import {Repository} from "typeorm";


export class FlightRepository {
    private repository: Repository<Flight> = AppDataSource.getRepository(Flight);

    public async getAllFlights(): Promise<Flight[]> {
        return this.repository.find();
    }

    public async getFlightById(id: number): Promise<Flight | null> {
        return this.repository.findOneBy({id});
    }

    public async createFlight(data: Partial<Flight>): Promise<Flight> {
        const flight = this.repository.create(data);
        return this.repository.save(flight);
    }

    public async getFlightsByLatLon(lat: number, lon: number): Promise<Flight[]> {
        return this.repository.createQueryBuilder('flight')
            .where('flight.origin_latitude = :lat AND flight.origin_longitude = :lon', { lat, lon })
            .orWhere('flight.destination_latitude = :lat AND flight.destination_longitude = :lon', { lat, lon })
            .getMany();
    }

    public async getUniqueOriginCities(): Promise<{ lat: number, lon: number }[]> {
        return this.repository.createQueryBuilder("flight")
            .select(["flight.origin_latitude as lat", "flight.origin_longitude as lon", "flight.origin_iata_code as iata"])
            .groupBy("flight.origin_latitude, flight.origin_longitude")
            .getRawMany();
    }

    public async getUniqueDestinationCities(): Promise<{ lat: number, lon: number }[]> {
        return this.repository.createQueryBuilder("flight")
            .select(["flight.destination_latitude as lat", "flight.destination_longitude as lon", "flight.destination_iata_code as iata"])
            .groupBy("flight.destination_latitude, flight.destination_longitude")
            .getRawMany();
    }

    public async updateFlight(id: number, data: Partial<Flight>): Promise<Flight | null> {
        const flight = await this.repository.findOneBy({ id });

        if (!flight) {
            return null;
        }
        const updatedFlight = this.repository.merge(flight, data);
        return this.repository.save(updatedFlight);
    }
}
