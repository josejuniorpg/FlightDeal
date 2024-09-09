import {Request, Response} from 'express';
import {FlightService} from "../services/FlightService";
import {XlsxService} from "../services/XlxsService";
import {unlink} from "fs/promises";
import {FlightMapper} from "../mappers/FlightMapper";


export class FlightController {
    constructor(private flightService: FlightService, private xlsxService: XlsxService) {
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

    public getUniqueCities = async (_: Request, res: Response): Promise<void> => {
        try {
            const uniqueCities = await this.flightService.getUniqueCities();
            res.status(200).json(uniqueCities);
        } catch (error) {
            res.status(500).json({ error: 'Error in obtaining unique cities' });
        }
    };

    async uploadAndCreateFlights(req: Request, res: Response): Promise<Response> {
        try {
            const filePath = req.file?.path;
            if (!filePath) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            // Read the Excel file
            const excelData = await this.xlsxService.readExcelFile(filePath);
            // Map the Excel data to Flight objects
            const flightsData = FlightMapper.mapExcelDataToFlights(excelData);
            const createdFlights = await this.flightService.createFlights(flightsData);
            await unlink(filePath);
            return res.json(createdFlights);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while processing the file' });
        }
    }
}
