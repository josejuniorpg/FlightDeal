import {FlightRepository} from '../repositories/FlightRepository';
import {Flight} from "../entity/Flight";
import {CityWeatherService} from "./CityWeatherService";
import {Service} from "typedi";
import {CityWeather} from "../entity/CityWeather";

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
        const cityWeathers = await this.getUniqueCitiesAndCreateCityWeather();
        //Extract the coordinates of all cities to search for flights.
        const uniqueCityCoords = cityWeathers.map(cityWeather => ({
            lat: cityWeather.lat,
            lon: cityWeather.lon
        }));
        //Obtain all the flights associated to the cities with climate
        const flightsPromises = uniqueCityCoords.map(async coords => {
            return this.flightRepository.getFlightsByLatLon(coords.lat, coords.lon);
        });
        // We wait for all flight promises to be resolved
        const flightsArrays = await Promise.all(flightsPromises);
        //Flatten the array of flight arrays
        const allFlights = flightsArrays.flat();
        const flightsWithWeather = allFlights.map((flight: {
            origin_latitude: number;
            origin_longitude: number;
            destination_latitude: number;
            destination_longitude: number;
        }) => {
            // Find the weather for the origin, from CityWeather
            const originWeather = cityWeathers.find((cw: { lat: number; lon: number; }) =>
                cw.lat === flight.origin_latitude && cw.lon === flight.origin_longitude
            );
            // Find the weather for the destiny, from CityWeather
            const destinationWeather = cityWeathers.find((cw: { lat: number; lon: number; }) =>
                cw.lat === flight.destination_latitude && cw.lon === flight.destination_longitude
            );
            return {
                ...flight,
                originWeather,
                destinationWeather
            };
        });
        return flightsWithWeather;
    }


    public async getUniqueCities(): Promise<{ lat: number, lon: number }[]> {
        const originCities = await this.flightRepository.getUniqueOriginCities();
        const destinationCities = await this.flightRepository.getUniqueDestinationCities();
        const allCities = [...originCities, ...destinationCities];
        const uniqueCities = Array.from(new Set(allCities.map(c => JSON.stringify(c))))
            .map(c => JSON.parse(c));
        return uniqueCities;
    }

    public async getUniqueCitiesAndCreateCityWeather(): Promise<CityWeather[]> {
        const originCities = await this.flightRepository.getUniqueOriginCities();
        const destinationCities = await this.flightRepository.getUniqueDestinationCities();
        const allCities = [...originCities, ...destinationCities];
        const uniqueCities = Array.from(new Set(allCities.map(c => JSON.stringify(c))))
            .map(c => JSON.parse(c));
        const cityWeatherPromises = uniqueCities.map(async city => {
            return this.cityWeatherService.searchOrCreateCityWeatherOverview({ lat: city.lat, lon: city.lon, city_iata: city.iata });
        });
        const cityWeathers = await Promise.all(cityWeatherPromises);
        return cityWeathers;
    }

    public async updateFlight(id: number, data: Partial<Flight>): Promise<Flight | null> {
        return await this.flightRepository.updateFlight(id, data);
    }

    public async createFlights(flightsData: Partial<Flight>[]): Promise<Flight[]> {
        // Create many flights
        const createdFlights: Flight[] = [];
        for (const flightData of flightsData) {
            const flight = await this.createFlight(flightData);
            createdFlights.push(flight);
        }
        return createdFlights;
    }

    public async createFlight(data: Partial<Flight>): Promise<Flight> {
        if (!data.origin || !data.destination) {
            throw new Error('Flight must have an origin and a destination');
        }
        return this.flightRepository.createFlight(data);
    }
}
