import {FlightRepository} from '../repositories/FlightRepository';
import {Flight} from "../entity/Flight";
import {CityWeatherService} from "./CityWeatherService";
import {Service} from "typedi";

@Service()
export class FlightService {
    constructor(
        private readonly flightRepository: FlightRepository,
        private readonly cityWeatherService: CityWeatherService
    ) {}


    public async getAllFlights(): Promise<Flight[]> {
        return this.flightRepository.getAllFlights();
    }

    public async getFlightById(id: string): Promise<Flight | null> {
        const flightId = parseInt(id, 10);
        return this.flightRepository.getFlightById(flightId);
    }

    public async getAllFlightsWithWeather(): Promise<any[]> {
        // Get all Flights
        const flights = await this.flightRepository.getAllFlights();
        console.log(flights);

        //Process each flight to obtain or create the CityWeather
        return await Promise.all(flights.map(async (flight) => {
            const originCityWeather = await this.cityWeatherService.searchOrCreateCityWeatherOverview({
                lat: flight.origin_latitude,
                lon: flight.origin_longitude,
            });

            const destinationCityWeather = await this.cityWeatherService.searchOrCreateCityWeatherOverview({
                lat: flight.origin_latitude,
                lon: flight.origin_longitude,
            });

            // Update flight with city weather IDs
            const updatedFlight = {
                ...flight,
                originCityWeatherId: originCityWeather.id,
                destinationCityWeatherId: destinationCityWeather.id
            };

            //Update the Flight
            await this.updateFlight(flight.id, updatedFlight);

            return {
                ...flight,
                originCityWeather,
                destinationCityWeather
            };
        }));
    }

    public async updateFlight(id: number, data: Partial<Flight>): Promise<Flight | null> {
        return await this.flightRepository.updateFlight(id, data);
    }

    public async createFlight(data: Partial<Flight>): Promise<Flight> {
        if (!data.origin || !data.destination) {
            throw new Error('Flight must have an origin and a destination');
        }
        return this.flightRepository.createFlight(data);
    }
}
