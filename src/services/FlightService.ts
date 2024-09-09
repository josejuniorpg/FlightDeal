import {FlightRepository} from '../repositories/FlightRepository';
import {Flight} from "../entity/Flight";
import {CityWeatherService} from "./CityWeatherService";
import {Service} from "typedi";
import {CityWeather} from "../entity/CityWeather";
import * as XLSX from 'xlsx';

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

        const flightsWithWeather = allFlights.map(async (flight: {
            id: number;
            origin_latitude: number;
            origin_longitude: number;
            destination_latitude: number;
            destination_longitude: number;
            originCityWeatherId?: number;
            destinationCityWeatherId?: number;
        }) => {
            let updated = false;

            // Find the weather for the origin, from CityWeather
            const originWeather = cityWeathers.find((cw: { lat: number; lon: number; }) =>
                cw.lat === flight.origin_latitude && cw.lon === flight.origin_longitude
            );
            // Find the weather for the destiny, from CityWeather
            const destinationWeather = cityWeathers.find((cw: { lat: number; lon: number; }) =>
                cw.lat === flight.destination_latitude && cw.lon === flight.destination_longitude
            );

            //Update only if  originCityWeatherId or destinationCityWeatherId don't exist
            const updatedFlight: Partial<typeof flight> = { ...flight };

            if (!flight.originCityWeatherId && originWeather) {
                updatedFlight.originCityWeatherId = originWeather.id;
                updated = true;
            }

            if (!flight.destinationCityWeatherId && destinationWeather) {
                updatedFlight.destinationCityWeatherId = destinationWeather.id;
                updated = true;
            }

            if (updated) {
                await this.flightRepository.updateFlight(flight.id, updatedFlight);
            }

            return {
                ...flight,
                originWeather,
                destinationWeather
            };
        });
        return Promise.all(flightsWithWeather);
    }


    public async getUniqueCities(): Promise<{ lat: number, lon: number }[]> {
        const originCities = await this.flightRepository.getUniqueOriginCities();
        const destinationCities = await this.flightRepository.getUniqueDestinationCities();
        const allCities = [...originCities, ...destinationCities];
        const uniqueCities = Array.from(new Set(allCities.map(c => JSON.stringify(c))))
            .map(c => JSON.parse(c));
        return uniqueCities;
    }

    public async exportFlightsWithWeatherToExcel(filePath: string): Promise<void> {
        const flightsWithWeather = await this.getAllFlightsWithWeather();

        //Preparing data.
        const formattedData = flightsWithWeather.map(flight => ({
            id: flight.id,
            origin: flight.origin,
            destination: flight.destination,
            airline: flight.airline,
            flight_num: flight.flight_num,
            origin_iata_code: flight.origin_iata_code,
            origin_name: flight.origin_name,
            origin_latitude: flight.origin_latitude,
            origin_longitude: flight.origin_longitude,
            destination_iata_code: flight.destination_iata_code,
            destination_name: flight.destination_name,
            destination_latitude: flight.destination_latitude,
            destination_longitude: flight.destination_longitude,
            originCityWeatherId: flight.originCityWeatherId,
            destinationCityWeatherId: flight.destinationCityWeatherId,
            originWeather_id: flight.originWeather?.id,
            originWeather_city_iata: flight.originWeather?.city_iata,
            originWeather_lat: flight.originWeather?.lat,
            originWeather_lon: flight.originWeather?.lon,
            originWeather_tz: flight.originWeather?.tz,
            originWeather_date: flight.originWeather?.date,
            originWeather_units: flight.originWeather?.units,
            originWeather_weather_overview: flight.originWeather?.weather_overview,
            destinationWeather_id: flight.destinationWeather?.id,
            destinationWeather_city_iata: flight.destinationWeather?.city_iata,
            destinationWeather_lat: flight.destinationWeather?.lat,
            destinationWeather_lon: flight.destinationWeather?.lon,
            destinationWeather_tz: flight.destinationWeather?.tz,
            destinationWeather_date: flight.destinationWeather?.date,
            destinationWeather_units: flight.destinationWeather?.units,
            destinationWeather_weather_overview: flight.destinationWeather?.weather_overview,
        }));

        // Convert the data to a sheet
        const worksheet = XLSX.utils.json_to_sheet(formattedData);

        // Create a new workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'FlightsWithWeather');

        // Write the workbook to a file
        XLSX.writeFile(workbook, filePath);
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
